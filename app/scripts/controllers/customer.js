'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', function ($scope, UUDCustomerService) {

	$scope.summit = function() {
		UUDCustomerService.newOrder($scope);
	}

})
	.controller('customerManger', function ($scope, UUDCustomerService) {

		// 获取预订总数和成交客户
		UUDCustomerService.queryContactInfo($scope);

		$scope.gender = [{label:'男', value: 'male'}, {label: '女', value: 'female'}];
		// 搜索
		$scope.search = function () {
			$scope.searchModel = $scope.searchModel || {};
			UUDCustomerService.searchContact($scope)
		};
	})
	.controller('orderManger', function ($scope, UUDCustomerService) {

		// 获取工单相关信息
		UUDCustomerService.queryOrderInfo($scope);

		// 搜索
		$scope.search = function () {
			UUDCustomerService.searchOrder($scope)
		};
	})
	.controller('employeeManger', function ($scope, UUDCustomerService) {

		// 获取工单相关信息
		UUDCustomerService.queryEmployeeInfo($scope);

		// 搜索
		$scope.search = function () {
			UUDCustomerService.searchEmployee($scope)
		};
	})
