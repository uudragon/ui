'use strict';

angular.module('mainApp')
.controller('CommodityCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CommodityManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('CommodityCtrl', {$scope: $scope});

	}])

	// 入库单管理
	.controller('StockIn', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		var $receiptForm = $('#receipt-form'),
			$goodsDetailsForm = $('#good-details-form');


		// 搜索下拉
		$scope.filters = [
			{name: '入库单号', value: 'receipt_code', input: true},
			{name: '所在库房', value: 'warehouse', input: true},
			{name: '预入库时间', value: '', date: true},
			{name: '入库时间', value: '', date: true},
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'receipt_code', label: '入库单号', isChecked: true},
			{name: 'create_time', label: '预入库时间', isChecked: true},
			{name: 'receipt_desc', label: '入库描述', isChecked: true},
			{name: 'status', label: '入库单状态', isChecked: true},
			{name: 'warehouse', label: '所在库房', isChecked: true},
			{name: 'create_time', label: '入库时间', isChecked: true},
			{name: 'create_time', label: '创建时间', isChecked: true},
			{name: 'creator', label: '创建人', isChecked: true},
			{name: 'update_time', label: '更新时间', isChecked: true},
			{name: 'updater', label: '更新人', isChecked: true}
		];

		// 获取商品列表
		$scope.getCommdityList = function() {
			return $http.post(config.basewms + 'baseinfo/query_goods_list/', {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			})
			.success(function(data) {
				$scope.goods = data.records;
				$scope.goods.meta = {
						pageSize: data.pageSize,
						pageNo: data.pageNo ? data.pageNo : 1,
						recordsCount: data.recordsCount,
						pageNumber: data.pageNumber
					};
				});
		};

		// 新建入库单
		$scope.newReceipt = function(form) {
			$scope.resetForm(form);
			$scope.receipt = {
				receipt_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
				details: []
			};

			$scope.getCommdityList()
				.success(function() {
					$receiptForm.modal('show');
				});
		};

		// 修改商品
		$scope.editGood = function(good, form) {
			$scope.resetForm(form);
			$scope.productGood = good;
			$scope.productTmpGood = angular.copy(good);
			$goodsDetailsForm.modal('show');
		};

		// 保存商品详情
		$scope.saveGoodToProduct = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $goodsDetailsForm)) return;
			$scope.productGood.qty = $scope.productTmpGood.qty;
			$scope.productGood.is_gift = $scope.productTmpGood.is_gift;
			$goodsDetailsForm.modal('hide');
		};


		// 为产品添加商品
		$scope.addGoodToReceipt = function(good) {

			var exists = false;

			angular.forEach($scope.receipt.details, function(existGood) {
				if (existGood.goods_code === good.goods_code) {
					exists = true;
					return;
				}
			});

			if (!exists) {
				$receiptForm.modal('info', '添加成功');
				$scope.receipt.details.push({
					goods_code: good.goods_code,
					qty: '1'
				});
			} else {
				$receiptForm.modal('info', '已经存在, 请勿重复添加');
			}
		};

		$scope.removeGood = function(index) {
			$scope.receipt.details.splice(index, 1);
		};

		// 新建入库单
		$scope.editReceipt = function(form) {
			$scope.storage = {
				storage_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account
				// storage_status: '1',
				// storage_type: '1'
			};
			$receiptForm.modal('show');
		};

		// 保存入库单
		$scope.saveReceipt = function(form) {
			if (!$scope.validateForm(form, $receiptForm)) return;

			$scope.processing(form, $receiptForm);

			$http.post(config.basewms + 'inbound/receipt/create/', $scope.receipt)
				.success($scope.successHandler(form, $receiptForm, $scope.getReceiptList))
				.error($scope.errorHandler(form, $receiptForm));
		};

		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getReceiptList();
		};

		$scope.getReceiptList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'inbound/receipts/', req)
				.success(function(data) {
					$scope.receipts = data.records;
					$scope.receipts.meta = {
						pageSize: data.pageSize,
						pageNo: data.pageNo ? data.pageNo : 1,
						recordsCount: data.recordsCount,
						pageNumber: data.pageNumber
					};
				});
		};

		$scope.getReceiptList();

		// inherit functions from parent
		$controller('CommodityManager', {$scope: $scope});
	}])

	// 商品入库
	.controller('Storage', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		var $storageForm = $('#storage-form');

		// 搜索下拉
		$scope.filters = [
			{name: '商品编号', value: 0, input: true},
			{name: '商品名称', value: 1, input: true},
			{name: '所在库房', value: 1, input: true},
			{name: '入库时间', value: 1, date: true},
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: '', label: '入库单号', isChecked: true},
			{name: '', label: '预入库时间', isChecked: true},
			{name: '', label: '入库描述', isChecked: true},
			{name: '', label: '入库单状态', isChecked: true},
			{name: '', label: '所在库房', isChecked: true},
			{name: '', label: '入库时间', isChecked: true},
			{name: '', label: '创建时间', isChecked: true},
			{name: '', label: '创建人', isChecked: true},
			{name: '', label: '更新时间', isChecked: true},
			{name: '', label: '更新人', isChecked: true}
		];


		// 新建入库单
		$scope.newStorage = function(form) {
			$scope.resetForm(form);
			$scope.storage = {
				storage_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
			};
			$storageForm.modal('show');
		};

		// inherit functions from parent
		$controller('CommodityManager', {$scope: $scope});

	}]);
