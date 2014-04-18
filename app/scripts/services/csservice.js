'use strict';

angular.module('mainApp')
.service('CSService', ['$http', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客服管理开始 ***********************/
	
	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 获取工单相关信息
			case 'orderInfo':
				suffix = 'bam/order_info';
				break;

			// 获取员工相关信息
			case 'employeeInfo':
				suffix = 'bam/employee_info';
				break;

			// 获取员工相关信息
			case 'csInfo':
				suffix = 'bam/customer_service_info';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			// 工单查询
			case 'order':
				suffix = 'bam/search_order';
				break;
			// 员工查询
			case 'employee':
				suffix = 'bam/search_employee';
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

		switch (model.btn) {
			case 'saved':
				suffix = 'bam/consumer_saved';
				break;

			case 'insert':
				suffix = 'bam/orders_insert';
				break;

			case 'query':
				suffix = 'bam/bamstomer_query';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}

	/**
	 * New Ship
	 *
	 */
	this.newShip = function($scope) {
		var suffix = 'bam/ship_new';

		return $http.post(baseurl + suffix, model);
	}

	/***************** 客服管理结束 ***********************/

}]);
