'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', ['$scope', 'CustomerService', function ($scope, CustomerService) {
	
	$scope.loadInfo = function(type) {

		CustomerService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(config.errorLog('load', type))
	}

	$scope.reloadSearch = function(type) {
		$scope.result = [];
		$scope.search(type);
	}

	// 搜索
	$scope.search = function (type) {

		CustomerService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search contact error status: ' + status + ' use dummy data');

				switch (type) {
					// 获取预订总数和成交客户
					case 'customer':
						$scope.result = {number: 13123, type: '已付款'}
						break;
					
					case 'contact':
						// dummy data
						$scope.result = [
							{code: 1, name: 'test1', type: 2, gender: 'male', email: 'testemail@email.com'},
							{code: 4, name: 'test2', type: 6, gender: 'female', email: 'testemdail@email.com'},
							{code: 14, name: 'test3', type: 34, gender: 'male', email: 'test3@email.com'},
							{code: 43, name: 'test4', type: 6, gender: 'female', email: 'test4@email.com'},
						]
						break;


					default: break;
				}

				$scope.pages = 10;
			})
	}

	$scope.newCustomer = function() {
		CustomerService.newCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('new customer error status:' + status);
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
			$scope.search('tradedCustomer');
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.loadInfo('customer_statistics');
		}

		$controller('CustomerCtrl', {$scope: $scope});

	}])
