'use strict';
angular.module('mainApp').service('Auth', function($http, ipCookie, $location, PostService) {
	var accessPromise,
		currentUser;

	function updateUser(user) {
		ipCookie.remove('uuduser');
		ipCookie('uuduser', user);
		// ipCookie('uuduser', user, config.cookieOption);
	}

	function serialize(obj, prefix) {
		var str = [];
		for(var p in obj) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
		return str.join("&");
	}

	this.getCurrentUser = function() {
		if (!currentUser) {
			currentUser = ipCookie('uuduser').user;
		}

		return currentUser;
	}

	this.getToken = function() {
		return ipCookie('uuduser').token;
	}

	this.loadAccessLevels = function() {
		accessPromise = PostService.get(config.auth.baseurl + config.auth.resource)
	}

	this.getAccessLevels = function() {
		return accessPromise;
	}

	this.isLoggedIn = function(user) {
		var user = ipCookie('uuduser');

		if (user && user.token) {
			return true;
		}

		return false;
	}

	this.login = function(user, success, error) {

		$http.get(config.auth.baseurl + config.auth.login + '?' + serialize(user))
			.success(function(res) {
				// 登录成功
				if (res.legal) {
					success('0');
					updateUser(res);
					$location.path('/');
				} else {
					// 用户名或密码错误
					var errorCode = res.message.split(':')[0];
					success(errorCode);
				}
			})
	}

	this.logout = function(success, error) {
		ipCookie.remove('uuduser');
		$location.path('/login');
	}
});
