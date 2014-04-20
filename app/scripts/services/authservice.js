'use strict';
angular.module('mainApp').factory('Auth', function($http, ipCookie, $location) {
	var accessLevels = config.accessLevels,
		userRoles = config.userRoles,
		currentUser = ipCookie('user') || {
			username: '',
			role: userRoles.public
		};
	// ipCookie.remove('user');

	function changeUser(user) {
		ipCookie.put('user')
		angular.extend(currentUser, user);
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
			if (user === undefined) {
				user = currentUser;
			}
			// console.log(currentUser);
			return ipCookie('uuduser') ? true : false;
			return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
		},
		register: function(user, success, error) {
			$http.post('/register', user).success(function(res) {
				changeUser(res);
				success();
			}).error(error);
		},
		login: function(user, success, error) {
			$http.post('/login?' + serialize(user)).success(function(user) {
				changeUser(user);
				success(user);
			}).error(error);

			// changeUser(user);
			var user = {
				name: 'adsfasdf',
				asdfa: 'asdfasdf',
				token: 'sajdfkajsdkfjaksdfjklasjdflkasjdf'
			}
			ipCookie('uuduser', user, {
				expires: 30,
				expirationUnit: 'minutes'
			});
			success(user);
			$location.path('/customer/traded');
		},
		logout: function(success, error) {
			$http.post('/logout?' + serialize(currentUser)).success(function() {
				changeUser({
					username: '',
					role: userRoles.public
				});
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
