'use strict';

angular.module('mainApp')
.service('CustomerService', ['$http', function UUDInfoService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客户信息管理开始 ***********************/


	this.loadInfo = function(model, type) {

		var suffix = '';

		switch (type) {
			case 'customerInfo':
				suffix = 'bam/customer_info';
				break;

			default: break;

		}
		return $http.post(baseurl + suffix, model);
	}


	this.search = function(model, type) {
		console.log(model);
		var suffix;

		switch (type) {
			case 'customer':
				suffix = 'bam/customer_load';
				break;

			case 'contact':
				suffix = 'bam/search_contact';
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


	/***************** 客户信息管理结束 ***********************/

}]);
