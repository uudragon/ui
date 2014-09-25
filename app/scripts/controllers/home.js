'use strict';

angular.module('mainApp')
.controller('HomeCtrl', ['$scope', '$controller', function ($scope, $controller) {
	$scope.currentPage = 1;
	$scope.searchModel = 2;


	$scope.getOrders = function(page) {
		console.log('pagination update', page);
	}

	$controller('MainCtrl', {$scope: $scope});
}]);
