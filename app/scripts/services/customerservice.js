'use strict';

angular.module('mainApp')
.service('CustomerService', ['$http', function UUDInfoService($http) {

	/***************** 客户信息管理开始 ***********************/

	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {

		var suffix = '';

		switch (type) {
			case 'customer_statistics':
				suffix = 'customer_info';
				break;

			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		var suffix;

		switch (type) {
			case 'tradedCustomer':
				suffix = 'customer_load';
				break;

			case 'customer':
				suffix = 'consumer_list';
				break;

			case 'contact':
				suffix = 'search_contact';
				break;

			default: break;

		}
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

		return $http.post(baseurl + suffix, model);
	}


	/***************** 客户信息管理结束 ***********************/

}]);
