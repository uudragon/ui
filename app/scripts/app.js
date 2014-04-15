'use strict';

var uud = angular.module('mainApp', [
	'ngCookies',
	'ngResource',
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
		.when('/', 'root.login')
		.when('/login', 'root.login')
		.when('/info', 'root.info.traded')
		.when('/info/new', 'root.info.new')
		.when('/info/customer-manager', 'root.info.customermanager')
		.when('/info/contacts', 'root.info.contacts')
		.when('/info/traded', 'root.info.traded')

		// customer manager
		.when('/customer', 'root.customer.ordermanager')
		.when('/customer/ordernew', 'root.customer.ordernew')
		.when('/customer/ordermanager', 'root.customer.ordermanager')
		.when('/customer/employee', 'root.customer.employee')
		.when('/customer/online', 'root.customer.ol')
		.when('/customer/phone', 'root.customer.phone')
		.when('/customer/data', 'root.customer.data')

		// financial manager
		.when('/financial', 'root.financial.deposit')
		.when('/financial/deposit', 'root.financial.deposit')
		.when('/financial/rebate', 'root.financial.rebate')
		.when('/financial/recorded', 'root.financial.recorded')

		// agents manager
		.when('/agents', 'root.agents.list')
		.when('/agents/list', 'root.agents.list')
		.when('/agents/rank', 'root.agents.rank')
		.when('/agents/promo-code-record', 'root.agents.promocode')
		.when('/agents/sales-records', 'root.agents.sales')
		.when('/agents/entry-exit', 'root.agents.entryexit')
		.when('/agents/commissionmanager', 'root.agents.commissionmanager')
		.when('/agents/contractmanager', 'root.agents.contractmanager')
		.when('/agents/financemanager', 'root.agents.financemanager')
		.when('/agents/location-promo', 'root.agents.locationpromo')
		.when('/agents/selling', 'root.agents.selling')
		.when('/agents/assessment', 'root.agents.assessment')

		// ship manager
		.when('/ship', 'root.ship.summary')
		.when('/ship/summary', 'root.ship.summary')

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
			.segment('login', {
				templateUrl: 'views/login.html',
				controller: 'InfoCtrl'})
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
					controller: 'TradedCtrl'})
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
					templateUrl: 'views/customer/employee.html',
					controller: 'employeeManger'})
				.segment('ol', {
					templateUrl: 'views/customer/online.html',
					controller: 'employeeManger'})
				.segment('phone', {
					templateUrl: 'views/customer/phone.html'})
				.segment('data', {
					templateUrl: 'views/customer/data.html'})
			.up()

			.segment('financial', {
				templateUrl: 'views/template.html',
				controller: 'FinancialCtrl'})
			.within()
				.segment('deposit', {
					templateUrl: 'views/financial/deposit.html',
					controller: 'depositManage'})
				.segment('rebate', {
					templateUrl: 'views/financial/rebate.html',
					controller: 'rebateManage'})
				.segment('recorded', {
					templateUrl: 'views/financial/recorded.html',
					controller: 'recordedManage'})
			.up()

			.segment('agents', {
				templateUrl: 'views/template.html',
				controller: 'AgentsCtrl'})
			.within()
				.segment('list', {
					templateUrl: 'views/agents/list.html',
						controller: 'agentManage'})
				.segment('rank', {
					templateUrl: 'views/agents/rank.html',
						controller: 'agentRankManage'})
				.segment('promocode', {
					templateUrl: 'views/agents/promocode.html'})
				.segment('sales', {
					templateUrl: 'views/agents/sales.html'})
				.segment('entryexit', {
					templateUrl: 'views/agents/entryexit.html',
					controller: 'AgentsCtrl'})
				.segment('commissionmanager', {
					templateUrl: 'views/agents/commissionmanager.html'})
				.segment('contractmanager', {
					templateUrl: 'views/agents/contractmanager.html'})
				.segment('financemanager', {
					templateUrl: 'views/agents/financemanager.html'})
				.segment('locationpromo', {
					templateUrl: 'views/agents/locationpromo.html'})
				.segment('selling', {
					templateUrl: 'views/agents/selling.html'})
				.segment('assessment', {
					templateUrl: 'views/agents/assessment.html'})
			.up()

			.segment('ship', {
				templateUrl: 'views/template.html',
				controller: 'ShipCtrl'})
			.within()
				.segment('summary', {
					templateUrl: 'views/ship/summary.html',
					controller: 'ShipCtrl'})
			.up()
		.up()

	$routeProvider.otherwise({redirectTo: '/'});
})
.value('loader', {show: true});
