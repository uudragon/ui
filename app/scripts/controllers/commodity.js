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
	.controller('storage', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('CommodityManager', {$scope: $scope});

	}]);
