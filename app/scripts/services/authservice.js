'use strict';
angular.module('mainApp').factory('Auth', function($http, ipCookie, $location, PostService) {
	var accessLevels = [];

	function updateUser(user) {
		ipCookie.remove('uuduser');
		ipCookie('uuduser', user);
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
			PostService.get('loadAccessLevels')
				.success(function(data) {
					accessLevels = data;
				})
				.error(function() {
					accessLevels = [
						{code: '1'},
						{code: '4'},
						{code: '12'},
						{code: Math.floor(Math.random() * 100)},
					]
				})
		},
		getAccessLevels: function() {
			return accessLevels;
		},
		isLoggedIn: function(user) {
			return ipCookie('uuduser') && ipCookie('uuduser').token ? true : false;
		},
		login: function(user, success, error) {

			$http.get('/login?' + serialize(user))
				.success(function(user) {
					updateUser(user);
				
					if (angular.isFunction(success)) {
						success(user);
					
					}

					$location.path('/');
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
			$http.get('/logout').success(function() {
				ipCookie.remove('uuduser');
				$location.path('/login');
				success();
			}).error(error);

			ipCookie.remove('uuduser');
			$location.path('/login');
		}
	};
});
