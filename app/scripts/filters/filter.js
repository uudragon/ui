'use strict';

angular.module('authApp')
.filter('gender', function () {
	return function (gender) {
		return gender == 1 ? "男" : "女"
	};
})
.filter('valid', function () {
	return function (valid) {
		return valid == 1 ? "有效" : "无效"
	};
})
