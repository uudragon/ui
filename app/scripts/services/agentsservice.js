'use strict';

angular.module('mainApp')
.service('AgentsService', ['$http', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 代理商管理开始 ***********************/
	/**
	 * 代理商名单信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchOverallAgent = function (model) {
	 	return $http.post(baseurl + 'bam/search_overall_agent.php', model);
	 }

	/**
	 * 获取优惠码信息
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchPromoCode = function (model) {
	 	return $http.post(baseurl + 'bam/search_overall_promo.php', model);
	 }

	/**
	 * 获取优惠码信息
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchSalesInfo = function (model) {
	 	return $http.post(baseurl + 'bam/search_sales_info.php', model);
	 }

	 //代理商名单
	 this.searchAgent = function (model) {
	 	return $http.post(baseurl + 'bam/search_agent.php', model);
	 }

	 //代理商排名
	 this.searchAgentRank = function (model) {
	 	return $http.post(baseurl + 'bam/search_agent_rank.php', model);
	 }

	 /***************** 代理商管理结束 ***********************/
}]);
