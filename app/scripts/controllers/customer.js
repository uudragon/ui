'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', ['$scope', 'CustomerService', function ($scope, CustomerService) {
	
	$scope.newCustomer = function() {
		CustomerService.newCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('new customer error status:' + status);
			})
	}

	$scope.reloadSearch = function() {
		$scope.result = [];
		console.log('reload search');
		$scope.search();
	}


	$scope.search = function() {

		CustomerService.search($scope.searchModel)
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
	};


	$scope.loadCustomer = function() {
		CustomerService.loadCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('load customer error status:' + status);
				$scope.model = {
					number: 13123,
					type: '已付款'
				}
			})
	}

	// 获取预订总数和成交客户
	$scope.loadCustomerInfo = function() {
		CustomerService.loadCustomerInfo()
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

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.searchModel = {};

		if ( $scope.$state.includes('root.customer.traded') ) {
			$scope.loadCustomer();
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.loadCustomerInfo();
		}
		
		$controller('CustomerCtrl', {$scope: $scope});
	}])
