'use strict';

var baseurl = 'http://bam.uudragon.net/bam/';

var uud = angular.module('mainApp', [
	'ngCookies',
	'ngResource',
	'ui.router'
	])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	/**
	 * ============================================================================
	 * Important !!!!!!!!
	 *
	 * ============================================================================
	 */


	/////////////////////////////
	// Redirects and Otherwise //
	/////////////////////////////

	$urlRouterProvider

	// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
	// Here we are just setting up some convenience urls.
	.when('/customer', '/customer/traded')
	.when('/service', '/service/ordermanager')
	.when('/financial', '/financial/deposit')
	.when('/agents', '/agents/list')
	.when('/ship', '/ship/summary')

	// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
	.otherwise('/login');



	//////////////////////////
	// State Configurations //
	//////////////////////////

	$stateProvider

	.state('root', {
		url: "/",
		templateUrl: "views/template.html",
		controller: 'MainCtrl'
	})

	.state('login', {
		url: "/login",
		templateUrl: "views/login.html",
		controller: function($scope) {
			console.log('login');
		}
	})


	///////////////////
	// Customer Info //
	///////////////////

	.state('root.customer', {
		url: "customer",
		templateUrl: "views/customer/template.html",
		controller: 'CustomerCtrl'
	})
	.state('root.customer.new', {
		url: "/new",
		templateUrl: "views/customer/new.html",
		controller: 'CustomerManager'
	})
	.state('root.customer.traded', {
		url: "/traded",
		templateUrl: "views/customer/traded.html",
		controller: 'CustomerManager'
	})
	.state('root.customer.manager', {
		url: "/manager",
		templateUrl: "views/customer/manager.html",
		controller: 'CustomerManager'
	})


	//////////////////////
	// Customer Service //
	//////////////////////

	.state('root.service', {
		url: "service",
		templateUrl: "views/service/template.html",
		controller: 'ServiceCtrl'
	})
	.state('root.service.ordermanager', {
		url: "/ordermanager",
		templateUrl: "views/service/ordermanager.html",
		controller: 'ServiceManager'
	})
	.state('root.service.ordernew', {
		url: "/ordernew",
		templateUrl: "views/service/ordernew.html",
		controller: 'ServiceManager'
	})
	.state('root.service.employee', {
		url: "/employee",
		templateUrl: "views/service/employee.html",
		controller: 'ServiceManager'
	})
	.state('root.service.online', {
		url: "/online",
		templateUrl: "views/service/online.html",
		controller: 'ServiceManager'
	})
	.state('root.service.phone', {
		url: "/phone",
		templateUrl: "views/service/phone.html",
		controller: 'ServiceManager'
	})
	.state('root.service.data', {
		url: "/data",
		templateUrl: "views/service/data.html",
		controller: 'ServiceManager'
	})


	///////////////////////
	// Financial Manager //
	///////////////////////

	.state('root.financial', {
		url: "financial",
		templateUrl: "views/financial/template.html",
		controller: 'FinancialCtrl'
	})
	.state('root.financial.deposit', {
		url: "/deposit",
		templateUrl: "views/financial/deposit.html",
		controller: 'FinancialManager'
	})
	.state('root.financial.rebate', {
		url: "/rebate",
		templateUrl: "views/financial/rebate.html",
		controller: 'FinancialManager'
	})
	.state('root.financial.recorded', {
		url: "/recorded",
		templateUrl: "views/financial/recorded.html",
		controller: 'FinancialManager'
	})


	////////////////////
	// Agents Manager //
	////////////////////

	.state('root.agents', {
		url: "agents",
		templateUrl: "views/agents/template.html",
		controller: 'AgentsCtrl'
	})
	.state('root.agents.list', {
		url: "/list",
		templateUrl: "views/agents/list.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.rank', {
		url: "/rank",
		templateUrl: "views/agents/rank.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.locationpromo', {
		url: "/location-promo",
		templateUrl: "views/agents/locationpromo.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.selling', {
		url: "/selling",
		templateUrl: "views/agents/selling.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.entryexit', {
		url: "/entry-exit",
		templateUrl: "views/agents/entryexit.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.commissionmanager', {
		url: "/commissionmanager",
		templateUrl: "views/agents/commissionmanager.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.contractmanager', {
		url: "/contractmanager",
		templateUrl: "views/agents/contractmanager.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.financemanager', {
		url: "/financemanager",
		templateUrl: "views/agents/financemanager.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.promocode', {
		url: "/promocode",
		templateUrl: "views/agents/promocode.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.sales', {
		url: "/sales",
		templateUrl: "views/agents/sales.html",
		controller: 'AgentsManager'
	})
	.state('root.agents.assessment', {
		url: "/assessment",
		templateUrl: "views/agents/assessment.html",
		controller: 'AgentsManager'
	})


	//////////////////
	// Ship Manager //
	//////////////////

	.state('root.ship', {
		url: "ship",
		templateUrl: "views/ship/template.html",
		controller: 'ShipCtrl'
	})
	.state('root.ship.summary', {
		url: "/summary",
		templateUrl: "views/ship/summary.html",
		controller: 'ShipManager'
	})

}]);
