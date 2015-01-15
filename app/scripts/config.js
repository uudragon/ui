(function(exports){
	'use strict';

	// global variables
	exports.basews = '/atnew/ws/';
	exports.basewms = '/wms/';
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
		warehouse: {1: '主库', 2: '备库'},
		putin: {1: '一般入库', 2: '退货入库', 3: '调货入库', 4: '调货出库(在途)', 5: '一般出库'},
		orderStatus: {1: '待审核', 2: '审核中', 3: '审核通过', 4: '无效'}
	};

})(typeof exports === 'undefined' ? window.config = {} : exports);
