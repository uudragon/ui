'use strict';

angular.module('mainApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		$http.post(baseurl + 'bam/basic_info.php', $scope.model)
		.success(function(data, status) {
			$scope.date = new Date();
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

	/**
	 * 获取预订总数和成交客户
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.queryContactInfo = function($scope) {
		$http.post(baseurl + 'bam/customer_info.php')
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
			console.log('search order error status: ' + status + ' use dummy data');

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
	 * 获取员工相关信息
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.queryEmployeeInfo = function($scope) {
		$http.post(baseurl + 'employee_info')
		.success(function(data, status) {
			$scope.employees = data;
		})
		.error(function(data, status) {
			console.log('query employees error status: ' + status + ' use dummy data');

			$scope.employees = {
				'sum': 100321,
				'count_finished': 200,
				'count_end_today': 120,
				'count_unfinished': 5000,
				'sum_history': 23245000
			};
		})
	}


	/**
	 * 员工查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchEmployee = function($scope) {
		$http.post(baseurl + 'bam/search_employee.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {
			console.log('search employees error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{
					employees_no: '00123',
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
	 * 销售额信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.querySalesInfo = function($scope) {
		$http.post(baseurl + 'bam/search_sales.php', $scope.model)
		.success(function(data, status) {
			$scope.sales = data;
		})
		.error(function(data, status) {
			console.log('search sales error status: ' + status + ' use dummy data');

			// dummy data
			$scope.sales = {
				'sales_today': 100321,
				'sales_history': 200,
				'sales_added': 120,
				'sales_should': 5000,
				'sales_balance': 23245000
			};
		})
	}

	/**
	 * 保证金信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchDeposit = function($scope) {
		$http.post(baseurl + 'bam/search_deposit.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {

			console.log('search deposit error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000}
			]
		})
	}

	/**
	 * 返款信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchRebate = function($scope) {
		$http.post(baseurl + 'bam/search_rebate.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {

			console.log('search rebate error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{agent_code: 21, quidco_amount: 5000, quidco_detail: '四月返款', quidco_desc: '银行卡转账', accu_quidco_amount: 9000, remark: '四月返款'}
			]
		})
	}

	/**
	 * 入账信息查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.searchRecorded = function($scope) {
		$http.post(baseurl + 'bam/search_recorded.php', $scope.model)
		.success(function(data, status) {
			$scope.result = data;
		})
		.error(function(data, status) {

			console.log('search deposit error status: ' + status + ' use dummy data');

			// dummy data
			$scope.result = [
				{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000},
				{add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000}
			]
		})
	}


});
