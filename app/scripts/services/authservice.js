'use strict';

angular.module('mainApp')
.service('Auth', ['$http', '$location', 'ipCookie', function($http, $location, ipCookie) {

	var _accessPromise, _user;
	var self = this;

	var setUser = function (user) {
		ipCookie('user', user);
	};

	var setToken = function (token) {
		ipCookie('token', token);
		self.setHeader(token);
	};

	var setResource = function(resource) {
		ipCookie('resource', resource);
	};

	var getToken = function() {
		return ipCookie('token');
	};

	this.setHeader = function (token) {
		$http.defaults.headers.common.token = token || ipCookie.token;
	};

	this.getUser = function () {
		if (!_user) {
			_user = ipCookie('user');
		}
		return _user;
	};

	this.getResource = function() {
		return ipCookie('resource') ? ipCookie('resource').split(',') : [];
	};

	this.loadAccessLevels = function() {
		_accessPromise = $http.get(config.auth.baseurl + config.auth.resource);
	};

	this.checkTimeout = function() {
		$http.get(config.auth.baseurl + config.auth.timeout, {
			params: {token: getToken()}
		})
		.success(function(status) {
			(!status || status === 'false') && (self.logout());
		})
		.error(function() {
			self.logout();
		});
	};

	this.getAccessLevels = function() {
		return _accessPromise;
	};

	this.isLoggedIn = function() {
		if (getToken()) {
			return true;
		}
		return false;
	};

	this.login = function(res) {
		setUser(res.user);
		setToken(res.token);
		setResource(res.resources);
		$location.path('/');
	};

	this.logout = function() {
		ipCookie.remove('user');
		ipCookie.remove('token');
		ipCookie.remove('resource');
		$location.path('/' + config.auth.login);
	};
}]);
