(function(exports){
	'use strict';

	// global variables
	exports.basews = '/atnew/ws/';
	exports.basewms = '/wms/';
	exports.agent = '/service/agencybusiness/';
	exports.perPage = 12;
	exports.maxPages = 6;

	exports.auth = {
		baseurl: '/atnew/ws/auth/',
		resource: 'resourceListByCode',
		timeout: 'checkTimeOut',
		login: 'login',
		logout: 'logout'
	};

	// cookie options
	exports.cookieOption = {
		expires: 1,
		expirationUnit: 'minutes'
	};

	exports.workDays = 6;

	//	Helper functions
	exports.errorLog = function(action, type, callback) {
		return function(data, status) {
			console.log(action + ' ' + type + ' error, status: ' + status);
			if (angular.isFunction(callback)) {
				callback();
			}
		};
	};

	exports.typeMap = {
		receipt: {'-1': '撤销', 0: '未入库', 1: '部分入库', 2: '入库完成'},
		shipmentStatus: {'-1': '无效', 0: '待审核', 1: '待发货', 2: '备货中', 3: '发货中', 4: '已发货'},
		pickmentStatus: {0: '待拣货', 1: '拣货中', 2: '拣货完成'},
		warehouse: {1: '主库', 2: '备库'},
		putin: {1: '一般入库', 2: '退货入库', 3: '调货入库', 4: '调货出库(在途)', 5: '一般出库'},
		orderStatus: {1: '待审核', 2: '审核中', 3: '审核通过', 4: '无效'},
		workformStatus: {1: '未处理', 2: '处理中', 3: '关闭'},
		workformType: {2: '查询', 3: '投诉'},
		complaintStatus: {1: '待处理', 2: '处理中', 3: '已完成'},
		complaintType: {31: '发票抬头错误', 32: '未开发票', 33: '开票时间长', 34: '发票丢失', 35: '客服态度不好', 36: '客服不专业', 37: '客服电话难打', 38: '物流慢', 39: '货物丢失', 310: '物品破损', 311: '快递态度'},
		contractType: {0: '独家代理商', 1: '普通代理商'}
	};

})(typeof exports === 'undefined' ? window.config = {} : exports);
