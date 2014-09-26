'use strict';

angular.module('mainApp')
.controller('HomeCtrl', ['$scope', '$controller', function ($scope, $controller) {
	$scope.currentPage = 1;
	$scope.searchModel = {};

	$scope.getOrders = function() {
		console.log('pagination: ', $scope.searchModel);
	}

	$controller('MainCtrl', {$scope: $scope});
}]);
