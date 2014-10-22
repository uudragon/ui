'use strict';

angular.module('mainApp')
.controller('CustomerServiceCtrl', ['$scope', '$controller',function ($scope, $controller) {

	// init
	$scope.searchModel = {
		pagination: {
			perPage: config.perPage,
			toPage: 1
		}
	};

	$scope.page = 1;
	$scope.objType = 'customer';

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerServiceManager', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

		$scope.searchModel = {};

		if ( $scope.$state.includes('root.customer.traded') ) {
			$scope.search('tradedCustomer');
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.load('customer_statistics');
		}

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
			orderStatus: '正常'};

		$scope.getOrderBySN = function(orderSN) {
			for (var i = 0; i < $scope.orders.length; i++) {
				if ($scope.orders[i] && $scope.orders[i].orderSN === orderSN) {
					return $scope.orders[i];
				}
			}
			return {};
		};

		// 查看订单
		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		};

		$scope.addContact = function() {
			$scope.order = $scope.order || {};
			$scope.order.contactTime = $filter('now')();
			$('#contact-history').modal('show');
		};

		$controller('CustomerServiceCtrl', {$scope: $scope});

	}])
	.controller('CheckOrder', ['$scope', '$controller', function($scope, $controller) {

		// 搜索下拉
		$scope.filters = [
			{name: '所在省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 2, input: true},
			{name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 4, subfilters: [{name: '已付款', value: 1}, {name: '未付款', value: 2}]},
			{name: '支付方式', value: 5, subfilters: [{name: '货到付款', value: 1}, {name: '在线付款', value: 2}]},
			{name: '审单状态', value: 6, subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 7, datetime: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]},
			{name: '退换货单号', value: 12, input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'orderSN', label: '订单编号', isChecked: true},
			{name: 'customerPhone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'orderType', label: '订单类型', isChecked: true, sortable: true},
			{name: 'payStatus', label: '付款状态', isChecked: true, sortable: true},
			{name: 'checkStatus', label: '审单状态', isChecked: true, filters: ['待审核', '审核中', '审核通过', '无效']},
			{name: 'createTime', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '联系次数', isChecked: true}
		];

		// 修改订单
		$scope.modifyOrder = function() {
			$('#modify-order').modal('show');
		};

		// 共享订单
		$scope.shareOrder = function() {
			$('#share-order').modal('show');
		};

		$scope.editCustomerInfo = function() {
			$scope.isCustometInfoEditable = true;
		};

		$scope.saveCustomerInfo = function() {
			$scope.isCustometInfoEditable = false;
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('SplitOrder', ['$scope', '$controller', function($scope, $controller) {

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'orderSN', label: '订单编号', isChecked: true},
			{name: 'customerPhone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'orderType', label: '订单类型', isChecked: true, sortable: true},
			{name: 'payStatus', label: '付款状态', isChecked: true, sortable: true},
			{name: 'createTime', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '联系次数', isChecked: true}
		];

		$scope.splitOrder = function(order) {
			order.isSplited = true;
			order.splitedOrders = [
				{orderSN: '123071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		};


		$scope.selectGift = function() {
			$('#select-gift').modal('show');
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('Complains', ['$scope', '$controller', function($scope, $controller) {
		var $returnOrder = $('#return-order');
		var $tree = $('#tree');

		// 搜索下拉
		$scope.filters = [
			{name: '所有投诉', value: 0},
			{name: '我的投诉', value: 1},
			{name: '下属的投诉', value: 1},
			{name: '未处理的投诉', value: 1},
			{name: '处理中的投诉', value: 1},
			{name: '客户姓名', value: 1},
			{name: '电话', value: 1},
			{name: '城市', value: 1},
			{name: '创建时间', value: 1},
			{name: '联系次数', value: 1},
			{name: '订单编号', value: 1},
			{name: '订单状态', value: 1},
			{name: '付款类别', value: 1},
			{name: '付款状态', value: 1},
			{name: '工单状态', value: 1},
			{name: '投诉类型', value: 1},
		];

		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'orderSN', label: '订单编号', isChecked: true},
			{name: 'customerPhone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'orderType', label: '订单类型', isChecked: true, sortable: true},
			{name: 'payStatus', label: '付款状态', isChecked: true, sortable: true},
			{name: 'createTime', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '联系次数', isChecked: true}
		];

		$scope.showComplaintOrders = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
			$scope.currentOrder.complaintOrders = [
				{orderSN: '123071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		};

		// 退换货
		$scope.exchange = function() {
			$returnOrder.modal('show');
		};

		// 退换货
		$scope.return = function() {
			$returnOrder.modal('show');
		};

		$scope.confirmAndShare =function() {
			$('#share-order').modal('show');

			var treeSourece = [
				{
					'title': '财务部', 'key': '1', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '库房部', 'key': '2', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '投诉组', 'key': '3', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
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
		};

		$scope.saveOrder = function(order) {
			var
				tree = $tree.fancytree('getTree'),
				selectedNodes = tree.getSelectedNodes();

			console.log(selectedNodes);
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('CustomerPool', ['$scope', '$controller', function($scope, $controller) {
		var $returnOrder = $('#return-order');
		var $tree = $('#tree');

		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'orderSN', label: '订单编号', isChecked: true},
			{name: 'customerPhone', label: '客户手机', isChecked: true},
			{name: 'customerPhone', label: '固定电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'email', label: 'Email', isChecked: true},
			{name: 'payStatus', label: '客户状态', isChecked: true, sortable: true},
			{name: 'createTime', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '联系次数', isChecked: true}
		];

		$scope.getSelectedCustomers = function() {
			$scope.selectedCustomers = [];
			angular.forEach($scope.orders, function(customer) {
				if (customer.isChecked) {
					$scope.selectedCustomers.push(customer);
				}
			});
			return $scope.selectedCustomers;
		};

		$scope.batchAssign = function(order) {
			$('#batch-assgin').modal('show');
		};

		$scope.batchPick = function(order) {
			$('#batch-pick').modal('show');
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}]);
