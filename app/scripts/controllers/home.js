'use strict';

angular.module('mainApp')
.controller('HomeCtrl', ['$scope', '$controller', function ($scope, $controller) {
	$scope.currentPage = 1;
	$scope.searchModel = {};

	$scope.getOrders = function() {
		console.log('pagination: ', $scope.searchModel);
	};

	$scope.ths = [
					{label: '客户姓名', isShow: true},
					{label: '订单编号', isShow: true},
					{label: '客户电话', isShow: true},
					{label: '所在省', isShow: true},
					{label: '城市', isShow: true},
					{label: '订购类型', isShow: true},
					{label: '付款状态', isShow: true},
					{label: '创建时间', isShow: true},
					{label: '联系次数', isShow: true}
				];

	$controller('MainCtrl', {$scope: $scope});
}]);
