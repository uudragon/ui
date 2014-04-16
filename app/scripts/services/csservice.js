'use strict';

angular.module('mainApp')
.service('CSService', ['$http', function ($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 客服管理开始 ***********************/
	/**
	 * New Order
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newOrder = function(model) {
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

		return $http.post(baseurl + suffix, model);
	}

	/**
	 * 获取预订总数和成交客户
	 *
	 * @param  object $scope
	 * @return none
	 */
	this.queryContactInfo = function(model) {
		return $http.post(baseurl + 'bam/customer_info.php', model);
	}


	/**
	 * 客户查询
	 *
	 * @param  object $scope
	 * @return none
	 */
	// this.searchContact = function($scope) {
	// 	console.dir($scope.searchModel);
	// 	$http.post(baseurl + 'bam/search_contact.php', $scope.searchModel)

	// }

	this.search = function(model, type) {
		console.log(model);
		var suffix = '';
		switch (type) {
			case 'contact': suffix = 'bam/search_contact.php';
			break;

			case 'order': suffix = 'bam/search_order.php';
			break;

			default:
			break;
		}

		return $http.post(baseurl + suffix, model);
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
	 * New Ship
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newShip = function($scope) {
		var suffix = 'bam/ship_new';

		console.log($scope.model);
		$http.post(baseurl + suffix, $scope.model)
		.success(function(data, status) {
			return true;
		})
		.error(function(data, status) {
			console.log('new ship error status: ' + status);
			return false;
		})
	}
	/***************** 客服管理结束 ***********************/

}]);
