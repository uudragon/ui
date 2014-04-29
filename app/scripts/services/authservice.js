'use strict';
angular.module('mainApp').service('Auth', function($http, ipCookie, $location, PostService) {
	var accessLevels = [],
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

	this.authorize = function(accessCode) {
		if (typeof accessCode === 'undefined') {return true;}
		console.log(accessLevels);
		for (var i = accessLevels.length - 1; i >= 0; i--) {
			// console.log(accessLevels[i].code, accessCode);
			if (accessLevels[i].code == accessCode) {
				return true;
			}
		};
		return false;
	}

	this.loadAccessLevels = function() {
		PostService.get(config.auth.baseurl + config.auth.resource)
			.success(function(data) {
				accessLevels = data;
			})
	}

	this.getAccessLevels = function() {
		return accessLevels;
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
