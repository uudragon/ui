'use strict';

angular.module('mainApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
	])
.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/customer_infomation.html',
		controller: 'InfoCtrl'
	})
	.when('/customer_management', {
		templateUrl: 'views/customer_management.html',
		controller: 'CustomerCtrl'
	})
	.when('/financial_management', {
		templateUrl: 'views/financial_management.html',
		controller: 'FinancialCtrl'
	})
	.when('/agents_management', {
		templateUrl: 'views/agents_management.html',
		controller: 'AgentsCtrl'
	})
	.when('/ship_management', {
		templateUrl: 'views/ship_management.html',
		controller: 'ShipCtrl'
	})
	.when('/production_management', {
		templateUrl: 'views/production_management.html',
		controller: 'ProductionCtrl'
	})
	.when('/management_of_law', {
		templateUrl: 'views/management_of_law.html',
		controller: 'LawCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});
