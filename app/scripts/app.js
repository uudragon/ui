'use strict';

angular.module('mainApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'route-segment',
	'view-segment'
	])
// .config(function ($routeProvider) {
// 	$routeProvider
// 	.when('/', {
// 		templateUrl: 'views/info/index.html',
// 		controller: 'InfoCtrl'
// 	})
// 	.when('/info/:sub?', {
// 		templateUrl: 'views/info/index.html',
// 		controller: 'InfoCtrl'
// 	})
// 	.when('/customer/:sub?', {
// 		templateUrl: 'views/customer/index.html',
// 		controller: 'CustomerCtrl'
// 	})
// 	.when('/customer/:sub/:sub2', {
// 		templateUrl: 'views/customer/index.html',
// 		controller: 'CustomerCtrl'
// 	})
// 	.when('/financial', {
// 		templateUrl: 'views/financial/index.html',
// 		controller: 'FinancialCtrl'
// 	})
// 	.when('/agents/:sub?', {
// 		templateUrl: 'views/agents/index.html',
// 		controller: 'AgentsCtrl'
// 	})
// 	.when('/ship', {
// 		templateUrl: 'views/ship/index.html',
// 		controller: 'ShipCtrl'
// 	})
// 	.when('/prod', {
// 		templateUrl: 'views/prod/index.html',
// 		controller: 'ProductionCtrl'
// 	})
// 	.when('/law', {
// 		templateUrl: 'views/law/index.html',
// 		controller: 'LawCtrl'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	});
// })
// config(function ($routeSegmentProvider) {
.config(function ($routeSegmentProvider) {

$routeSegmentProvider.
	when('/info/:sub', '$1.info')
	.segment('$1', {
		templateUrl: 'views/info/index.html',
		controller: 'InfoCtrl'
	})
	.within()
		.segment('home', {
			templateUrl: 'views/info/index.html'
		})
});
