'use strict';

angular.module('mainApp')
.service('UUDAgentsService', function UUDAgentsService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 代理商管理开始 ***********************/
	/**
	 * 代理商名单信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchOverallAgent = function ($scope) {
	 	$http.post(baseurl + 'bam/search_overall_agent.php', $scope.model)
		.success(function(data, status) {
			$scope.agentInfo = data;
		})
		.error(function(data, status) {

			console.log('search Overall Agent error status: ' + status + ' use dummy data');

			// dummy data
			$scope.agentInfo = {sum_agents: 200, rank_agent_today: 2, sum_sales_today: 8500, sum_sales_history: 51870120, new_customer_today: 25, sum_customer_history: 1000};
		})
	 }

	 //代理商名单
	 this.searchAgent = function ($scope) {
	 	$http.post(baseurl + 'bam/search_agent.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {

			console.log('search Agent error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{agent_code: 12, 
					agent_name: '代理商名称', 
					contract_code: 2500, 
					area: '北京', 
					leal_person: '法人代表', 
					company_type: 2, 
					company_size: '20-100', 
					registered_capital: 30000, 
					agent_permission: '代理权限', 
					begin_time: '2014-03-02 11:00:00', 
					end_time: '2015-03-02 11:00:00', 
					cash_deposit: 20000, 
					contact: '联系方式', 
					address: '地址', 
					remark: '备注'}
			];
		})
	 }

	 //代理商排名
	 this.searchAgentRank = function ($scope) {
	 	$http.post(baseurl + 'bam/search_agent_rank.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {

			console.log('search Agent Rank error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{agent_code: 12, 
					agent_name: '代理商名称', 
					contract_code: 2500, 
					area: '北京', 
					leal_person: '法人代表', 
					company_type: 2, 
					company_size: '20-100', 
					registered_capital: 30000, 
					agent_permission: '代理权限', 
					begin_time: '2014-03-02 11:00:00', 
					end_time: '2015-03-02 11:00:00', 
					cash_deposit: 20000, 
					contact: '联系方式', 
					address: '地址', 
					remark: '备注'}
			];
		})
	 }

	 /***************** 代理商管理结束 ***********************/
});
