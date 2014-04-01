'use strict';

var BASEURL = 'http://services.bam.uudragon.com/';

angular.module('mainApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'route-segment',
	'view-segment'
	])
.config(function($routeSegmentProvider, $routeProvider) {

	// Configuring provider options
	$routeSegmentProvider.options.autoLoadTemplates = true;

	// Setting routes. This consists of two parts:
	// 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
	// 2. traversing through segment tree to set it up

	$routeSegmentProvider

		// customer info
		.when('/', 'info.new')
		.when('/info', 'info.traded')
		.when('/info/new', 'info.new')
		.when('/info/customer-manager', 'info.customermanager')
		.when('/info/contacts', 'info.contacts')
		.when('/info/traded', 'info.traded')
		// .when('/info/query', 'info.query')

		// customer manager
		.when('/customer', 'customer.ordernew')
		.when('/customer/ordernew', 'customer.ordernew')
		.when('/customer/ordermanager', 'customer.ordermanager')
		.when('/customer/employee', 'customer.employee')
		.when('/customer/online', 'customer.online')
		.when('/customer/phone', 'customer.phone')
		.when('/customer/data', 'customer.data')

		// financial manager
		.when('/financial', 'financial')
		.when('/financial/home', 'financial.home')
		// agents manager
		.when('/agents', 'agents')
		.when('/agents/home', 'agents.home')
		// ship manager
		.when('/ship', 'ship')
		.when('/ship/home', 'ship.home')
		// prod manager
		.when('/prod', 'prod')
		.when('/prod/home', 'prod.home')
		// law manager
		.when('/law', 'law')
		.when('/law/home', 'law.home')

		.segment('info', {
			templateUrl: 'views/template.html',
			controller: 'InfoCtrl'})

		.within()
			.segment('new', {
				templateUrl: 'views/info/new.html',
				controller: 'InfoCtrl'})
			.segment('customermanager', {
				templateUrl: 'views/info/customer-manager.html',
				controller: 'InfoCtrl'})
			.segment('contacts', {
				templateUrl: 'views/info/contacts.html',
				controller: 'InfoCtrl'})
			.segment('traded', {
				templateUrl: 'views/info/traded.html',
				controller: 'InfoCtrl'})
		.up()

		.segment('customer', {
			templateUrl: 'views/template.html',
			controller: 'CustomerCtrl'})

		.within()
			.segment('home', {
				templateUrl: 'views/customer/order.html',
				controller: 'CustomerCtrl'})
			.segment('ordernew', {
				templateUrl: 'views/customer/order.html',
				controller: 'CustomerCtrl'})
			.segment('ordermanager', {
				templateUrl: 'views/customer/ordermanager.html'})
			.segment('employee', {
			   templateUrl: 'views/customer/employee.html'})
			.segment('online', {
			   templateUrl: 'views/customer/online.html'})
			.segment('phone', {
			   templateUrl: 'views/customer/phone.html'})
			.segment('data', {
			   templateUrl: 'views/customer/data.html'})
		.up()

		.segment('financial', {
			templateUrl: 'views/template.html',
			controller: 'FinancialCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/financial/xxx.html'})
			.up()
		.segment('agents', {
			templateUrl: 'views/template.html',
			controller: 'AgentsCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/agents/xxx.html'})
			.up()
		.segment('ship', {
			templateUrl: 'views/template.html',
			controller: 'ShipCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/ship/xxx.html'})
			.up()
		.segment('prod', {
			templateUrl: 'views/template.html',
			controller: 'ProductionCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/prod/xxx.html'})
			.up()
		.segment('law', {
			templateUrl: 'views/template.html',
			controller: 'LawCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/law/xxx.html'})
			.up()


	// This is some usage of `resolve`, `untilResolved` and `resolveFailed` features

	$routeSegmentProvider

		.when('/invalid-template', 's1.invalidTemplate')
		.when('/invalid-data', 's1.invalidData')
		.when('/slow-data', 's1.slowDataSimple')
		.when('/slow-data-loading', 's1.slowDataLoading')
		.when('/inline-view', 's1.inlineParent.inlineChildren')
		.when('/info/customer-manager',    'info.customermanager')
		.when('/info/traded',    'info.traded')

		.within('info')
			.segment('invalidTemplate', {
				templateUrl: 'this-does-not-exist.html',    // 404
				resolveFailed: {
					templateUrl: 'templates/error.html',
					controller: 'ErrorCtrl'
				}
			})
			.segment('invalidData', {
				templateUrl: 'templates/section1/home.html',     // Correct!
				resolve: {
					data: function($q) {
						return $q.reject('ERROR DESCRIPTION');     // Failed to load data
					}
				},
				resolveFailed: {
					templateUrl: 'templates/error.html',
					controller: 'ErrorCtrl'
				}
			})
			.segment('slowDataSimple', {
				templateUrl: 'templates/section1/slow-data.html',
				controller: 'SlowDataCtrl',
				resolve: {
					data: function($timeout, loader) {
						loader.show = true;
						return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
					}
				}
			})
			.segment('customermanager', {
				templateUrl: 'views/info/customer-manager.html',
				controller: 'customerManger',
				resolve: {}
			})
			.within()
				.segment('inlineChildren', {
					// no template here
					controller: 'InfoCtrl',
					resolve: {
						data: function($timeout) {
							return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
						}
					},
					untilResolved: {
						templateUrl: 'templates/loading.html'
					}
				})
				.up()

			.within('itemInfo')
				.segment('tabSlow', {
					templateUrl: 'templates/section1/slow-data.html',
					controller: 'SlowDataCtrl',
					resolve: {
						data: function($timeout) {
							return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
						}
					},
					untilResolved: {
						templateUrl: 'templates/loading.html'
					}
				})


	$routeProvider.otherwise({redirectTo: '/'});
})
.value('loader', {show: true});


