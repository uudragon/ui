'use strict';

angular.module('mainApp')
.filter('gender', function () {
	return function (gender) {
		return (gender == 1 || gender == 'male') ? '男' : '女';
	};
})
.filter('valid', function () {
	return function (valid) {
		return valid == 1 ? '有效' : '无效';
	};
})
.filter('cType', function () {
	return function (valid) {
		return valid >= 1 ? '已购买' : '潜在';
	};
})
.filter('age', function() {
	return function (birthday) {
		if (birthday) {
			var birthYear = parseInt(birthday.split('-')[0], 10);
			var currentYear = parseInt(new Date().getFullYear(), 10);
			return (currentYear - birthYear + 1) + ' 岁';
		}
	};
})
.filter('payStatus', function() {
	return function (num) {
		switch (num) {
			case '0':
				return '未付费';
			case '1':
				return '已付费';
			default:
				break;
		}
	};
})
.filter('checkStatus', function() {
	return function (num) {
		switch (num) {
			case '0':
				return '待审核';
			case '1':
				return '审核中';
			case '2':
				return '审核通过';
			case '3':
				return '无效';
			default:
				break;
		}
	};
})
.filter('week', function() {
	return function (num) {
		switch (num.toString()) {
			case '1':
				return '周一';
			case '2':
				return '周二';
			case '3':
				return '周三';
			case '4':
				return '周四';
			case '5':
				return '周五';
			case '6':
				return '周六';
			case '0':
				return '周日';
			default:
				break;
		}
	};
});
