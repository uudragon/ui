'use strict';

angular.module('mainApp')
.service('AgentsService', ['$http', function ($http) {

	/***************** 代理商管理开始 ***********************/
	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 获取优惠码信息
			case 'promoCodeInfo':
				suffix = 'uudCouponcode_query';
				break;

			// 获取代理商排名
			case 'rankInfo':
				suffix = 'search_agent_rank';
				break;

			// 获取销售信息
			case 'salesInfo':
				suffix = 'search_sales_info';
				break;

			// 获取代理商名单
			case 'overallAgent':
				suffix = 'search_overall_agent';
				break;

			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			case 'agentCountInfo':
				suffix = 'agent_statistics';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			// 代理商列表
			case 'agents':
				suffix = 'agent_list';
				break;

			// 获取代理商排名
			case 'rank':
				suffix = 'agent_rank';
				break;

			// 查询优惠码记录
			case 'uudCouponcode':
				suffix = 'uudCouponcode_query';
				break;

			// 查询优惠码记录
			case 'agentCouponcode':
				suffix = 'agentCouponcode_query';
				break;

			// 查询销售记录
			case 'sales':
				suffix = 'search_sales';
				break;

			default: break;

		}
		log(model, type, baseurl+suffix);
		return $http.post(baseurl + suffix, model);
	}


	function log(model, type, url) {
		console.log('searchModel is:', model);
		console.log('type is: ' + type);
		console.log('requrest url is: ' + url);
	}

	 /***************** 代理商管理结束 ***********************/
	}]);
