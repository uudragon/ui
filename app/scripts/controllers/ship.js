'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', 'ShipService', function ($scope, ShipService) {

	$scope.loadInfo = function(type) {

		ShipService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
				switch (type) {
					case 'shipInfo':
						$scope.statistics = {'ordersCount': 300, 'salesAmount': 100321, 'accuOrdersCount': 200, 'accuSalesAmount': 120};
						break;

					default: break;
				}
			})
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;
		
		ShipService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');

				switch (type) {
					case 'ship':
						$scope.result = [{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000} ];
						break;

					default: break;
				}

				$scope.pages = 10;
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
