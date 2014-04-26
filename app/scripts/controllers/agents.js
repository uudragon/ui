'use strict';

angular.module('mainApp')
//代理商管理
.controller('AgentsCtrl', ['$scope', 'AgentsService', function ($scope, AgentsService) {

	$scope.loadInfo = function(type) {

		AgentsService.loadInfo($scope.model, type)
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(config.errorLog('load', type))
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;
		
		AgentsService.search($scope.searchModel, type)
			.success(function(data, status) {

				switch (type) {
					case 'uudCouponcode':
						$scope.uudResult = data;
						break;

					case 'agentCouponcode':
						$scope.agentResult = data;
						break;

					default: 
						$scope.result = data;
					break;
				}
			})
			.error(config.errorLog('search', type))
	}

	$scope.updateSearchType = function(type) {
		$scope.type = type;
	}


}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('AgentsManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.is('root.agents.list') ) {
			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			$scope.loadInfo('agent_statistics');
		} else if ( $scope.$state.is('root.agents.rank') ) {
			// 获取代理商排名等信息
			$scope.loadInfo('rank_agent_statistics');
		} else if ( $scope.$state.is('root.agents.promocode') ) {
			// 获取优惠码信息
			$scope.loadInfo('coupon_agent_statistics');
		} else if ( $scope.$state.is('root.agents.sales') ) {
			// 获取销售信息
			$scope.loadInfo('orders_statistics');
		}

		$controller('AgentsCtrl', {$scope: $scope});

	}])
