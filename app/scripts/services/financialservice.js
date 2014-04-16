'use strict';

angular.module('mainApp')
.service('FinancialService', ['$http', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 财务管理开始 ***********************/
	/**
	 * 销售额信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.querySalesInfo = function(model) {
		return $http.post(baseurl + 'bam/search_sales.php',model)
	}

	/**
	 * 保证金信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchDeposit = function(model) {
		return $http.post(baseurl + 'bam/search_deposit.php', model);
	}

	/**
	 * 返款信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchRebate = function(model) {
		return $http.post(baseurl + 'bam/search_rebate.php', model)
	}

	/**
	 * 入账信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	 this.searchOverallRecorded = function (model) {
	 	return $http.post(baseurl + 'bam/search_overall_recorded.php', model);
	 }

	this.searchRecorded = function(model) {
		return $http.post(baseurl + 'bam/search_recorded.php', model);
	}

	/***************** 财务管理结束 ***********************/

}]);
