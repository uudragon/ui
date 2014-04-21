'use strict';

angular.module('mainApp')
.service('FinancialService', ['$http', function ($http) {

	/***************** 财务管理开始 ***********************/
	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 销售额信息查询
			case 'salesInfo':
				suffix = 'search_sales_info.php';
				break;

			// 查询入账总体信息
			case 'recordedInfo':
				suffix = 'search_overall_recorded.php';
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
				suffix = 'search_deposit.php';
				break;

			// 返款信息查询
			case 'rebate':
				suffix = 'search_rebate.php';
				break;
		
			// 入账信息查询
			case 'recorded':
				suffix = 'search_recorded.php';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	/***************** 财务管理结束 ***********************/

}]);
