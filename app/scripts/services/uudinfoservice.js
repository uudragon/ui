'use strict';

angular.module('mainApp')
.service('UUDInfoService', function UUDInfoService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客户信息管理开始 ***********************/
	/**
	 * Load Customer
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.loadCustomer = function($scope) {
		var suffix = 'bam/customer_load.php';

		$http.post(baseurl + suffix, $scope.model)
			.success(function(data, status) {
				$.extend($scope.model, data);
			})
			.error(function(data, status) {
				console.log('load customer error status:' + status);
				$scope.model = {
					number: 13123,
					type: '已付款'
				}
			})
	}

	/**
	 * New Customer
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newCustomer = function($scope) {
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

		console.log($scope.model);
		console.log($scope);

		$http.post(baseurl + suffix, $scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('new customer error status:' + status);
				return false;
			})
	}

	/**
	 * New Order
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newOrder = function($scope) {
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

		$http.post(baseurl + suffix, $scope.model)
		.success(function(data, status) {
			return true;
		})
		.error(function(data, status) {
			console.log('new order error status: ' + status);
			return false;
		})
	}
	/***************** 客户信息管理结束 ***********************/

});
