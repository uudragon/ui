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
		/**/ receipt: {'-1': '撤销', 0: '未入库', 1: '部分入库', 2: '入库完成'},
		/**/ shipmentStatus: {'-1': '无效', 0: '待审核', 1: '待发货', 2: '备货中', 3: '发货中', 4: '已发货'},
		/**/ pickmentStatus: {0: '待拣货', 1: '拣货中', 2: '拣货完成'},
		/**/ warehouse: {1: '主库', 2: '备库'},
		/**/ putin: {1: '一般入库', 2: '退货入库', 3: '调货入库', 4: '调货出库(在途)', 5: '一般出库'},
		/**/ orderStatus: {1: '待审核', 2: '审核中', 3: '审核通过', 4: '无效'},
		/**/ workformStatus: {1: '未处理', 2: '处理中', 3: '关闭'},
		/**/ workformType: {2: '查询', 3: '投诉'},
		/**/ complaintStatus: {1: '待处理', 2: '处理中', 3: '已完成'},
		/**/ complaintType: {31: '发票抬头错误', 32: '未开发票', 33: '开票时间长', 34: '发票丢失', 35: '客服态度不好', 36: '客服不专业', 37: '客服电话难打', 38: '物流慢', 39: '货物丢失', 310: '物品破损', 311: '快递态度'},
		/**/ packageType: {1: '官网套餐', 2: '代理商套餐', 3: '首期套餐'},
		/**/ contractType: {0: '独家代理商', 1: '普通代理商'},
		/**/ yesno: {1: '是', 0: '否'},
		/*支付状态*/ payStatus: {0: '未付费', 1: '已付费'},
		/*订单类型*/ orderType: {0: '首期订单', 1: '促销品订单'},
		/*商品类型*/ goodType: {1: '教材', 2: '音像制品(DVD/CD)', 3: '玩具', 4: '宣传品', 5: '其它', 6: '赠品'},
		/*付款方式*/ payment: {1: '银行', 2: '支付宝', 3: '货到付款', 4: '快钱'},
		/*货品状态*/ goodsStatus: {'-1': '已退款', 0: '未付款', 1: '已付款', 2: '已审核', 3: '已发货', 4: '已完成'},
		/*一阶商品返利*/ rebateType: {1: '一阶商品'},

		// 财务管理
		/*返利状态*/ rebateStatus: {0: '无效', 1: '未申请', 2: '待审核', 3: '审核中', 4: '已审核'},
		/*申请状态*/ applyStatus: {0: '无效', 1: '未申请', 2: '待审核', 3: '审核中', 4: '已完成'},

		// shared
		/*省份数据*/ province: {1: '河北省', 2: '山西省', 3: '吉林省', 4: '辽宁省', 5: '黑龙江省', 6: '陕西省', 7: '甘肃省', 8: '青海省', 9: '山东省', 10: '福建省', 11: '浙江省', 12: '台湾省', 13: '河南省', 14: '湖北省', 15: '湖南省', 16: '江西省', 17: '江苏省', 18: '安徽省', 19: '广东省', 20: '海南省', 21: '四川省', 22: '贵州省', 23: '云南省', 24: '北京市', 25: '天津市', 26: '上海市', 27: '重庆市', 28: '内蒙古', 29: '新疆', 30: '宁夏', 31: '广西', 32: '西藏', 33: '香港', 34: '澳门'},

		province: {'河北省': '河北省', '山西省': '山西省', '吉林省': '吉林省', '辽宁省': '辽宁省', '黑龙江省': '黑龙江省', '陕西省': '陕西省', '甘肃省': '甘肃省', '青海省': '青海省', '山东省': '山东省', '福建省': '福建省', '浙江省': '浙江省', '台湾省': '台湾省', '河南省': '河南省', '湖北省': '湖北省', '湖南省': '湖南省', '江西省': '江西省', '江苏省': '江苏省', '安徽省': '安徽省', '广东省': '广东省', '海南省': '海南省', '四川省': '四川省', '贵州省': '贵州省', '云南省': '云南省', '北京市': '北京市', '天津市': '天津市', '上海市': '上海市', '重庆市': '重庆市', '内蒙古': '内蒙古', '新疆': '新疆', '宁夏': '宁夏', '广西': '广西', '西藏': '西藏', '香港': '香港', '澳门': '澳门'}
	};

})(typeof exports === 'undefined' ? window.config = {} : exports);
