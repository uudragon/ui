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
	.controller('Storage', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

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
			{name: '', label: '商品编号', isChecked: true},
			{name: '', label: '商品名称', isChecked: true},
			{name: '', label: '商品数量', isChecked: true},
			{name: '', label: '所在库房', isChecked: true},
			{name: '', label: '入库类型', isChecked: true},
			{name: '', label: '入库时间', isChecked: true},
			{name: '', label: '入库人', isChecked: true},
			{name: '', label: '更新时间', isChecked: true},
			{name: '', label: '更新人', isChecked: true}
		];


		$scope.newCommdity = function() {
			$('#new-commidy').modal('show');
			$scope.commodity = {};
			$scope.commodity.create_time = $filter('now')();
			$scope.commodity.update_time = $scope.commodity.create_time;
		}

		// inherit functions from parent
		$controller('CommodityManager', {$scope: $scope});

	}]);
