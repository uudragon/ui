'use strict';

angular.module('mainApp')
.service('FinancialService', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 财务管理开始 ***********************/
	/**
	 * 销售额信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.querySalesInfo = function($scope) {
		$http.post(baseurl + 'bam/search_sales.php', $scope.model)
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
	}

	/**
	 * 保证金信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchDeposit = function($scope) {
		console.log($scope.searchModel);
		$http.post(baseurl + 'bam/search_deposit.php', $scope.model)
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
	}

	/**
	 * 返款信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchRebate = function($scope) {
		$http.post(baseurl + 'bam/search_rebate.php', $scope.model)
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
	}

	/**
	 * 入账信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchOverallRecorded = function ($scope) {
	 	$http.post(baseurl + 'bam/search_overall_recorded.php', $scope.model)
		.success(function(data, status) {
			$scope.recordedNum = data;
		})
		.error(function(data, status) {

			console.log('search recorded error status: ' + status + ' use dummy data');

			// dummy data
			$scope.recordedNum = {recorded_today: 20000, recorded_total: 51870120};
		})
	 }

	this.searchRecorded = function($scope) {
		$http.post(baseurl + 'bam/search_recorded.php', $scope.model)
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
	}

	/***************** 财务管理结束 ***********************/


});
