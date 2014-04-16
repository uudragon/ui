'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', ['$scope', 'CustomerService', function ($scope, CustomerService) {
	$scope.summit = function() {
		CustomerService.newCustomer($scope.model)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				console.log('new customer error status:' + status);
			})
	}
	$scope.newOrder = function() {
		CustomerService.newOrder($scope.model)
		.success(function(data, status) {
			console.log('ok');
		})
		.error(function(data, status) {
			console.log('new order error status: ' + status);
		})
	}
}])
	.controller('TradedCtrl', ['$scope', 'CustomerService', '$controller', function ($scope, CustomerService, $controller) {

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

		$controller('CustomerCtrl', {$scope: $scope})
	}])
	.controller('customerManger', ['$scope', 'CSService', function ($scope, CSService) {

			// 获取预订总数和成交客户
			CSService.queryContactInfo()
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

			// 搜索
			$scope.searchModel = {};
			$scope.search = function () {

				CSService.search($scope.searchModel, 'contact')
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
		}])
