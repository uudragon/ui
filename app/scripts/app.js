'use strict';

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

		/**
		 * ============================================================================
		 * Important !!!!!!!!
		 *
		 * 路径不要有相同的名称, 比如root.ship.home, root.law.home, 包含相同名称'home',
		 * 这是非法的! 当使用相同名称时, template将不会自动切换！
		 * ( 应为 angular-route-segment 的一个bug )
		 * ============================================================================
		 */

		// customer info
		.when('/', 'root.info.traded')
		.when('/info', 'root.info.traded')
		.when('/info/new', 'root.info.new')
		.when('/info/customer-manager', 'root.info.customermanager')
		.when('/info/contacts', 'root.info.contacts')
		.when('/info/traded', 'root.info.traded')

		// customer manager
		.when('/customer', 'root.customer.ordernew')
		.when('/customer/ordernew', 'root.customer.ordernew')
		.when('/customer/ordermanager', 'root.customer.ordermanager')
		.when('/customer/employee', 'root.customer.employee')
		.when('/customer/online', 'root.customer.online')
		.when('/customer/phone', 'root.customer.phone')
		.when('/customer/data', 'root.customer.data')

		// financial manager
		.when('/financial', 'root.financial.display')
		.when('/financial/display', 'root.financial.display')

		// agents manager
		.when('/agents', 'root.agents.home')
		.when('/agents/home', 'root.agents.home')

		// ship manager
		.when('/ship', 'root.ship.home')
		.when('/ship/home', 'root.ship.home')

		// prod manager
		.when('/prod', 'root.prod.home')
		.when('/prod/home', 'root.prod.home')

		// law manager
		.when('/law', 'root.law.home')
		.when('/law/home', 'root.law.home')

		.segment('root', {
			templateUrl: 'views/root.html',
			controller: 'MainCtrl',
			// resolve: {
			// 	data: function($timeout, loader) {
			// 		loader.show = true;
			// 		return $timeout(function() { return 'SLOW DATA CONTENT'; }, 1000);
			// 	}
			// },
			resolveFailed: {
				templateUrl: 'views/partial/error.html',
				controller: 'ErrorCtrl'
			},
			untilResolved: {
				templateUrl: 'views/partial/loading.html'
			}
		})
		.within()
			.segment('info', {
				templateUrl: 'views/template.html',
				controller: 'InfoCtrl'})

			.within()
				.segment('new', {
					templateUrl: 'views/info/new.html',
					controller: 'InfoCtrl'})
				.segment('customermanager', {
					templateUrl: 'views/info/customer-manager.html',
					controller: 'customerManger'})
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
				.segment('ordernew', {
					templateUrl: 'views/customer/order.html',
					controller: 'CustomerCtrl'})
				.segment('ordermanager', {
					templateUrl: 'views/customer/ordermanager.html',
					controller: 'orderManger'})
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
				.segment('display', {
					templateUrl: 'views/financial/index.html',
					controller: 'FinancialCtrl'})
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
					templateUrl: 'views/prod/index.html'})
			.up()

			.segment('law', {
				templateUrl: 'views/template.html',
				controller: 'LawCtrl'})
			.within()
				.segment('home', {
					templateUrl: 'views/law/index.html'})
			.up()
		.up()

	$routeProvider.otherwise({redirectTo: '/'});
})
.value('loader', {show: true});


