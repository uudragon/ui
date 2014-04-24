'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', ['$scope', 'FinancialService', function ($scope, FinancialService) {

	$scope.loadInfo = function(type) {

		FinancialService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(config.errorLog('load', type));
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;
		
		FinancialService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(config.errorLog('search', type))
	}
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('FinancialManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.financial.deposit') || $scope.$state.includes('root.financial.rebate') ) {
			// 销售额信息查询
			$scope.loadInfo('cash_deposit_statistics');
		} else if ( $scope.$state.includes('root.financial.recorded') ) {
			// 查询入账总体信息
			$scope.loadInfo('recorded_statistics');
		}
	
		$controller('FinancialCtrl', {$scope: $scope});

	}])
