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
	.controller('InfoCtrl', function ($scope, UUDInfoService) {
		$scope.summit = function() {
			UUDInfoService.newCustomer($scope);
		}
	})
		.controller('TradedCtrl', function ($scope, UUDInfoService) {
			UUDInfoService.loadCustomer($scope);
		})

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
	.controller('FinancialCtrl', function ($scope, UUDFinancialService) {
		// 获取保证金相关信息
		UUDFinancialService.querySalesInfo($scope);

	})
	.controller('depositManage', function ($scope, UUDFinancialService) {
		// 查询保证金具体信息
		UUDFinancialService.searchDeposit($scope);

	})
	.controller('rebateManage', function ($scope, UUDFinancialService) {
		// 查询保证金具体信息
		UUDFinancialService.searchRebate($scope);

	})
	.controller('recordedManage', function ($scope, UUDFinancialService) {
		//查询入账总体信息
		UUDFinancialService.searchOverallRecorded($scope);

		// 查询入账具体信息
		UUDFinancialService.searchRecorded($scope);

	})
	//代理商管理
	.controller('AgentsCtrl', function ($scope) {
		$scope.submit = function () {

			console.log($scope.model);
		}
	})
	.controller('agentManage', function ($scope, UUDAgentsService){
		UUDAgentsService.searchOverallAgent($scope);

		UUDAgentsService.searchAgent($scope);
	})
	.controller('agentRankManage', function ($scope, UUDAgentsService){

		UUDAgentsService.searchAgentRank($scope);
	})
	.controller('ShipCtrl', function ($scope, UUDShipService) {

			var fakeData = {
				'ORDERS_NO': 'OD_1001',
				'SHIPMENT_NO': 'FH1001',
				'EXPRESS_CODE': 'aaaa',
				'EXPRESS_ORDERS_NO': 'bbbbbb',
				'CREATER': 'jack'
			}

		console.log($scope.model);

		$scope.newShip = function() {
			$.extend($scope.model, fakeData);
			UUDShipService.newShip($scope);
		}
	})

