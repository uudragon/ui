'use strict';

angular.module('authApp')
.filter('gender', function () {
	return function (gender) {
		return gender == 1 ? "男" : "女";
	}
})
.filter('valid', function () {
	return function (valid) {
		return valid == 1 ? "有效" : "无效";
	}
})
.filter('filterRole', function () {
	return function (roles, userRoles) {

		if (!roles) return;
		var result = [];

		for (var i = 0; i < roles.length; i++) {
			var selected = false;
			for (var j in userRoles) {
				if (roles[i].id === userRoles[j].id) {
					selected = true;
				}
			}
			if (!selected) {
				result.push(roles[i]);
			}
		}
		return result;
	}
})
