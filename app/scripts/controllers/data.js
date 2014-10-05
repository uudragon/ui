'use strict';

angular.module('mainApp')
.controller('DataCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'service';

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('DataManager', ['$scope', '$controller', function ($scope, $controller) {

		// 获取工单相关信息
		$scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', products: '季度', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', products: '季度', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		};


		$controller('DataCtrl', {$scope: $scope});

	}])


	.controller('OrderManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.isAllThsShow = true;

		$scope.ths = [
			{name: 'customerName', label: '姓名', isChecked: true, sortable: true},
			{name: 'gender', label: '性别', isChecked: true, sortable: true},
			{name: 'customerPhone', label: '手机', isChecked: true, sortable: true},
			{name: 'orderSN', label: '订单号', isChecked: true, sortable: true},
			{name: 'orderType', label: '订购商品', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: false, sortable: true},
			{name: 'area', label: '地址', isChecked: false, sortable: true},
			{name: 'alipay', label: '支付宝账号', isChecked: false, sortable: true},
			{name: 'orderStatus', label: '订单时间', isChecked: true, sortable: true},
			{name: 'payType', label: '订单状态', isChecked: false, sortable: true},
			{name: 'payway', label: '订单类型', isChecked: true, sortable: true},
			{name: 'payStatus', label: '付款方式', isChecked: true, sortable: true},
			{name: 'sumAmount', label: '付款状态', isChecked: true, sortable: true},
			{name: 'sumAmount', label: '累计订单金额', isChecked: false, sortable: true},
			{name: 'details', label: '详细', isChecked: true, sortable: true}
		];


		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Work', ['$scope', '$controller', function ($scope, $controller) {

		$scope.isAllThsShow = true;

		$scope.ths = [
			{name: 'customerName', label: '姓名', isChecked: true, sortable: true},
			{name: 'gender', label: '性别', isChecked: true, sortable: true},
			{name: 'customerPhone', label: '手机', isChecked: true, sortable: true},
			{name: 'orderSN', label: '工单号', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true, sortable: true},
			{name: 'workstart', label: '工单开始时间', isChecked: false, sortable: true},
			{name: 'workend', label: '工单结束时间', isChecked: false, sortable: true},
			{name: 'responser', label: '受理人', isChecked: true, sortable: true},
			{name: 'workStatus', label: '工单状态', isChecked: true, sortable: true},
			{name: 'workType', label: '工单类型', isChecked: true, sortable: true}
		];

		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Inventory', ['$scope', '$controller', function ($scope, $controller) {

		$scope.products = [{type: 'lorem', name: '李四民', content: 'lorem', sku: '3213', minSKU: '123', SN: '1231231123', location: '山东'}, {type: 'lorem', name: '张三', content: 'lorem', sku: '1231', minSKU: '123', SN: '123124121', location: '青岛'} ]; $scope.isAllThsShow = true;

		$scope.ths = [
				{name: 'type', label: '产品类别', isChecked: true, sortable:true},
				{name: 'name', label: '产品名称', isChecked: true, sortable:true},
				{name: 'content', label: '产品内容', isChecked: true, sortable:true},
				{name: 'sku', label: '库存数量', isChecked: true, sortable:true},
				{name: 'minSKU', label: '库存下限', isChecked: true, sortable:true},
				{name: 'SN', label: '产品编码', isChecked: true, sortable:true},
				{name: 'location', label: '所在仓库', isChecked: true, sortable:true}
		];

		$scope.getProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '调库';
			$('#order-details').modal('show');
		};

		$scope.fillProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '补库';
			$('#order-details').modal('show');
		};

		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Statistics', ['$scope', '$controller', function ($scope, $controller) {

		$scope.products = [{type: 'lorem', name: '李四民', content: 'lorem', sku: '3213', minSKU: '123', SN: '1231231123', location: '山东'}, {type: 'lorem', name: '张三', content: 'lorem', sku: '1231', minSKU: '123', SN: '123124121', location: '青岛'} ]; $scope.isAllThsShow = true;

		$scope.ths = [
				{name: 'type', label: '产品类别', isChecked: true, sortable:true},
				{name: 'name', label: '产品名称', isChecked: true, sortable:true},
				{name: 'content', label: '产品内容', isChecked: true, sortable:true},
				{name: 'sku', label: '库存数量', isChecked: true, sortable:true},
				{name: 'minSKU', label: '库存下限', isChecked: true, sortable:true},
				{name: 'SN', label: '产品编码', isChecked: true, sortable:true},
				{name: 'location', label: '所在仓库', isChecked: true, sortable:true}
		];

		$scope.getProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '调库';
			$('#order-details').modal('show');
		};

		$scope.fillProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '补库';
			$('#order-details').modal('show');
		};

		$scope.printCharts = function() {
			$scope.print();
		};

		$controller('DataManager', {$scope: $scope});
	}]);
