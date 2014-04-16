'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', function ($scope, FinancialService) {
	// 获取保证金相关信息
	FinancialService.querySalesInfo($scope);

})
	.controller('depositManage', function ($scope, FinancialService) {
		// 搜索
		$scope.search = function () {
			$scope.searchModel = $scope.searchModel || {};
			// 查询保证金具体信息
			FinancialService.searchDeposit($scope);
		};
	})
	.controller('rebateManage', function ($scope, FinancialService) {
		// 查询保证金具体信息
		FinancialService.searchRebate($scope);

	})
	.controller('recordedManage', function ($scope, FinancialService) {
		//查询入账总体信息
		FinancialService.searchOverallRecorded($scope);

		// 查询入账具体信息
		FinancialService.searchRecorded($scope);

	})
