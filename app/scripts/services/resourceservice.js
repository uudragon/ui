'use strict';

angular.module('mainApp')
.service('Resource', ['$http', function ($http) {

	var baseurl = config.baseurl;

	// 加载统计信息，或者指定的record
	this.load = function(model, type) {
		console.log('load', type);

		var suffix = '';

		switch (type) {

			/**
			 * CUSTOMER
			 * ---------------------------------
			 */

			case 'customer_statistics':
				suffix = 'customer_info';
				break;

			/**
			 * CUSTOMER SERVICE
			 * ---------------------------------
			 */

			// 获取工单相关信息
			case 'order_statistics':
				suffix = 'order_statistics';
				break;

			// 获取员工相关信息
			case 'online_statistics':
				suffix = 'online_statistics';
				break;

			/**
			 * FINANCIAL
			 * ---------------------------------
			 */

			// 销售额信息查询
			case 'cash_deposit_statistics':
				suffix = 'cash_deposit_statistics';
				break;

			// 查询入账总体信息
			case 'recorded_statistics':
				suffix = 'search_overall_recorded';
				break;

			/**
			 * AGENT
			 * ---------------------------------
			 */

			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			case 'agent_statistics':
				suffix = 'agent_statistics';
				break;

			// 获取优惠码信息
			case 'coupon_agent_statistics':
				suffix = 'coupon_agent_statistics';
				break;

			// 获取代理商排名
			case 'rank_agent_statistics':
				suffix = 'rank_agent_statistics';
				break;

			// 获取销售信息
			case 'orders_statistics':
				suffix = 'orders_statistics';
				break;

			// 获取代理商名单
			case 'overallAgent':
				suffix = 'search_overall_agent';
				break;

			/**
			 * SHIP
			 * ---------------------------------
			 */

			// 查询订单总数、销售总金额等
			case 'shipment_statistics':
				suffix = 'shipment_statistics';
				break;

			// 获取发货主档和明细信息
			case 'ship_details':
				suffix = 'ship_details_statistics';
				break;
			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;
		console.log('search', type);
		console.log(model);
		switch (type) {

			/**
			 * CUSTOMER
			 * ---------------------------------
			 */

			case 'tradedCustomer':
				suffix = 'customer_load';
				break;

			case 'customer':
				suffix = 'consumer_list';
				break;

			case 'contact':
				suffix = 'search_contact';
				break;

			/**
			 * CUSTOMER SERVICE
			 * ---------------------------------
			 */

			 // 领取工单
			 case 'task':
			 	suffix = 'getTask';
			 	break;

			 // 工单查询
			 case 'order':
			 	suffix = 'search_order';
			 	break;

			 // 员工查询
			 case 'employee':
			 	suffix = 'search_employee';
			 	break;

			/**
			 * FINANCIAL
			 * ---------------------------------
			 */

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

			/**
			 * AGENT
			 * ---------------------------------
			 */

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

			/**
			 * SHIP
			 * ---------------------------------
			 */

			case 'ship':
				suffix = 'shipment_query';
				break;

			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}

	this.createNew = function(model, type) {
		var suffix;
		console.log(model, type);
		switch (type) {

			/**
			 * CUSTOMER
			 * ---------------------------------
			 */
			case 'customer':
				switch (model.btn) {
					case 'saved':
						suffix = 'consumer_saved';
						break;

					case 'insert':
						suffix = 'orders_insert';
						break;

					case 'query':
						suffix = 'bamstomer_query';
						break;

					default: break;

				}
				break;


			case 'service':
				switch (model.btn) {
					case 'saved':
						suffix = 'task_saved';
						break;

					case 'insert':
						suffix = 'task_insert';
						break;

					case 'query':
						suffix = 'bamstomer_query';
						break;

				}
				break;


			/**
			 * SHIP
			 * ---------------------------------
			 */


			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}


	this.save = function(model, type) {
		var suffix;
		console.log(model, type);
		switch (type) {

			/**
			 * SHIP
			 * ---------------------------------
			 */

			case 'ship':
				suffix = 'shipment_save';
				break;

			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}

}]);
