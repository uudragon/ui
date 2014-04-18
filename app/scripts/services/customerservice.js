'use strict';

angular.module('mainApp')
.service('CustomerService', function UUDInfoService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客户信息管理开始 ***********************/
	
	/**
	 * Load last Traded Customer
	 *
	 */
	this.loadCustomer = function(model) {
		var suffix = 'bam/customer_load.php';

		return $http.post(baseurl + suffix, model);
	}

	/**
	 * New Customer
	 *
	 */
	this.newCustomer = function(model) {
		var suffix = '';
		console.log(model);

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
	 * 获取预订总数和成交客户
	 *
	 */
	this.loadCustomerInfo = function(model) {
		return $http.post(baseurl + 'bam/customer_info.php', model);
	}


	/**
	 * 客户查询
	 *
	 */

	this.search = function(model) {
		console.log(model);
		var suffix = 'bam/search_contact.php';

		return $http.post(baseurl + suffix, model);
	}

	/***************** 客户信息管理结束 ***********************/

});
