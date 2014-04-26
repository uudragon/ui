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

		for (var i = accessLevels.length - 1; i >= 0; i--) {
			if (accessLevels[i].code == accessCode) {
				return true;
			}
		};
		return false;
	}

	this.loadAccessLevels = function() {
		PostService.get(config.auth.baseurl + config.auth.resource + '?token=' + this.getToken())
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
			// updateUser(user);
			// console.log('user is:');
			// console.log(user);
			// console.log('token is:');
			// console.log(user.token);
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

		var res = {
			token: 'myuudtoken-hahahhahhahah',
			user: {
				name: 'adsfasdf',
				phone: '123123',
				positions: 'admin',
				userNo: '09'
			}
		}
		updateUser(res);
		$location.path('/');
	}

	this.logout = function(success, error) {
/*			$http.get('/at/ws/auth/logout').success(function() {
			ipCookie.remove('uuduser');
			$location.path('/login');
			success();
		}).error(error);*/
		console.log('log out');
		ipCookie.remove('uuduser');
		$location.path('/login');
	}
});
