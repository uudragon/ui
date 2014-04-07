'use strict';

angular.module('mainApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = true;
	})

})
	.controller('InfoCtrl', function ($scope, UUDBasicService) {
		$scope.summit = function() {
			UUDBasicService.newCustomer($scope);
		}
	})
		.controller('TradedCtrl', function ($scope, UUDBasicService) {
			UUDBasicService.loadCustomer($scope);
		})

	.controller('CustomerCtrl', function ($scope, UUDBasicService) {

		$scope.summit = function() {
			UUDBasicService.newOrder($scope);
		}

	})
		.controller('customerManger', function ($scope, UUDBasicService) {

			// 获取预订总数和成交客户
			UUDBasicService.queryContactInfo($scope);

			$scope.gender = [{label:'男', value: 'male'}, {label: '女', value: 'female'}];
			// 搜索
			$scope.search = function () {
				$scope.searchModel = $scope.searchModel || {};
				UUDBasicService.searchContact($scope)
			};
		})
		.controller('orderManger', function ($scope, UUDBasicService) {

			// 获取工单相关信息
			UUDBasicService.queryOrderInfo($scope);

			// 搜索
			$scope.search = function () {
				UUDBasicService.searchOrder($scope)
			};
		})
		.controller('employeeManger', function ($scope, UUDBasicService) {

			// 获取工单相关信息
			UUDBasicService.queryEmployeeInfo($scope);

			// 搜索
			$scope.search = function () {
				UUDBasicService.searchEmployee($scope)
			};
		})
	.controller('FinancialCtrl', function ($scope, UUDBasicService) {
		// 获取保证金相关信息
		UUDBasicService.querySalesInfo($scope);

	})
	.controller('depositManage', function ($scope, UUDBasicService) {
		// 查询保证金具体信息
		UUDBasicService.searchDeposit($scope);

	})
	.controller('rebateManage', function ($scope, UUDBasicService) {
		// 查询保证金具体信息
		UUDBasicService.searchRebate($scope);

	})
	.controller('recordedManage', function ($scope, UUDBasicService) {
		//查询入账总体信息
		UUDBasicService.searchOverallRecorded($scope);

		// 查询入账具体信息
		UUDBasicService.searchRecorded($scope);

	})
	//代理商管理
	.controller('AgentsCtrl', function ($scope) {
		$scope.submit = function () {

			console.log($scope.model);
		}
	})
	.controller('agentManage', function ($scope, UUDBasicService){
		UUDBasicService.searchOverallAgent($scope);

		UUDBasicService.searchAgent($scope);
	})
	.controller('ShipCtrl', function ($scope) {

	})
