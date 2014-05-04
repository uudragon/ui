'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', ['$scope', '$controller', function ($scope, $controller) {
	
	$scope.objType = 'Financial';

	$controller('MainCtrl', {$scope: $scope});

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('FinancialManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.is('root.financial.deposit') || $scope.$state.is('root.financial.rebate') ) {
			// 销售额信息查询
			$scope.load('cash_deposit_statistics');
		} else if ( $scope.$state.is('root.financial.recorded') ) {
			// 查询入账总体信息
			$scope.load('recorded_statistics');
		}
	
		$controller('FinancialCtrl', {$scope: $scope});

	}])
