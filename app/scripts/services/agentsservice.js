'use strict';

angular.module('mainApp')
.service('AgentsService', ['$http', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 代理商管理开始 ***********************/


	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 获取优惠码信息
			case 'promoCodeInfo':
				suffix = 'bam/search_overall_promo.php';
				break;

			// 获取代理商排名
			case 'rankInfo':
				suffix = 'bam/search_agent_rank.php';
				break;
			
			// 获取销售信息
			case 'salesInfo':
				suffix = 'bam/search_sales_info.php';
				break;

			// 获取代理商名单
			case 'overallAgent':
				suffix = 'bam/search_overall_agent.php';
				break;

			// 获取代理商列表
			case 'agents':
				suffix = 'bam/search_agent.php';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			// 保证金信息查询
			case 'rank':
			suffix = 'bam/search_deposit.php';
			break;

			// 返款信息查询
			case 'promoCode':
			suffix = 'bam/search_rebate.php';
			break;
			
			// 入账信息查询
			case 'sales':
			suffix = 'bam/search_recorded.php';
			break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	 /***************** 代理商管理结束 ***********************/
	}]);
