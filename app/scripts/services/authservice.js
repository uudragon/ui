'use strict';
angular.module('mainApp').service('Auth', function($http, $location, ipCookie) {
	var _accessPromise, _user;

	var setUser = function (user) {
		ipCookie('user', user);
	}

	var setHeader = function (token) {
		if (token) {
			$http.defaults.headers.common['token'] = token;
		} else {
			delete $http.defaults.headers.common['token'];
		}
	}

	var setToken = function (token) {
		ipCookie('token', token);
	}

	var getToken = function() {
		return ipCookie('token');
	}

	this.getUser = function () {
		if (!_user) {
			_user = ipCookie('user');
		}
		return _user;
	}

	this.loadAccessLevels = function() {
		setHeader(getToken());
		_accessPromise = $http.get(config.auth.baseurl + config.auth.resource)
	}

	this.getAccessLevels = function() {
		return _accessPromise;
	}

	this.isLoggedIn = function() {
		if (getToken()) {
			return true;
		}
		return false;
	}

	this.login = function(res) {
		setUser(res.user);
		setToken(res.token);
		$location.path('/');
	}

	this.logout = function() {
		ipCookie.remove('user');
		ipCookie.remove('token');
		$location.path('/login');
	}
});
