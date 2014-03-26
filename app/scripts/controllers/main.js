'use strict';

angular.module('mainApp')
.controller('SidebarCtrl', function ($rootScope, $route) {

	$rootScope.sideBarItems = [
		{name: '客户信息', url: 'customer_infomation'},
		{name: '客户管理', url: 'customer_management'},
		{name: '财务管理', url: 'financial_management'},
		{name: '代理商管理', url: 'agents_management'},
		{name: '发货管理', url: 'ship_management'},
		{name: '生产管理', url: 'production_management'},
		{name: '条法管理', url: 'management_of_law'},
	];
})
.controller('InfoCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(0);
	$scope.date = new Date()
})
.controller('CustomerCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(1);
	$scope.date = new Date()
})
.controller('FinancialCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(2);
	$scope.date = new Date()
})
.controller('AgentsCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(3);
	$scope.date = new Date()
})
.controller('ShipCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(4);
	$scope.date = new Date()
})
.controller('ProductionCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(5);
	$scope.date = new Date()
})
.controller('LawCtrl', function ($scope, sideBarService) {
	$scope.sideBarItems = sideBarService.highlight(6);
	$scope.date = new Date()
})

