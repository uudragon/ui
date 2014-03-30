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
.config(function($routeSegmentProvider, $routeProvider) {

	// Configuring provider options
	$routeSegmentProvider.options.autoLoadTemplates = true;

	// Setting routes. This consists of two parts:
	// 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
	// 2. traversing through segment tree to set it up

	$routeSegmentProvider

		// customer info
		.when('/', 'info.home')
		.when('/info', 'info.home')
		.when('/info/home', 'info.home')
		.when('/info/new', 'info.new')
		.when('/info/query', 'info.query')

		// customer manager
		.when('/customer', 'customer.home')
		.when('/customer/home', 'customer.home')
		.when('/customer/order-new', 'customer.ordernew')
		.when('/customer/order-manager', 'customer.ordermanager')
		.when('/customer/employee', 'customer.employee')
		.when('/customer/online', 'customer.online')
		.when('/customer/phone', 'customer.phone')
		.when('/customer/data', 'customer.data')

		// financial manager
		.when('/financial', 'financial.home')
		.when('/financial/home', 'financial.home')
		// agents manager
		.when('/agents', 'agents.home')
		.when('/agents/home', 'agents.home')
		// ship manager
		.when('/ship', 'ship.home')
		.when('/ship/home', 'ship.home')
		// prod manager
		.when('/prod', 'prod.home')
		.when('/prod/home', 'prod.home')
		// law manager
		.when('/law', 'law.home')
		.when('/law/home', 'law.home')

		.segment('info', {
			templateUrl: 'views/info/new.html',
			controller: 'InfoCtrl'})

		.within()
			.segment('home', {
				templateUrl: 'views/info/new.html'})
			.segment('new', {
				templateUrl: 'views/info/new.html'})
			.segment('query', {
				templateUrl: 'views/info/query.html'})
		.up()

		.segment('customer', {
			templateUrl: 'views/customer/order.html',
			controller: 'CustomerCtrl'})

		.within()
			.segment('home', {
				templateUrl: 'views/customer/order.html'})
			.segment('ordernew', {
				templateUrl: 'views/customer/ordernew.html'})
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
					templateUrl: 'views/financial/index.html'})
			.up()
		.segment('agents', {
			templateUrl: 'views/template.html',
			controller: 'AgentsCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/agents/index.html'})
			.up()
		.segment('ship', {
			templateUrl: 'views/template.html',
			controller: 'ShipCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/ship/index.html'})
			.up()
		.segment('prod', {
			templateUrl: 'views/template.html',
			controller: 'ProductionCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/production/index.html'})
			.up()
		.segment('law', {
			templateUrl: 'views/template.html',
			controller: 'LawCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/law/index.html'})
			.up()



	// This is some usage of `resolve`, `untilResolved` and `resolveFailed` features

	$routeSegmentProvider

		.when('/invalid-template', 's1.invalidTemplate')
		.when('/invalid-data', 's1.invalidData')
		.when('/slow-data', 's1.slowDataSimple')
		.when('/slow-data-loading', 's1.slowDataLoading')
		.when('/inline-view', 's1.inlineParent.inlineChildren')
		.when('/info/:id/slow',    's1.itemInfo.tabSlow')

		.within('s1')
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
			.segment('slowDataLoading', {
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
			.segment('inlineParent', {
				templateUrl: 'templates/section1/inline-view.html'
			})
			.within()
				.segment('inlineChildren', {
					// no template here
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


