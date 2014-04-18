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
				suffix = 'bam/search_overall_promo';
				break;

			// 获取代理商排名
			case 'rankInfo':
				suffix = 'bam/search_agent_rank';
				break;

			// 获取销售信息
			case 'salesInfo':
				suffix = 'bam/search_sales_info';
				break;

			// 获取代理商名单
			case 'overallAgent':
				suffix = 'bam/search_overall_agent';
				break;

			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			case 'agentCountInfo':
				suffix = 'bam/agent_queryAgentCount';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			// 获取代理商列表
			case 'agents':
				suffix = 'bam/agent_list';
				break;

			// 保证金信息查询
			case 'deposit':
				suffix = 'bam/search_deposit';
				break;

			// 返款信息查询
			case 'rebate':
				suffix = 'bam/search_rebate';
				break;

			// 入账信息查询
			case 'recorded':
				suffix = 'bam/search_recorded';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	 /***************** 代理商管理结束 ***********************/
	}]);
