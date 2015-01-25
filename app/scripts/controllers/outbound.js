'use strict';

angular.module('mainApp')
.controller('OutboundCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('OrderManager', ['$scope', '$controller', function ($scope, $controller) {

		// inherit functions from parent
		$controller('OutboundCtrl', {$scope: $scope});

	}])
	.controller('Distrib', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		// 搜索下拉
		$scope.filters = [
			{name: '入库单号', value: 'receipt_code', input: true},
			{name: '入库单状态', value: 'status', subfilters: [{name: '撤销', value: -1}, {name: '未入库', value: 0}, {name: '部分入库', value: 1}, {name: '入库完成', value: 2}]},
			// {name: '所在库房', value: 'warehouse', input: true},
			// {name: '预入库时间', value: '', date: true},
			// {name: '入库时间', value: '', date: true},
			{name: '创建人', value: 'creator', input: true},
			{name: '修改人', value: 'updater', input: true}
		];

		// $scope.ths = [
		// 	{name: 'orders_no', label: '订单号', isChecked: true},
		// 	{name: 'shipment_no', label: '发货单号', isChecked: true},
		// 	{name: 'customer_code', label: '客户编号', isChecked: true},
		// 	{name: 'customer_name', label: '客户姓名', isChecked: true},
		// 	{name: 'address', label: '客户地址', isChecked: true},
		// 	{name: 'customer_tel', label: '客户电话', isChecked: true},
		// 	{name: 'amount', label: '付款金额', isChecked: true},
		// 	{name: 'shipped_qty', label: '发货数量', isChecked: true},
		// 	{name: 'has_invoice', label: '是否有发票', isChecked: true},
		// 	{name: 'express_code', label: '快递公司编号', isChecked: true},
		// 	{name: 'express_orders_no', label: '快递单号', isChecked: true},
		// 	{name: 'express_name', label: '快递公司名称', isChecked: true},
		// 	{name: 'express_cost', label: '快递费用', isChecked: true},
		// 	{name: 'courier', label: '快递员', isChecked: true},
		// 	{name: 'courier_tel', label: '快递员电话', isChecked: true},
		// 	{name: 'sent_date', label: '发货时间', isChecked: true},
		// 	{name: 'create_time', label: '创建时间', isChecked: true},
		// 	{name: 'creator', label: '创建人', isChecked: true},
		// 	{name: 'update_time', label: '修改时间', isChecked: true},
		// 	{name: 'updater', label: '需改人', isChecked: true},
		// 	{name: 'status', label: '发货单状态'}
		// ];
		$scope.ths = {
			orders_no: {label: '订单号', isChecked: true},
			shipment_no: {label: '发货单号', isChecked: true},
			customer_code: {label: '客户编号', isChecked: false},
			customer_name: {label: '客户姓名', isChecked: true},
			address: {label: '客户地址', isChecked: true},
			customer_tel: {label: '客户电话', isChecked: true},
			amount: {label: '付款金额', isChecked: true},
			shipped_qty: {label: '发货数量', isChecked: true},
			has_invoice: {label: '是否有发票', isChecked: true},
			express_code: {label: '快递公司编号', isChecked: false},
			express_orders_no: {label: '快递单号', isChecked: true},
			express_name: {label: '快递公司', isChecked: false},
			express_cost: {label: '快递费用', isChecked: true},
			courier: {label: '快递员', isChecked: true},
			courier_tel: {label: '快递员电话', isChecked: false},
			sent_date: {label: '发货时间', isChecked: true},
			create_time: {label: '创建时间', isChecked: false},
			creator: {label: '创建人', isChecked: false},
			update_time: {label: '修改时间', isChecked: false},
			updater: {label: '需改人', isChecked: false},
			status: {label: '发货单状态', isChecked: false}
		};

		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getShipmentsList();
		};

		// 获取库房列表
		$scope.getShipmentsList = function() {
			var req = {
				pageSize: 10000,
				pageNo: 1
			};

			return $http.post(config.basewms + 'inner/shipments/', req)
				.success(function(data) {
					$scope.shipments = data.records;

					$scope.shipments.meta = {
						pageSize: data.pageSize,
						pageNo: data.pageNo,
						recordsCount: data.recordsCount,
						pageNumber: data.pageNumber
					};
				});
		};

		$scope.getShipmentsList();

		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Adjust', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Print', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Port', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}]);
