'use strict';

angular.module('mainApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		$http.post(baseurl + 'bam/bamstomer_info', $scope.model)
		.success(function(data, status) {
			$scope.loaded = true;
			$.extend($scope, data);
		})
		.error(function(data, status) {
			// use dummy data for dev
			var dummydata = {
				date: new Date(),
				extension: 568459226,
				status: '已订购',
				seat: '001',
				timing: 1220,
				jobNumber: 12304,
				name: "肖锋",
				group: "管理员"
			}
			$.extend($scope, dummydata);
		})
	}

	/**
	 * 获取预订总数和成交客户
	 *
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
	 */
	this.queryCustomerInfo = function($scope) {
		$http.post(baseurl + 'query')
		.success(function(data, status) {
			$scope.statistics = data;
		})
		.error(function(data, status) {
			console.log('query info error status: ' + status + ' use dummy data');

			$scope.statistics = {
				'preorder': 100,
				'dealed': 5000
			};
		})
	}

	/**
	 * 客户查询
	 *
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
	 */
	this.searchCustomer = function($scope) {
		$http.post(baseurl + 'search', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {
			console.log('search customer error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{code: 1, name: 'test1', type: 2, gender: 'male', email: 'testemail@email.com'},
				{code: 4, name: 'test2', type: 6, gender: 'female', email: 'testemdail@email.com'},
				{code: 14, name: 'test3', type: 34, gender: 'male', email: 'test3@email.com'},
				{code: 43, name: 'test4', type: 6, gender: 'female', email: 'test4@email.com'},
			]
			$scope.pages = 10;
		})
	}

	/**
	 * New Customer
	 *
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
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

		$http.post(baseurl + suffix, $scope.model)
		.success(function(data, status) {
			console.log(data);
		})
		.error(function(data, status) {
			console.log('new customer error status:' + status);
		})
	}

	/**
	 * New Order
	 *
	 * @param  {[type]} $scope [description]
	 * @return {[type]}        [description]
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
			console.log(data);
		})
		.error(function(data, status) {
			console.log('new order error status: ' + status);
		})
	}

});
