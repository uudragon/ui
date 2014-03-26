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
		controller: 'MainCtrl'
	})
	.when('/customer_management', {
		templateUrl: 'views/customer_management.html',
		controller: 'CustomerManagerCtrl'
	})
	.when('/financial_management', {
		templateUrl: 'views/financial_management.html',
		controller: 'MainCtrl'
	})
	.when('/agents_management', {
		templateUrl: 'views/agents_management.html',
		controller: 'MainCtrl'
	})
	.when('/ship_management', {
		templateUrl: 'views/ship_management.html',
		controller: 'MainCtrl'
	})
	.when('/production_management', {
		templateUrl: 'views/production_management.html',
		controller: 'MainCtrl'
	})
	.when('/management_of_law', {
		templateUrl: 'views/management_of_law.html',
		controller: 'MainCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}).
run(function($rootScope) { // highlight for left side bar
	$rootScope.$on('$routeChangeSuccess', function(ev,data) {
		var active = false;
		for (var i in $rootScope.sideBarItems) {
			if (data.originalPath === '/' + $rootScope.sideBarItems[i].url) {
				$rootScope.sideBarItems[i].active = true;
				active = true;
			} else {
				$rootScope.sideBarItems[i].active = false;
			}
		}
		if (!active) $rootScope.sideBarItems[0].active = true
	})
});
