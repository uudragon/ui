'use strict';

angular.module('mainApp')
.controller('InfoCtrl', ['$scope', 'InfoService', function ($scope, InfoService) {
	$scope.summit = function() {
		InfoService.newCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('new customer error status:' + status);
			})
	}
	$scope.newOrder = function() {
		InfoService.newOrder($scope.model)
		.success(function(data, status) {
			console.log('ok');
		})
		.error(function(data, status) {
			console.log('new order error status: ' + status);
		})
	}
}])
	.controller('TradedCtrl', ['$scope', 'InfoService', '$controller', function ($scope, InfoService, $controller) {

		InfoService.loadCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('load customer error status:' + status);
				$scope.model = {
					number: 13123,
					type: '已付款'
				}
			})

		$controller('InfoCtrl', {$scope: $scope})
	}])
