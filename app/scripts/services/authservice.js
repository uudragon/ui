'use strict';
angular.module('mainApp').factory('Auth', function($http, ipCookie, $location, PostService) {
	var accessLevels = [];

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

	return {
		authorize: function(accessCode) {
			if (typeof accessCode === 'undefined') {return true;}

			for (var i = accessLevels.length - 1; i >= 0; i--) {
				if (accessLevels[i].code == accessCode) {
					return true;
				}
			};
			return false;
		},
		loadAccessLevels: function() {
			PostService.get(config.auth.baseurl + config.auth.resource)
				.success(function(data) {
					accessLevels = data;
				})
				.error(function() {
					accessLevels = [
						{code: '10'},
						{code: '4'},
						{code: '12'}
					]
				})
		},
		getAccessLevels: function() {
			return accessLevels;
		},
		isLoggedIn: function(user) {
			var user = ipCookie('uuduser');

			if (user && user.token) {
				// updateUser(user);
				console.log('user is:');
				console.log(user);
				console.log('token is:');
				console.log(user.token);
				return true;
			}

			return false;
		},

		login: function(user, success, error) {


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
					.error(function() {
						if (angular.isFunction(error)) {
							error();
						}
					});

			var user = {
				name: 'adsfasdf',
				asdfa: 'asdfasdf',
				token: 'myuudtoken-hahahhahhahah'
			}
			updateUser(user);
			$location.path('/');
		},
		logout: function(success, error) {
/*			$http.get('/at/ws/auth/logout').success(function() {
				ipCookie.remove('uuduser');
				$location.path('/login');
				success();
			}).error(error);*/
			console.log('log out');
			ipCookie.remove('uuduser');
			$location.path('/login');
		}
	};
});
