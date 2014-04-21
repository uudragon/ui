'use strict';
angular.module('mainApp').factory('Auth', function($http, ipCookie, $location, PostService) {
	var accessLevels = config.accessLevels,
		userRoles = config.userRoles,
		currentUser = ipCookie('uuduser') || {username: '', role: userRoles.public };

	function changeUser(user) {
		ipCookie.remove('uuduser');
		ipCookie('uuduser', user, {expires: 30, expirationUnit: 'minutes'});
		// PostService.setHeader(user.token);
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
		authorize: function(accessLevel, role) {
			if (role === undefined) {
				role = currentUser.role;
			}
			return false;
			return accessLevel.bitMask & role.bitMask;
		},
		isLoggedIn: function(user) {
			return ipCookie('uuduser') && ipCookie('uuduser').token ? true : false;
		},
		login: function(user, success, error) {
			$http.post('/login?' + serialize(user)).success(function(user) {
				changeUser(user);
				success(user);
			}).error(error);

			var user = {
				name: 'adsfasdf',
				asdfa: 'asdfasdf',
				token: 'myuudtoken-hahahhahhahah'
			}
			changeUser(user);
			$location.path('/');
		},
		logout: function(success, error) {
			PostService.post('/logout').success(function() {
				ipCookie.remove('uuduser');
				$location.path('/login');
				success();
			}).error(error);

			ipCookie.remove('uuduser');
			$location.path('/login');
		},
		accessLevels: accessLevels,
		userRoles: userRoles,
		user: currentUser
	};
});
