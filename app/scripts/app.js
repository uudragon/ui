'use strict';

var uud = angular.module('authApp', [
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
		.when('/', 'root.home')
		.when('/login', 'root.login')
		.when('/user', 'root.user')
		.when('/user-group', 'root.ugroup')
		.when('/role', 'root.role')
		.when('/role-group', 'root.rgroup')
		.when('/privilege', 'root.privilege')

		.segment('root', {
			templateUrl: 'views/template.html',
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
			.segment('home', {
				templateUrl: 'views/home.html'})

			.segment('login', {
				templateUrl: 'views/home.html',
				controller: 'LoginCtrl'})

			.segment('user', {
				templateUrl: 'views/user.html',
				controller: 'UserCtrl'})

			.segment('ugroup', {
				templateUrl: 'views/ugroup.html',
				controller: 'UgroupCtrl'})

			.segment('role', {
				templateUrl: 'views/role.html',
				controller: 'RoleCtrl'})

			.segment('rgroup', {
				templateUrl: 'views/rgroup.html',
				controller: 'RgroupCtrl'})

			.segment('privilege', {
				templateUrl: 'views/privilege.html',
				controller: 'PrivilegeCtrl'})
		.up()

	$routeProvider.otherwise({redirectTo: '/'});
})
.value('loader', {show: true});
