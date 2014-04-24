'use strict';

angular.module('mainApp')
.service('FinancialService', ['$http', function ($http) {

	/***************** 财务管理开始 ***********************/
	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 销售额信息查询
			case 'cash_deposit_statistics':
				suffix = 'cash_deposit_statistics';
				break;

			// 查询入账总体信息
			case 'recorded_statistics':
				suffix = 'search_overall_recorded';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			// 保证金信息查询
			case 'deposit':
				suffix = 'cash_deposit_list';
				break;

			// 返款信息查询
			case 'rebate':
				suffix = 'quidco_list';
				break;
		
			// 入账信息查询
			case 'recorded':
				suffix = 'search_recorded';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	/***************** 财务管理结束 ***********************/

}]);
