'use strict';

angular.module('authApp')

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

			// 搜索
			$scope.search = function () {
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
	.controller('FinancialCtrl', function ($scope) {

	})
	.controller('AgentsCtrl', function ($scope) {

	})
	.controller('ShipCtrl', function ($scope) {

	})
	.controller('ProductionCtrl', function ($scope) {

	})
	.controller('LawCtrl', function ($scope) {

	})
