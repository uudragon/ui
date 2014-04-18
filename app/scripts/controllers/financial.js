'use strict';

angular.module('mainApp')
.controller('FinancialCtrl', ['$scope', 'FinancialService', function ($scope, FinancialService) {

	$scope.loadInfo = function(type) {

		FinancialService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
				switch (type) {
					case 'salesInfo':
						$scope.statistics = {'sales_today': 100321, 'sales_history': 200, 'sales_added': 120, 'sales_should': 5000, 'sales_balance': 23245000 };
						break;

					case 'employeeInfo':
						$scope.statistics = {'sum': 100321, 'count_finished': 200, 'count_end_today': 120, 'count_unfinished': 5000, 'sum_history': 23245000 };
						break;
					
					case 'recordedInfo':
						$scope.statistics = {
							sales_today: 51222343,
							sales_history: 1234252342,
							recorded_today: 1223,
							recorded_total: 52344123
						};
						break;

					default: break;
				}
			})
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;
		
		FinancialService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');

				switch (type) {
					case 'deposit':
						$scope.result = [{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000} ];
						break;

					case 'rebate':
						$scope.result = [{agent_code: 21, quidco_amount: 5000, quidco_detail: '四月返款', quidco_desc: '银行卡转账', accu_quidco_amount: 9000, remark: '四月返款'} ];
						break;
					
					case 'recorded':
						$scope.result = [{enter_amount: 20000, bank_code: '中国银行', account_name: '虚竹', account_no: 51870120, remark: '银行付款1'} ];
						break;

					default: break;
				}

				$scope.pages = 10;
			})
	}
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('FinancialManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.financial.deposit') || $scope.$state.includes('root.financial.rebate') ) {
			// 销售额信息查询
			$scope.loadInfo('salesInfo');
		} else if ( $scope.$state.includes('root.financial.recorded') ) {
			// 查询入账总体信息
			$scope.loadInfo('recordedInfo');
		}
	
		$controller('FinancialCtrl', {$scope: $scope});

	}])
