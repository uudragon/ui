'use strict';

angular.module('mainApp')
.service('CSService', ['$http', function ($http) {

	/***************** 客服管理开始 ***********************/
	var baseurl = config.baseurl;
	
	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 获取工单相关信息
			case 'order_statistics':
				suffix = 'order_statistics';
				break;

			// 获取员工相关信息
			case 'online_statistics':
				suffix = 'online_statistics';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
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

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	/**
	 * New Order
	 *
	 */
	this.newOrder = function(model) {
		var suffix;
		console.log(model);
		switch (model.btn) {
			case 'saved':
				suffix = 'consumer_saved';
				break;

			case 'insert':
				suffix = 'task_insert';
				break;

			case 'query':
				suffix = 'bamstomer_query';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}

	/***************** 客服管理结束 ***********************/

}]);
