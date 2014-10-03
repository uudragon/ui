'use strict';

angular.module('mainApp')
.controller('HomeCtrl', ['$scope', '$controller', function ($scope, $controller) {
	$scope.currentPage = 1;
	$scope.searchModel = {};

	$scope.getOrders = function() {
		console.log('pagination: ', $scope.searchModel);
	};

	$scope.isAllThsShow = true;
	$scope.ths = [
					{label: '客户姓名', isChecked: true},
					{label: '订单编号', isChecked: true},
					{label: '客户电话', isChecked: true},
					{label: '所在省', isChecked: true},
					{label: '城市', isChecked: true},
					{label: '订购类型', isChecked: true},
					{label: '付款状态', isChecked: true},
					{label: '创建时间', isChecked: true},
					{label: '联系次数', isChecked: true}
				];

	$controller('MainCtrl', {$scope: $scope});
}]);
