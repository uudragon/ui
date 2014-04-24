'use strict';

angular.module('mainApp')
.service('AgentsService', ['$http', function ($http) {

	/***************** 代理商管理开始 ***********************/
	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {

			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			case 'agent_statistics':
				suffix = 'agent_statistics';
				break;

			// 获取优惠码信息
			case 'coupon_uud_statistics':
				suffix = 'coupon_uud_statistics';
				break;

			// 获取代理商排名
			case 'coupon_agent_statistics':
				suffix = 'coupon_agent_statistics';
				break;

			// 获取销售信息
			case 'orders_statistics':
				suffix = 'orders_statistics';
				break;

			// 获取代理商名单
			case 'overallAgent':
				suffix = 'search_overall_agent';
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

		return $http.post(baseurl + suffix, model);
	}

	 /***************** 代理商管理结束 ***********************/
	}]);
