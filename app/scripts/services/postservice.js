'use strict';

angular.module('mainApp')
.service('PostService', function ($http, ipCookie) {

	this.setHeader = function(token) {
		if (token) {
			$http.defaults.headers.common['uu-token'] = token;
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

	this.post = function(url, model, success, error) {
		return $http.post(url, model).success(success).error(error);
	}
});
