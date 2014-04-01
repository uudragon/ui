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
	 * @param  object $scope
	 * @return none
	 */
	this.queryCustomerInfo = function($scope) {
		$http.post(baseurl + 'customer_info')
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
	 * 获取工单相关信息
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.queryOrderInfo = function($scope) {
		$http.post(baseurl + 'order_info')
		.success(function(data, status) {
			$scope.order = data;
		})
		.error(function(data, status) {
			console.log('query order error status: ' + status + ' use dummy data');

			$scope.order = {
				'sum': 100321,
				'count_finished': 200,
				'count_end_today': 120,
				'count_unfinished': 5000,
				'sum_history': 23245000
			};
		})
	}

	/**
	 * 客户查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchContact = function($scope) {
		$http.post(baseurl + 'bam/search_contact.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {
			console.log('search contact error status: ' + status + ' use dummy data');

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
	 * 工单查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchOrder = function($scope) {
		$http.post(baseurl + 'bam/search_order.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {
			console.log('search contact error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{
					order_no: '00123',
					type: '投诉快递',
					status: '已处理',
					result: '更换快递',
					channel: '电话客服',
					update_time: new Date(),
					create_time: new Date(),
					refer: '否',
					creater: '电话客服1',
					customer: {
						code: '312303',
						name: '虚竹',
						gender: '男',
						c_name: '玄慈',
						c_gender: '男',
						order_type: '一年',
						phone: '123123497',
						addr: '少林寺'
					}
				}
			]
			$scope.pages = 10;
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

});
