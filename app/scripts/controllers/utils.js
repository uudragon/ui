'use strict';

angular.module('mainApp')
.controller('UtilsCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('UtilsManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('UtilsCtrl', {$scope: $scope});

	}])
	.controller('NewOrder', ['$scope', '$controller', function ($scope, $controller) {



		// inherit functions from parent
		$controller('QAManager', {$scope: $scope});

	}])
