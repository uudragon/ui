'use strict';

angular.module('mainApp')
.controller('CustomerServiceCtrl', ['$scope', '$controller',function ($scope, $controller) {

	// init
	$scope.searchModel = {
		pagination: {
			perPage: config.perPage,
			toPage: 1
		}
	}

	$scope.page = 1;
	$scope.objType = 'customer';

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerServiceManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.searchModel = {};

		if ( $scope.$state.includes('root.customer.traded') ) {
			$scope.search('tradedCustomer');
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.load('customer_statistics');
		}

		// var orders = $resource('/bam/:userId/card/:cardId',
		// 	{userId:123, cardId:'@id'}, {
		// 		charge: {method:'POST', params:{charge:true}}
		// 	});

		// fake date
		$scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', orderType: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.tmp = {
			orderSN: '123071231',
			name: '李四民',
			products: '季度',
			payDate: '2014-10-15',
			payWay: '在线支付',
			payStatus: '已支付',
			birthday: '2010-06-01',
			orderStatus: '正常'}

		$scope.shareOrder = function() {
			$('#share-order').modal('show');
		}

		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		}

		$scope.getOrderBySN = function(orderSN) {
			for (var i = 0; i < $scope.orders.length; i++) {
				if ($scope.orders[i] && $scope.orders[i].orderSN === orderSN) {
					return $scope.orders[i];
				}
			}
			return {};
		}

		$scope.checkOrder = function() {
			$('#recheck-order').modal('show');
		}

		$scope.splitOrder = function(order) {
			order.isSplited = true;
			order.splitedOrders = [
				{orderSN: '123071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		}

		$scope.selectGift = function() {
			$('#select-gift').modal('show');
		}

		$controller('CustomerServiceCtrl', {$scope: $scope});

	}])
	.controller('checkOrder', ['$scope', '$controller', function($scope, $controller) {
		$scope.ths = [
						{name: 'customerName', label: '客户姓名', isShow: true},
						{name: 'orderSN', label: '订单编号', isShow: true},
						{name: 'customerPhone', label: '客户电话', isShow: true},
						{name: 'province', label: '所在省', isShow: true},
						{name: 'city', label: '城市', isShow: true},
						{name: 'orderType', label: '订购类型', isShow: true},
						{name: 'payStatus', label: '付款状态', isShow: true},
						{name: 'checkStatus', label: '审单状态', isShow: true, sortable: true},
						{name: 'createTime', label: '创建时间', isShow: true, sortable: true},
						{name: 'contactTimes', label: '联系次数', isShow: true}
					];

		$scope.sortBy = function(name, type) {
			console.log('sort by:', name, type);
		}

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('splitOrder', ['$scope', '$controller', function($scope, $controller) {

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('checkComplainOrders', ['$scope', '$controller', function($scope, $controller) {
		var $returnOrder = $('#return-order');
		var $tree = $('#tree');

		$scope.showComplaintOrders = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
			$scope.currentOrder.complaintOrders = [
				{orderSN: '123071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		}

		// 退换货
		$scope.exchange = function() {
			$returnOrder.modal('show');
		}

		// 退换货
		$scope.return = function() {
			$returnOrder.modal('show');
		}

		$scope.confirmAndShare =function() {
			$('#share-order').modal('show');

			var treeSourece = [
				{
					"title": "财务部", "key": "1", "fold": true, "children": [
						{"title": "test1", "key": "3"},
						{"title": "test2", "key": "4"}
					]
				},
				{
					"title": "库房部", "key": "2", "fold": true, "children": [
						{"title": "test1", "key": "3"},
						{"title": "test2", "key": "4"}
					]
				},
				{
					"title": "投诉组", "key": "3", "fold": true, "children": [
						{"title": "test1", "key": "3"},
						{"title": "test2", "key": "4"}
					]
				}
			];
			$tree.fancytree({
				source: treeSourece,
				selectMode: 3,
				clickFolderMode: 2,
				icons: false,
				checkbox: true
			});
		}

		$scope.saveOrder = function(order) {
			var tree = $tree.fancytree("getTree")
			var selectedNodes = tree.getSelectedNodes();

			console.log(selectedNodes);
		}

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
