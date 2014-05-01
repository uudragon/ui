'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', ['$scope', 'CustomerService', function ($scope, CustomerService) {
	
	// init
	$scope.searchModel = {
		pagination: {
			perPage: config.perPage,
			toPage: 1
		}
	}

	$scope.page = 1;

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
		console.log($scope.searchModel);
		CustomerService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(config.errorLog('search', type))
	}

	$scope.newCustomer = function(form) {
		$scope.submitted = true;
		if (!form.$valid) return;
		CustomerService.newCustomer($scope.model)
			.success(function(data, status) {
				if (data.success) {
					// 成功保存
					$scope.model = {};
					form.$setPristine();
					$scope.submitted = false;
				} else {
					// 保存失败
				}
			})
			.error(config.errorLog('new', 'customer'))
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
