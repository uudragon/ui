'use strict';

var uud = angular.module('mainApp', [
	'ivpusic.cookie',
	'ngResource',
	'ui.router',
	'angular-md5'
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {


	/////////////////////////////
	// Redirects and Otherwise //
	/////////////////////////////

	$urlRouterProvider

	// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
	// Here we are just setting up some convenience urls.
	.when('/', '/home')
	.when('/customer', '/customer/checkorder')
	.when('/service', '/service/ordermanager')
	.when('/financial', '/financial/deposit')
	.when('/agents', '/agents/list')
	.when('/ship', '/ship/summary')

	.otherwise('/');

	$httpProvider.defaults.headers.common['Requested-By'] = 'uu-dragon-app';

	// 拦截器
	$httpProvider.interceptors.push(function($q, $location, $rootScope, $injector, $timeout) {
		return {
			'request': function(config) {
				return config;
			},
			'response': function(resp) {
				// try {
				// 	var errorCode = resp.data.split(':')[0];
				// 	if (errorCode == 'E_00201') {
				// 		$rootScope.$broadcast('auth:invalid', res);
				// 		return $q.reject(res);
				// 	}
				// } catch(e) {}

				// token过期信息
				if (resp.config.url === (config.auth.baseurl + config.auth.resource) && resp.status === 204) {
					$timeout(function(){
						$rootScope.$broadcast('auth:invalid', resp);
					}, 100);
					return $q.reject(resp);
				} else {
					return resp;
				}

			},
			'responseError': function(response) {

				if(response.status === 401 || response.status === 403) {
					// token is outdate or request for resource beyond the privilege of current user.
					$rootScope.$broadcast('auth:invalid', response);
				}
				return $q.reject(response);
			}
		};
	});

	//////////////////////////
	// State Configurations //
	//////////////////////////

	$stateProvider

	.state('root', {
		url: '/',
		templateUrl: 'views/template.html',
		controller: 'MainCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'AuthCtrl'
	})

	.state('root.home', {
		url: 'home',
		templateUrl: 'views/home.html'
	})


	//////////////////////
	// Customer Service //
	//////////////////////

	.state('root.customer', {
		url: 'customer',
		templateUrl: 'views/customer/template.html',
		controller: 'CustomerCtrl'
	})
	.state('root.customer.splitorder', {
		url: '/splitorder',
		templateUrl: 'views/customer/splitorder.html',
		controller: 'CustomerManager'
	})
	.state('root.customer.checkorder', {
		url: '/checkorder',
		templateUrl: 'views/customer/checkorder.html',
		controller: 'CustomerManager'
	})
	.state('root.customer.complaints', {
		url: '/complaints',
		templateUrl: 'views/customer/complaints.html',
		controller: 'CustomerManager'
	})


	//////////////////////
	// Customer Manager //
	//////////////////////

	.state('root.service', {
		url: 'service',
		templateUrl: 'views/service/template.html',
		controller: 'ServiceCtrl'
	})
	.state('root.service.ordermanager', {
		url: '/ordermanager',
		templateUrl: 'views/service/ordermanager.html',
		controller: 'ServiceManager'
	})
	.state('root.service.getorder', {
		url: '/getorder',
		templateUrl: 'views/service/getorder.html',
		controller: 'ServiceManager'
	})
	.state('root.service.employee', {
		url: '/employee',
		templateUrl: 'views/service/employee.html',
		controller: 'EmployeeManager'
	})
	.state('root.service.online', {
		url: '/online',
		templateUrl: 'views/service/online.html',
		controller: 'ServiceManager'
	})
	.state('root.service.phone', {
		url: '/phone',
		templateUrl: 'views/service/phone.html',
		controller: 'ServiceManager'
	})
	.state('root.service.data', {
		url: '/data',
		templateUrl: 'views/service/data.html',
		controller: 'ServiceManager'
	})


	///////////////////////
	// Financial Manager //
	///////////////////////

	.state('root.financial', {
		url: 'financial',
		templateUrl: 'views/financial/template.html',
		controller: 'FinancialCtrl'
	})
	.state('root.financial.deposit', {
		url: '/deposit',
		templateUrl: 'views/financial/deposit.html',
		controller: 'FinancialManager'
	})
	.state('root.financial.rebate', {
		url: '/rebate',
		templateUrl: 'views/financial/rebate.html',
		controller: 'FinancialManager'
	})
	.state('root.financial.recorded', {
		url: '/recorded',
		templateUrl: 'views/financial/recorded.html',
		controller: 'FinancialManager'
	})


	////////////////////
	// Agents Manager //
	////////////////////

	.state('root.agents', {
		url: 'agents',
		templateUrl: 'views/agents/template.html',
		controller: 'AgentsCtrl',
		accessCode: '04'
	})
	.state('root.agents.list', {
		url: '/list',
		templateUrl: 'views/agents/list.html',
		controller: 'AgentsManager',
		access: 'admin'
	})
	.state('root.agents.rank', {
		url: '/rank',
		templateUrl: 'views/agents/rank.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.locationpromo', {
		url: '/location-promo',
		templateUrl: 'views/agents/locationpromo.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.selling', {
		url: '/selling',
		templateUrl: 'views/agents/selling.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.entryexit', {
		url: '/entry-exit',
		templateUrl: 'views/agents/entryexit.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.commissionmanager', {
		url: '/commissionmanager',
		templateUrl: 'views/agents/commissionmanager.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.contractmanager', {
		url: '/contractmanager',
		templateUrl: 'views/agents/contractmanager.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.financemanager', {
		url: '/financemanager',
		templateUrl: 'views/agents/financemanager.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.promocode', {
		url: '/promocode',
		templateUrl: 'views/agents/promocode.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.sales', {
		url: '/sales',
		templateUrl: 'views/agents/sales.html',
		controller: 'AgentsManager'
	})
	.state('root.agents.assessment', {
		url: '/assessment',
		templateUrl: 'views/agents/assessment.html',
		controller: 'AgentsManager'
	})


	//////////////////
	// Ship Manager //
	//////////////////

	.state('root.ship', {
		url: 'ship',
		templateUrl: 'views/ship/template.html',
		controller: 'ShipCtrl'
	})
	.state('root.ship.summary', {
		url: '/summary',
		templateUrl: 'views/ship/summary.html',
		controller: 'ShipManager'
	});

}])

.run(['$rootScope', '$state', 'Auth', '$location', '$q', function ($rootScope, $state, Auth, $location, $q) {

	Auth.setHeader();

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

		if (!Auth.isLoggedIn()) {
			// $location.path('/' + config.auth.login);
		} else {
			Auth.loadAccessLevels();
		}
	});
}]);

