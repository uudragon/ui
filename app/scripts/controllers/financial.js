'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', function ($scope, UUDFinancialService) {
	// 获取保证金相关信息
	UUDFinancialService.querySalesInfo($scope);

})
	.controller('depositManage', function ($scope, UUDFinancialService) {
		// 搜索
		$scope.search = function () {
			$scope.searchModel = $scope.searchModel || {};
			// 查询保证金具体信息
			UUDFinancialService.searchDeposit($scope);
		};
	})
	.controller('rebateManage', function ($scope, UUDFinancialService) {
		// 查询保证金具体信息
		UUDFinancialService.searchRebate($scope);

	})
	.controller('recordedManage', function ($scope, UUDFinancialService) {
		//查询入账总体信息
		UUDFinancialService.searchOverallRecorded($scope);

		// 查询入账具体信息
		UUDFinancialService.searchRecorded($scope);

	})
