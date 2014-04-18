'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', 'ShipService', function ($scope, ShipService) {

	$scope.loadInfo = function(type) {
		if (!type) return;

		ShipService.loadInfo($scope.model, type)
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
			})
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;

		// var fakeData = {
		// 	'YN':0
		// }
		// $.extend($scope.searchModel, fakeData);

		ShipService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');
			})
	}

	$scope.newShip = function() {

		ShipService.newShip($scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('shipment_save error status: ' + status);
			})
	}

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ShipManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.ship.summary') ) {
			// 获取代理商排名等信息
			$scope.loadInfo('orderCountInfo');

		}

		// inherit functions from parent
		$controller('ShipCtrl', {$scope: $scope});

	}])
