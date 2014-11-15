'use strict';

angular.module('mainApp')
.controller('StorehouseCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('StorehouseManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('StorehouseCtrl', {$scope: $scope});

	}])
	.controller('Define', ['$scope', '$controller', function ($scope, $controller) {

		// 搜索下拉
		$scope.filters = [
			{name: '客户姓名', value: 0},
			{name: '客户电话', value: 1},
			{name: '城市', value: 2},
			{name: '创建时间', value: 3},
			{name: '联系次数', value: 4},
			{name: '订单编号', value: 5},
			{name: '订单状态', value: 6},
			{name: '付款类别', value: 7},
			{name: '付款状态', value: 8},
			{name: '工单状态', value: 9}
		];

		// inherit functions from parent
		$controller('StorehouseManager', {$scope: $scope});

	}])
	.controller('Audit', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('StorehouseManager', {$scope: $scope});

	}])
	.controller('Remain', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('StorehouseManager', {$scope: $scope});

	}]);
