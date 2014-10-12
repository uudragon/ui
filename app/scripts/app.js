'use strict';

var uud = angular.module('mainApp', [
	'ivpusic.cookie',
	'restangular',
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
	$httpProvider.interceptors.push(['$q', '$location', '$rootScope', '$injector', '$timeout', function($q, $location, $rootScope, $injector, $timeout) {
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
		}]);

	//////////////////////////
	// State Configurations //
	//////////////////////////

	$stateProvider

	.state('root', {
		url: '/',
		templateUrl: 'views/layout.html',
		controller: 'MainCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'AuthCtrl'
	})

	.state('root.home', {
		url: 'home',
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})


	//////////////////////
	// Customer Service //
	//////////////////////

	.state('root.customer', {
		url: 'customer',
		templateUrl: 'views/customer/layout.html',
		controller: 'CustomerServiceCtrl'
	})
	.state('root.customer.checkorder', {
		url: '/checkorder',
		templateUrl: 'views/customer/checkorder.html',
		controller: 'CheckOrder'
	})
	.state('root.customer.splitorder', {
		url: '/splitorder',
		templateUrl: 'views/customer/splitorder.html',
		controller: 'SplitOrder'
	})
	.state('root.customer.complaints', {
		url: '/complaints',
		templateUrl: 'views/customer/complaints.html',
		controller: 'Complains'
	})
	.state('root.customer.customers', {
		url: '/customer-pool',
		templateUrl: 'views/customer/customerpool.html',
		controller: 'CustomerPool'
	})

	///////////
	// Utils //
	///////////

	.state('root.utils', {
		url: 'utils',
		templateUrl: 'views/utils/layout.html',
		controller: 'UtilsCtrl'
	})
	.state('root.utils.neworder', {
		url: '/neworder',
		templateUrl: 'views/utils/neworder.html',
		controller: 'NewOrder'
	})
	.state('root.utils.search', {
		url: '/search',
		templateUrl: 'views/utils/search.html',
		controller: 'Search'
	})
	.state('root.utils.message', {
		url: '/notes',
		templateUrl: 'views/utils/notes.html',
		controller: 'Notes'
	})
	.state('root.utils.batchmsg', {
		url: '/batchmsg',
		templateUrl: 'views/utils/batchmsg.html',
		controller: 'Batchmsg'
	})


	//////////////////////
	// Customer Manager //
	//////////////////////

	.state('root.customerManager', {
		url: 'customer-manager',
		templateUrl: 'views/customer-manager/layout.html',
		controller: 'CustomerManagerCtrl'
	})
	.state('root.customerManager.employee', {
		url: '/employee',
		templateUrl: 'views/customer-manager/employee.html',
		controller: 'Employee'
	})
	.state('root.customerManager.online', {
		url: '/online',
		templateUrl: 'views/customer-manager/online.html',
		controller: 'Online'
	})
	.state('root.customerManager.phone', {
		url: '/phone',
		templateUrl: 'views/customer-manager/phone.html',
		controller: 'Phone'
	})
	.state('root.customerManager.info', {
		url: '/info',
		templateUrl: 'views/customer-manager/info.html',
		controller: 'Info'
	})


	////////////////////
	// Agents Manager //
	////////////////////

	.state('root.data', {
		url: 'data',
		templateUrl: 'views/data/layout.html',
		controller: 'DataCtrl'
	})
	.state('root.data.ordermanager', {
		url: '/ordermanager',
		templateUrl: 'views/data/ordermanager.html',
		controller: 'OrderManager'
	})
	.state('root.data.work', {
		url: '/work',
		templateUrl: 'views/data/work.html',
		controller: 'Work'
	})
	.state('root.data.inventory', {
		url: '/inventory',
		templateUrl: 'views/data/inventory.html',
		controller: 'Inventory'
	})
	.state('root.data.statistics', {
		url: '/statistics',
		templateUrl: 'views/data/statistics.html',
		controller: 'Statistics'
	})


	//////////////////
	// Ship Manager //
	//////////////////

	.state('root.knowledge', {
		url: 'knowledge',
		templateUrl: 'views/knowledge/layout.html',
		controller: 'KnowledgeCtrl'
	})
	.state('root.knowledge.presale', {
		url: '/presale',
		templateUrl: 'views/knowledge/presale.html',
		controller: 'Presale'
	})
	.state('root.knowledge.aftersale', {
		url: '/aftersale',
		templateUrl: 'views/knowledge/aftersale.html',
		controller: 'Aftersale'
	})
	.state('root.knowledge.qa', {
		url: '/qa',
		templateUrl: 'views/knowledge/qa.html',
		controller: 'QA'
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

