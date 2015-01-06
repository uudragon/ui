'use strict';

angular.module('mainApp')
.filter('gender', function () {
	return function (gender) {
		return (gender == 1 || gender == 'male') ? '男' : '女';
	};
})
.filter('yesno', function() {
	return function (valid) {
		return valid == 1 ? '是' : '否';
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
.filter('typeMap', function() {
	return function(numKey, map) {
		if (!map) return '';
		var numnumKey = parseInt(numKey, 10);
		var value = map[numKey];
		return value ?  value : '';
	};
})
.filter('mapper', ['typeMapFilter', function(typeMapFilter) {
	return function(num, map) {
		return typeMapFilter(num, config.typeMap[map]);
	}
}])
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
.filter('goodsType', function() {
	return function (num) {
		switch (parseInt(num, 10)) {
			case 1:
				return '教材';
			case 2:
				return '音像制品(DVD/CD)';
			case 3:
				return '玩具';
			case 4:
				return '其它';
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
.filter('orderStatus', function() {
	return function (num) {
		switch (parseInt(num, 10)) {
			case 1:
				return '正常';
			case 2:
				return '取消';
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
.filter('customerStatus', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 1:
				return '潜在客户';
			case 2:
				return '普通客户';
			default:
				break;
		}
	};
})

// 商品入库
.filter('storageType', function() {
	return function (num) {

		switch (parseInt(num, 10)) {
			case 1:
				return '一般入库';
			case 2:
				return '退货入库';
			case 3:
				return '调货入库';
			case 4:
				return '调货出库(在途)';
			case 5:
				return '一般出库';
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
