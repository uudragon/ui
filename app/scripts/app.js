'use strict';

var uud = angular.module('authApp', [
	'ivpusic.cookie',
	'ui.router',
	'angular-md5',
	'ngAnimate'
	])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {


	$httpProvider.defaults.headers.common['Requested-By'] = 'uu-dragon-app';

	// 拦截器
	$httpProvider.interceptors.push(function($q, $location, $rootScope, $injector) {
		return {
			'response': function(resp) {
				if (resp && resp.errorCode) {
					$rootScope.$broadcast('auth:invalid', res);
					return $q.reject(res);
				}
				return resp;
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


	/////////////////////////////
	// Redirects and Otherwise //
	/////////////////////////////

	$urlRouterProvider

	// The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
	// Here we are just setting up some convenience urls.
	.when('/', '/home')

	// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
	.otherwise('/');

	// 拦截器
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			'responseError': function(response) {
				if(response.status === 401 || response.status === 403) {
					$location.path('/login');
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
		url: "/",
		templateUrl: "views/template.html",
		controller: 'MainCtrl'
	})

	.state('login', {
		url: "/login",
		templateUrl: "views/login.html",
		controller: 'LoginCtrl'
	})


	////////////////
	// Sub States //
	////////////////

	.state('root.home', {
		url: "home",
		templateUrl: "views/home.html"
	})
	.state('root.user', {
		url: "user",
		templateUrl: "views/user/index.html",
		controller: 'UserCtrl'
	})
	.state('root.ugroup', {
		url: "user-group",
		templateUrl: "views/ugroup/index.html",
		controller: 'UgroupCtrl'
	})
	.state('root.role', {
		url: "role",
		templateUrl: "views/role/index.html",
		controller: 'RoleCtrl'
	})
	.state('root.rgroup', {
		url: "role-group",
		templateUrl: "views/rgroup/index.html",
		controller: 'RgroupCtrl'
	})
	.state('root.privilege', {
		url: "privilege",
		templateUrl: "views/privilege/index.html",
		controller: 'PrivilegeCtrl'
	})
}])

.run(['$rootScope', '$state', 'Auth', '$location', function ($rootScope, $state, Auth, $location) {

	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

		if (!Auth.isLoggedIn()) {
			$location.path('/login');
		}
	});

}]);
