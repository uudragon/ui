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

		var $pickmentList = $('#pickment-list'),
			$shipmentForm = $('#shipment-form');

		$('.article-header-search').stop().slideDown('fast');

		// 搜索下拉
		$scope.filters = [
			{name: '月份', value: 'month', subfilters: [{name: '所有', value: ''}, {name: '1月', value: '1'}, {name: '2月', value: '2'}, {name: '3月', value: '3'}, {name: '4月', value: '4'}, {name: '5月', value: '5'}, {name: '6月', value: '6'}, {name: '7月', value: '7'}, {name: '8月', value: '8'}, {name: '9月', value: '9'}, {name: '10月', value: '10'}, {name: '11月', value: '11'}, {name: '12月', value: '12'}]},
			{name: '入库单号', value: 'receipt_code', input: true},
			{name: '入库单状态', value: 'status', subfilters: [{name: '撤销', value: -1}, {name: '未入库', value: 0}, {name: '部分入库', value: 1}, {name: '入库完成', value: 2}]},
			// {name: '所在库房', value: 'warehouse', input: true},
			// {name: '预入库时间', value: '', date: true},
			// {name: '入库时间', value: '', date: true},
			{name: '创建人', value: 'creator', input: true},
			{name: '修改人', value: 'updater', input: true}
		];

		$scope.isAllThsShow = false;
		$scope.ths = [
			// {name: 'id',  label: '序号', isChecked: true},
			{name: 'orders_no',  label: '订单号', isChecked: true},
			{name: 'shipment_no',  label: '发货单号', isChecked: false},
			{name: 'customer_code',  label: '客户编号', isChecked: false},
			{name: 'customer_name',  label: '客户姓名', isChecked: true},
			{name: 'address',  label: '客户地址', isChecked: false},
			{name: 'customer_tel',  label: '客户电话', isChecked: true},
			{name: 'amount',  label: '付款金额', isChecked: true},
			{name: 'shipped_qty',  label: '发货数量', isChecked: true},
			{name: 'has_invoice',  label: '是否有发票', isChecked: false},
			{name: 'express_code',  label: '快递公司编号', isChecked: false},
			{name: 'express_orders_no',  label: '快递单号', isChecked: false},
			{name: 'express_name',  label: '快递公司名称', isChecked: false},
			{name: 'express_cost',  label: '快递费用', isChecked: false},
			{name: 'courier',  label: '快递员', isChecked: false},
			{name: 'courier_tel',  label: '快递员电话', isChecked: false},
			{name: 'sent_date',  label: '发货时间', isChecked: true},
			{name: 'create_time',  label: '创建时间', isChecked: false},
			{name: 'creator',  label: '创建人', isChecked: true},
			{name: 'update_time',  label: '修改时间', isChecked: false},
			{name: 'updater',  label: '需改人', isChecked: true},
			{name: 'status',  label: '发货单状态', isChecked: true}
		];

		// $scope.ths = {orders_no: {label: '订单号', isChecked: true}, shipment_no: {label: '发货单号', isChecked: true}, customer_code: {label: '客户编号', isChecked: false}, customer_name: {label: '客户姓名', isChecked: true}, address: {label: '客户地址', isChecked: true}, customer_tel: {label: '客户电话', isChecked: true}, amount: {label: '付款金额', isChecked: true}, shipped_qty: {label: '发货数量', isChecked: true}, has_invoice: {label: '是否有发票', isChecked: true}, express_code: {label: '快递公司编号', isChecked: false}, express_orders_no: {label: '快递单号', isChecked: true}, express_name: {label: '快递公司', isChecked: false}, express_cost: {label: '快递费用', isChecked: true}, courier: {label: '快递员', isChecked: true}, courier_tel: {label: '快递员电话', isChecked: false}, sent_date: {label: '发货时间', isChecked: true}, create_time: {label: '创建时间', isChecked: false}, creator: {label: '创建人', isChecked: false}, update_time: {label: '修改时间', isChecked: false}, updater: {label: '需改人', isChecked: false}, status: {label: '发货单状态', isChecked: false} };


		// 搜索下拉

		// $scope.ths = [
		// 	{name: 'order_num', label: '序号', isChecked: true},
		// 	{name: 'warehouse_code', label: '库房编号', isChecked: true},
		// 	{name: 'warehouse_code', label: '订单编号', isChecked: true},
		// 	{name: 'warehouse_name', label: '客户姓名', isChecked: true},
		// 	{name: 'warehouse_name', label: '客户电话', isChecked: true},
		// 	{name: 'warehouse_name', label: '详细地址', isChecked: true},
		// 	{name: 'warehouse_name', label: '付款状态', isChecked: true},
		// 	{name: 'address', label: '库房地址', isChecked: true},
		// 	{name: 'type', label: '库房类型', isChecked: true},
		// 	{name: 'creator', label: '创建人', isChecked: true},
		// 	{name: 'create_time', label: '创建时间', isChecked: true},
		// 	{name: 'updater', label: '修改人', isChecked: true},
		// 	{name: 'update_time', label: '修改时间', isChecked: true},
		// 	{name: 'yn', label: '是否生效', isChecked: true}
		// ];


		// 获取发货单列表
		$scope.getShipmentList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'outbound/shipments/', req)
				.success(function(data) {
					$scope.shipments = data.records;
					$scope.shipments.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getShipmentList');

		// 生成拣货单
		$scope.generatePickment = function() {
			var shipment_nos = $scope.getSelectedItems($scope.shipments, 'shipment_no');

			if (!shipment_nos.length) {
				window.alert('请至少选择一个发货单');
				return;
			}

			$http.post(config.basewms + 'outbound/picking_orders/create/', {
					shipment_nos: shipment_nos,
					creator: $scope.currentUser.userNo,
					updater: $scope.currentUser.userNo
				})
				.success(function(data) {
					$scope.pickments = data;
					$pickmentList.modal('show');
				});
		};

		// 出库拣货完成
		$scope.confirmPick = function(form) {
			$scope.processing(form, $pickmentList);

			$http.post(config.basewms + 'shipment/picking/', {
					shipment_no: $scope.shipment_no,
					updater: $scope.currentUser.userNo
				})
				.success($scope.onFine({
					form: form,
					$form: $pickmentList,
					action: $scope.getShipmentList
				}))
				.error($scope.onError({
					form: form,
					$form: $pickmentList
				}));
		};

		// 编辑出库单
		$scope.editShipment = function(shipmentNo, form) {
			$scope.resetForm(form);
			$http.get(config.basewms + 'outbound/shipment/' + shipmentNo + '/')
				.success(function(shipment) {
					$scope.shipment = shipment;
					$shipmentForm.modal('show');
				});
		};

		// 保存出库单
		$scope.saveShipment = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $shipmentForm)) return;

			$scope.processing(form, $shipmentForm);

			$http.post(config.basewms + 'outbound/shipment/save/', $scope.shipment)
				.success($scope.onFine({
					form: form,
					$form: $shipmentForm,
					action: $scope.getShipmentList
				}))
				.error($scope.onError({
					form: form,
					$form: $shipmentForm
				}));
		};


		// $scope.printShipment = function() {

		// };

		// $scope.printExpress = function() {

		// };


		// 获取发货单列表
		$scope.getShipmentList();

		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Adjust', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Pick', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		var $pickmentList = $('#pickment-list'),
			$shipmentList = $('#shipment-list'),
			$shipmentDetail = $('#shipment-detail');

		$('.article-header-search').stop().slideDown('fast');

		// 搜索下拉
		$scope.filters = [
			{name: '月份', value: 'month', subfilters: [{name: '所有', value: ''}, {name: '1月', value: '1'}, {name: '2月', value: '2'}, {name: '3月', value: '3'}, {name: '4月', value: '4'}, {name: '5月', value: '5'}, {name: '6月', value: '6'}, {name: '7月', value: '7'}, {name: '8月', value: '8'}, {name: '9月', value: '9'}, {name: '10月', value: '10'}, {name: '11月', value: '11'}, {name: '12月', value: '12'}]},
			{name: '入库单号', value: 'receipt_code', input: true},
			{name: '入库单状态', value: 'status', subfilters: [{name: '撤销', value: -1}, {name: '未入库', value: 0}, {name: '部分入库', value: 1}, {name: '入库完成', value: 2}]},
			// {name: '所在库房', value: 'warehouse', input: true},
			// {name: '预入库时间', value: '', date: true},
			// {name: '入库时间', value: '', date: true},
			{name: '创建人', value: 'creator', input: true},
			{name: '修改人', value: 'updater', input: true}
		];

		$scope.isAllThsShow = true;
		$scope.ths = [
			{name:'picking_no', label: '拣货单号', isChecked: true},
			{name:'picking_qty', label: '拣货总数量', isChecked: true},
			{name:'status', label: '拣货单状态', isChecked: true},
			{name:'details', label: '拣货单明细', isChecked: true},
			{name:'creator', label: '创建人', isChecked: true},
			{name:'create_time', label: '创建时间', isChecked: true},
			{name:'updater', label: '更新人', isChecked: true},
			{name:'update_time', label: '更新时间', isChecked: true}
		];

		// 获取拣货单列表
		$scope.getPickingOrderList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'outbound/picking_orders/', req)
				.success(function(data) {
					$scope.pickingOrders = data.records;
					$scope.pickingOrders.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.editPickingOrder = function(pickingNo) {
			$http.get(config.basewms + 'outbound/picking_orders/' + pickingNo +'/')
				.success(function(pickingOrder) {
					$scope.pickingOrder = pickingOrder;
					$pickmentList.modal('show');
				});
		};

		// 出库拣货
		$scope.pickOrder = function(pickingNo, form) {
			$scope.processing(form, $pickmentList);
			$http.post(config.basewms + 'outbound/picking_orders/picking/' + pickingNo + '/', {
				updater: $scope.currentUser.userNo
			}).success(function() {
				form.processing = false;
				$pickmentList.modal('info', '拣货成功');
				$scope.pickingOrder.status = 1;
				$scope.getPickingOrderList();
			}).error(function() {
				form.processing = false;
				$pickmentList.modal('info', '拣货失败');
			});
		};

		// 出库拣货完成
		$scope.pickOrderFinished = function(pickingNo, form) {
			$scope.processing(form, $pickmentList);
			$http.post(config.basewms + 'outbound/picking_orders/picking_completed/' + pickingNo + '/', {
				updater: $scope.currentUser.userNo
			}).success($scope.onFine({
				form: form,
				$form: $pickmentList,
				action: $scope.getPickingOrderList,
				msg: '拣货完成'
			})).error($scope.onError({
				form: form,
				$form: $pickmentList,
				msg: '失败'
			}));
		};

		$scope.subSearchModel = {};

		// 查询对应发货单
		$scope.showShipments = function(pickingNo) {
			var req = {
				pageSize: $scope.subSearchModel.pageSize || config.perPage,
				pageNo: $scope.subSearchModel.pageNo || 1
			};

			$http.post(config.basewms + 'outbound/picking_orders/query_shipments/' + pickingNo +'/', req)
				.success(function(data) {
					$scope.shipments = data.records;
					$scope.shipments.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					$shipmentList.modal('show');
				});
		};

		// 发货
		$scope.sendShipment = function(shipment, form) {

			$scope.processing(form, $shipmentList);

			$http.post(config.basewms + 'outbound/shipment/sent/', shipment)
				.success($scope.onFine({
					form: form,
					$form: $shipmentList,
					msg: '发货成功'
				}))
				.error($scope.onError({
					form: form,
					$form: $shipmentList,
					msg: '发货失败'
				}));
		};

		// 查询出库单详细信息
		$scope.showShipmentDetail = function(shipmentNo, form) {

			$http.get(config.basewms + 'outbound/shipment/'  + shipmentNo + '/')
				.success(function(shipment) {
					$scope.shipment = shipment;
					$shipmentDetail.modal('show');
				});
		};

		$scope.getPickingOrderList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getPickingOrderList');

		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}])
	.controller('Port', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('OrderManager', {$scope: $scope});

	}]);
