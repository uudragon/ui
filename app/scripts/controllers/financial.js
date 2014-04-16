'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', ['$scope', 'FinancialService', function ($scope, FinancialService) {
	// 获取保证金相关信息
	FinancialService.querySalesInfo()
		.success(function(data, status) {
			$scope.sales = data;
		})
		.error(function(data, status) {
			console.log('search sales error status: ' + status + ' use dummy data');

			// dummy data
			$scope.sales = {
				'sales_today': 100321,
				'sales_history': 200,
				'sales_added': 120,
				'sales_should': 5000,
				'sales_balance': 23245000
			};
		})

}])
	.controller('depositManage', ['$scope', 'FinancialService', function ($scope, FinancialService) {
			// 搜索
			$scope.search = function () {
				$scope.searchModel = $scope.searchModel || {};
				// 查询保证金具体信息
				FinancialService.searchDeposit()
					.success(function(data, status) {
						$scope.result = data;
					})
					.error(function(data, status) {

						console.log('search deposit error status: ' + status + ' use dummy data');

						// dummy data
						$scope.result = [
							{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000},
							{add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000},
							{add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000},
							{add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000}
						]
					})
			};
		}])
	.controller('rebateManage', ['$scope', 'FinancialService', function ($scope, FinancialService) {

			// 查询保证金具体信息
			FinancialService.searchRebate()
				.success(function(data, status) {
					$scope.result = data;
				})
				.error(function(data, status) {
					console.log('search rebate error status: ' + status + ' use dummy data');
					// dummy data
					$scope.result = [
						{agent_code: 21, quidco_amount: 5000, quidco_detail: '四月返款', quidco_desc: '银行卡转账', accu_quidco_amount: 9000, remark: '四月返款'}
					]
				})
		}])
	.controller('recordedManage', ['$scope', 'FinancialService', function ($scope, FinancialService) {
			//查询入账总体信息
			FinancialService.searchOverallRecorded()
				.success(function(data, status) {
					$scope.recordedNum = data;
				})
				.error(function(data, status) {

					console.log('search recorded error status: ' + status + ' use dummy data');

					// dummy data
					$scope.recordedNum = {recorded_today: 20000, recorded_total: 51870120};
				})

			// 查询入账具体信息
			FinancialService.searchRecorded()
				.success(function(data, status) {
					$scope.result = data;
				})
				.error(function(data, status) {
					console.log('search recorded error status: ' + status + ' use dummy data');

					// dummy data
					$scope.result = [
						{enter_amount: 20000, bank_code: '中国银行', account_name: '虚竹', account_no: 51870120, remark: '银行付款1'}
					]
				})

		}])
