'use strict';

angular.module('mainApp')
.service('PostService', function ($http, ipCookie) {

	var setHeader = function(token) {
		var currentUser = ipCookie('uuduser');

		if (currentUser.token) {
			$http.defaults.headers.common['uu-token'] = currentUser.token;
		} else {
			delete $http.defaults.headers.common['uu-token'];
		}

	}

	var wrapHeader = function(model) {
		var currentUser = ipCookie('uuduser');

		var objToken = {
			token: currentUser.token
		}
		if (angular.isObject(model)) {
			return angular.extend(model, objToken)
		} else {
			return objToken
		}
	}

	this.post = function(url, model) {
		setHeader()
		return $http.post(url, wrapHeader(model));
	}

	this.get = function(url) {
		setHeader()
		return $http.get(url);
	}
});
