'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', 'ShipService', function ($scope, ShipService) {

	$scope.queryShip = function() {

		ShipService.queryShip($scope.model)
			.success(function(data, status) {
				console.dir(data);
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('shipment_query error status: ' + status);
			})

	}

	$scope.newShip = function() {

		ShipService.newShip($scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('shipment_save error status: ' + status);
				return false;
			})
	}
}])
	// subControllers
	.controller('shipSummary', ['$scope', '$controller', 'orderCount', function ($scope, $controller, orderCount) {

		$scope.orderCount = orderCount.data;

		// inherit functions from parent
		$controller('ShipCtrl', {$scope: $scope});

	}])
