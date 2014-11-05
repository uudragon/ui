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
.filter('now', ['dateFilter', function (dateFilter) {
	return function () {
		var date = new Date();
		return dateFilter(date, 'yyyy-MM-dd HH:mm');
	};
}])
.filter('timeFormat', ['dateFilter', function (dateFilter) {
	return function (datetime) {
		var date = new Date(datetime);
		return dateFilter(date, 'yyyy-MM-dd HH:mm');
	};
}])
.filter('age', function() {
	return function (birthday) {
		if (birthday) {
			var birthYear = parseInt(birthday.split('-')[0], 10);
			var currentYear = parseInt(new Date().getFullYear(), 10);
			return (currentYear - birthYear + 1) + ' 岁';
		}
	};
})
.filter('orderType', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 0:
				return '单品订单';
			case 1:
				return '多品订单';
			default:
				break;
		}
	};
})
.filter('complainType', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 1:
				return '咨询';
			case 2:
				return '查询';
			case 3:
				return '投诉';
			case 4:
				return '建议';
			default:
				break;
		}
	};
})
.filter('payStatus', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 0:
				return '未付费';
			case 1:
				return '已付费';
			default:
				break;
		}
	};
})
// 付款方式
.filter('payment', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 0:
				return '银行';
			case 1:
				return '支付宝';
			case 1:
				return '货到付款';
			default:
				break;
		}
	};
})
.filter('auditStatus', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 1:
				return '待审核';
			case 2:
				return '审核中';
			case 3:
				return '无效';
			case 4:
				return '审核通过';
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
