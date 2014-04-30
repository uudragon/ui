'use strict';

angular.module('mainApp')
.filter('gender', function () {
	return function (gender) {
		return (gender == 1 || gender == 'male') ? "男" : "女";
	}
})
.filter('valid', function () {
	return function (valid) {
		return valid == 1 ? "有效" : "无效";
	}
})
.filter('cType', function () {
	return function (valid) {
		return valid >= 1 ? "已购买" : "潜在";
	}
})
.filter('age', function() {
	return function (birthday) {
		if (birthday) {
			var birthYear = parseInt(birthday.split('-')[0], 10);
			var currentYear = parseInt(new Date().getFullYear(), 10);
			return (currentYear - birthYear + 1) + " 岁";
		}
	}
})