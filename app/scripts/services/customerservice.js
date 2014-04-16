'use strict';

angular.module('mainApp')
.service('CustomerService', function UUDInfoService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客户信息管理开始 ***********************/
	/**
	 * Load Customer
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.loadCustomer = function(model) {
		var suffix = 'bam/customer_load.php';

		return $http.post(baseurl + suffix, model);
	}

	/**
	 * New Customer
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newCustomer = function(model) {
		var suffix = '';

		switch ($scope.model.btn) {
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

		$http.post(baseurl + suffix, model);
	}

	/***************** 客户信息管理结束 ***********************/

});
