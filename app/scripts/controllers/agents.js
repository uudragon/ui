'use strict';

angular.module('mainApp')
//代理商管理
.controller('AgentsCtrl', ['$scope', '$controller', function ($scope, $controller) {

	// 搜索
	$scope.performSearch = function (type) {
		if (!type) return;
		
		switch (type) {
			case 'uudCouponcode':
				$scope.search(type, 'uudResult');
				break;

			case 'agentCouponcode':
				$scope.search(type, 'agentResult');
				break;

			default: 
				$scope.result = data;
			break;
		}
	}

	$scope.updateSearchType = function(type) {
		$scope.type = type;
	}

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('AgentsManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.is('root.agents.list') ) {
			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			$scope.load('agent_statistics');
		} else if ( $scope.$state.is('root.agents.rank') ) {
			// 获取代理商排名等信息
			$scope.load('rank_agent_statistics');
		} else if ( $scope.$state.is('root.agents.promocode') ) {
			// 获取优惠码信息
			$scope.load('coupon_agent_statistics');
		} else if ( $scope.$state.is('root.agents.sales') ) {
			// 获取销售信息
			$scope.load('orders_statistics');
		}

		$controller('AgentsCtrl', {$scope: $scope});

	}])
