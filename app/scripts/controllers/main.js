'use strict';

angular.module('mainApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		console.log('SegmentChange');
		loader.show = true;
	})
})
	.controller('InfoCtrl', function ($scope, UUDBasicService) {

		$scope.summit = function() {
			console.log($scope);
			UUDBasicService.newCustomer($scope);
		}
	})

	.controller('CustomerCtrl', function ($scope, UUDBasicService) {

		$scope.summit = function() {
			UUDBasicService.newOrder($scope);
		}

	})
		.controller('customerManger', function ($scope, UUDBasicService) {

			// 获取预订总数和成交客户
			UUDBasicService.queryCustomerInfo($scope);

			// 搜索
			$scope.search = function () {
				UUDBasicService.searchCustomer($scope)
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
