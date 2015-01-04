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

	//入库单管理
	.controller('StockIn', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

		var $stockInForm = $('#stock-in-form');

		// 搜索下拉
		$scope.filters = [
			{name: '入库单号', value: 0, input: true},
			{name: '所在库房', value: 1, input: true},
			{name: '预入库时间', value: 2, date: true},
			{name: '入库时间', value: 3, date: true},
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
		$scope.newStockIn = function(form) {
			$scope.resetForm(form);
			$scope.storage = {
				storage_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
			};
			$stockInForm.modal('show');
		};

		// inherit functions from parent
		$controller('CommodityManager', {$scope: $scope});
	}])

	//商品入库
	.controller('Storage', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

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
