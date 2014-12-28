'use strict';

angular.module('mainApp')
.controller('CustomerServiceCtrl', ['$scope', '$controller',function ($scope, $controller) {

	// init
	$scope.searchModel = {
		pagination: {
			perPage: config.perPage,
			toPage: 1
		}
	};

	$scope.page = 1;
	$scope.objType = 'customer';

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerServiceManager', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

		$scope.searchModel = {};

		if ( $scope.$state.includes('root.customer.traded') ) {
			$scope.search('tradedCustomer');
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.load('customer_statistics');
		}

		// fake date
		// $scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', orderType: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.tmp = {
			orderSN: '123071231',
			name: '李四民',
			products: '季度',
			payDate: '2014-10-15',
			payWay: '在线支付',
			payStatus: '已支付',
			birthday: '2010-06-01',
			orderStatus: '正常'};

		$scope.getOrderBySN = function(orderSN) {
			for (var i = 0; i < $scope.orders.length; i++) {
				if ($scope.orders[i] && $scope.orders[i].orderSN === orderSN) {
					return $scope.orders[i];
				}
			}
			return {};
		};

		$scope.addContact = function() {
			$scope.order = $scope.order || {};
			$scope.order.contactTime = $filter('now')();
			$('#contact-history').modal('show');
		};

		$controller('CustomerServiceCtrl', {$scope: $scope});

	}])
	.controller('CheckOrder', ['$scope', '$controller', 'Order', '$http', function($scope, $controller, Order, $http) {
		$scope.provinces = [{name:'北京市', city: [{name:'北京市'}]}, {name:'天津市', city: [{name:'天津市'}]}, {name:'上海市', city: [{name:'上海市'}]}, {name:'重庆市', city: [{name:'重庆市'}]}, {name: '河北省', city: [{name: '石家庄市'}, {name: '唐山市'}, {name: '秦皇岛市'}, {name: '邯郸市'}, {name: '邢台市'}, {name: '保定市'}, {name: '张家口市'}, {name: '承德市'}, {name: '沧州市'}, {name: '廊坊市'}, {name: '衡水市'}]}, {name: '山西省', city: [{name: '太原市'}, {name: '大同市'}, {name: '阳泉市'}, {name: '长治市'}, {name: '晋城市'}, {name: '朔州市'}, {name: '忻州市'}, {name: '吕梁市'}, {name: '晋中市'}, {name: '临汾市'}, {name: '运城市'}, {name: '内蒙古'}, {name: '呼和浩特市'}, {name: '包头市'}, {name: '乌海市'}, {name: '赤峰市'}, {name: '呼伦贝尔市'}, {name: '兴安盟'}, {name: '通辽市'}, {name: '锡林郭勒盟'}, {name: '乌兰察布市'}, {name: '鄂尔多斯市 '}, {name: '巴彦淖尔盟'}, {name: '阿拉善盟'}]}, {name: '辽宁省', city: [{name: '沈阳市'}, {name: '大连市'}, {name: '鞍山市'}, {name: '抚顺市'}, {name: '本溪市'}, {name: '丹东市'}, {name: '锦州市'}, {name: '营口市'}, {name: '阜新市'}, {name: '辽阳市'}, {name: '盘锦市'}, {name: '铁岭市'}, {name: '朝阳市'}, {name: '葫芦岛市'}]}, {name: '吉林省', city: [{name: '长春市'}, {name: '吉林市'}, {name: '四平市'}, {name: '辽源市'}, {name: '通化市'}, {name: '白山市'}, {name: '松原市'}, {name: '白城市'}, {name: '延边朝鲜族自治州'}]}, {name: '黑龙江省', city: [{name: '哈尔滨市'}, {name: '齐齐哈尔市'}, {name: '鸡西市'}, {name: '鹤岗市'}, {name: '双鸭山市'}, {name: '大庆市'}, {name: '伊春市'}, {name: '佳木斯市'}, {name: '七台河市'}, {name: '牡丹江市'}, {name: '黑河市'}, {name: '绥化市'}, {name: '大兴安岭地区'}]}, {name: '江苏省', city: [{name: '南京市'}, {name: '无锡市'}, {name: '徐州市'}, {name: '常州市'}, {name: '苏州市'}, {name: '南通市'}, {name: '连云港市'}, {name: '淮安市'}, {name: '盐城市'}, {name: '扬州市'}, {name: '镇江市'}, {name: '泰州市'}, {name: '宿迁市'}]}, {name: '浙江省', city: [{name: '杭州市'}, {name: '宁波市'}, {name: '温州市'}, {name: '嘉兴市'}, {name: '湖州市'}, {name: '绍兴市'}, {name: '金华市'}, {name: '衢州市'}, {name: '舟山市'}, {name: '台州市'}, {name: '丽水市'}]}, {name: '安徽省', city: [{name: '合肥市'}, {name: '芜湖市'}, {name: '蚌埠市'}, {name: '淮南市'}, {name: '马鞍山市'}, {name: '淮北市'}, {name: '铜陵市'}, {name: '安庆市'}, {name: '黄山市'}, {name: '滁州市'}, {name: '阜阳市'}, {name: '宿州市'}, {name: '六安市'}, {name: '宣城市'}, {name: '毫州市'}, {name: '池州市'}]}, {name: '福建省', city: [{name: '福州市'}, {name: '厦门市'}, {name: '宁德市'}, {name: '莆田市'}, {name: '泉州市'}, {name: '漳州市'}, {name: '龙岩市'}, {name: '三明市'}, {name: '南平市'}]}, {name: '江西省', city: [{name: '南昌市'}, {name: '景德镇市'}, {name: '萍乡市'}, {name: '九江市'}, {name: '新余市'}, {name: '鹰潭市'}, {name: '赣州市'}, {name: '宜春市'}, {name: '上饶市'}, {name: '吉安市'}, {name: '抚州市'}]}, {name: '山东省', city: [{name: '济南市'}, {name: '青岛市'}, {name: '淄博市'}, {name: '枣庄市'}, {name: '东营市'}, {name: '烟台市'}, {name: '潍坊市'}, {name: '济宁市'}, {name: '泰安市'}, {name: '威海市'}, {name: '日照市'}, {name: '莱芜市'}, {name: '临沂市'}, {name: '德州市'}, {name: '聊城市'}, {name: '滨州市'}, {name: '菏泽市'}]}, {name: '河南省', city: [{name: '郑州市'}, {name: '开封市'}, {name: '洛阳市'}, {name: '平顶山市'}, {name: '安阳市'}, {name: '鹤壁市'}, {name: '新乡市'}, {name: '焦作市'}, {name: '濮阳市'}, {name: '许昌市'}, {name: '漯河市'}, {name: '三门峡市'}, {name: '南阳市'}, {name: '商丘市'}, {name: '信阳市'}, {name: '周口市'}, {name: '驻马店地区'}, {name: '济源市'}]}, {name: '湖北省', city: [{name: '武汉市'}, {name: '黄石市'}, {name: '十堰市'}, {name: '宜昌市'}, {name: '襄阳市'}, {name: '鄂州市'}, {name: '荆门市'}, {name: '孝感市'}, {name: '荆州市'}, {name: '黄冈市'}, {name: '咸宁市'}, {name: '随州市'}, {name: '恩施土家族苗族自治州'}, {name: '仙桃市'}, {name: '潜江市'}, {name: '天门市'}, {name: '神农架林区'}]}, {name: '湖南省', city: [{name: '长沙市'}, {name: '株洲市'}, {name: '湘潭市'}, {name: '衡阳市'}, {name: '邵阳市'}, {name: '岳阳市'}, {name: '常德市'}, {name: '张家界市'}, {name: '益阳市'}, {name: '郴州市'}, {name: '永州市'}, {name: '怀化市'}, {name: '娄底地区'}, {name: '湘西土家族苗族自治州'}]}, {name: '广东省', city: [{name: '广州市'}, {name: '韶关市'}, {name: '深圳市'}, {name: '珠海市'}, {name: '汕头市'}, {name: '佛山市'}, {name: '江门市'}, {name: '湛江市'}, {name: '茂名市'}, {name: '肇庆市'}, {name: '惠州市'}, {name: '梅州市'}, {name: '汕尾市'}, {name: '河源市'}, {name: '阳江市'}, {name: '清远市'}, {name: '东莞市'}, {name: '中山市'}, {name: '潮州市'}, {name: '揭阳市'}, {name: '云浮市'}]}, {name: '广西壮族自治区', city: [{name: '南宁市'}, {name: '柳州市'}, {name: '桂林市'}, {name: '梧州市'}, {name: '北海市'}, {name: '防城港市'}, {name: '钦州市'}, {name: '贵港市'}, {name: '玉林市'}, {name: '崇左市'}, {name: '来宾市'}, {name: '贺州市'}, {name: '百色市'}, {name: '河池市'}]}, {name: '海南省', city: [{name: '省直辖县'}, {name: '海口市'}, {name: '三亚市'}]}, {name: '四川省', city: [{name: '成都市'}, {name: '自贡市'}, {name: '攀枝花市'}, {name: '泸州市'}, {name: '德阳市'}, {name: '绵阳市'}, {name: '广元市'}, {name: '遂宁市'}, {name: '内江市'}, {name: '乐山市'}, {name: '南充市'}, {name: '宜宾市'}, {name: '广安市'}, {name: '达州市'}, {name: '雅安市'}, {name: '阿坝藏族羌族自治州'}, {name: '甘孜藏族自治州'}, {name: '凉山彝族自治州'}, {name: '巴中市'}, {name: '眉山市'}, {name: '资阳市'}, {name: '贵州'}, {name: '贵阳市'}, {name: '六盘水市'}, {name: '遵义市'}, {name: '铜仁市'}, {name: '黔西南布依族苗族自治州'}, {name: '毕节地区'}, {name: '安顺市'}, {name: '黔东南苗族侗族自治州'}, {name: '黔南布依族苗族自治州'}]}, {name: '云南省', city: [{name: '昆明市'}, {name: '曲靖市'}, {name: '玉溪市'}, {name: '昭通市'}, {name: '楚雄彝族自治州'}, {name: '红河哈尼族彝族自治州'}, {name: '文山壮族苗族自治州'}, {name: '普洱市'}, {name: '西双版纳傣族自治州'}, {name: '大理白族自治州'}, {name: '保山市'}, {name: '德宏傣族景颇族自治州'}, {name: '丽江市'}, {name: '怒江傈僳族自治州'}, {name: '迪庆藏族自治州'}, {name: '临沧市'}]}, {name: '西藏', city: [{name: '拉萨市'}, {name: '昌都地区'}, {name: '山南地区'}, {name: '日喀则地区'}, {name: '那曲地区'}, {name: '阿里地区'}, {name: '林芝地区'}]}, {name: '陕西省', city: [{name: '西安市'}, {name: '铜川市'}, {name: '宝鸡市'}, {name: '咸阳市'}, {name: '渭南市'}, {name: '延安市'}, {name: '汉中市'}, {name: '安康市'}, {name: '商洛市'}, {name: '榆林市'}]}, {name: '甘肃省', city: [{name: '兰州市'}, {name: '嘉峪关市'}, {name: '金昌市'}, {name: '白银市'}, {name: '天水市'}, {name: '酒泉市'}, {name: '张掖市'}, {name: '武威市'}, {name: '定西市'}, {name: '陇南市'}, {name: '平凉市'}, {name: '庆阳市'}, {name: '临夏自治州'}, {name: '甘南藏族自治州'}]}, {name: '青海省', city: [{name: '西宁市'}, {name: '海东地区'}, {name: '海北藏族自治州'}, {name: '黄南藏族自治州'}, {name: '海南藏族自治州'}, {name: '果洛藏族自治州'}, {name: '玉树藏族自治州'}, {name: '海西蒙古族藏族自治州'}]}, {name: '宁夏回族自治区', city: [{name: '银川市'}, {name: '石嘴山市'}, {name: '吴忠市'}, {name: '固原市'}, {name: '中卫市'}]}, {name: '新疆维吾尔自治区', city: [{name: '乌鲁木齐市'}, {name: '克拉玛依市'}, {name: '吐鲁番地区'}, {name: '哈密地区'}, {name: '昌吉自治州'}, {name: '博尔塔拉蒙古自治州'}, {name: '巴音郭楞蒙古自治州'}, {name: '阿克苏地区'}, {name: '克孜勒苏柯尔克孜自治州'}, {name: '喀什地区'}, {name: '和田地区'}, {name: '伊犁哈萨克自治州'}, {name: '塔城地区'}, {name: '阿勒泰地区'}, {name: '直辖县'}]}, {name: '台湾省', city: [{name: '台北市'}, {name: '高雄市'}, {name: '基隆市'}, {name: '台中市'}, {name: '台南市'}, {name: '新竹市'}, {name: '嘉义市'}, {name: '直辖县'}]}, {name: '香港特别行政区', city: [{name: '香港岛'}, {name: '九龙'}, {name: '新界'}]}, {name: '澳门特别行政区', city: [{name: '澳门半岛'}, {name: '澳门离岛'}, {name: '路氹城'}]}];

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 2, input: true},
			{name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 4, subfilters: [{name: '已付款', value: 1}, {name: '未付款', value: 2}]},
			{name: '支付方式', value: 5, subfilters: [{name: '货到付款', value: 1}, {name: '在线付款', value: 2}]},
			{name: '审单状态', value: 6, subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 7, datetime: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]},
			{name: '退换货单号', value: 12, input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'order_no', label: '订单编号', isChecked: true},
			{name: 'phone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true, sortable: true},
			{name: 'paid', label: '付款状态', isChecked: true, sortable: true},
			{name: 'audit', label: '审单状态', isChecked: true, filters: ['待审核', '审核中', '审核通过', '无效']},
			{name: 'create_time', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contact_count', label: '联系次数', isChecked: true}
		];

		// 获取订单列表
		$scope.getOrderList = function() {
			$scope.orders = Order.getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo,
				workflow: 1,
				paid: $scope.searchModel.paid
			}).$object;
		};

		// 所有, 已付费, 未付费快速查询按钮
		$scope.$watch('searchModel.paid', function(current, prev) {
			if (current !== prev) {
				$scope.searchModel.pageNo = 1;
				$scope.getOrderList();
			}
		});

		// 查看订单
		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		};

		// 修改订单状态
		$scope.editOrderStatus = function(currentOrder) {
			currentOrder.auditStatus = currentOrder.audit;
			$scope.currentOrder = currentOrder;
			$('#edit-order-status').modal('show');
		};

		// 保存订单状态
		$scope.updateOrderStatus = function(currentOrder) {
			// currentOrder.one('audit', {audit: currentOrder.auditStatus}).put().then(function() {
			// 	$('#edit-order-status').modal('hide');
			// });
			$http.put(config.baseurl + 'order/' + currentOrder.id + '/audit', {
				audit: currentOrder.auditStatus
			}).success(function(d) {
				currentOrder.audit = currentOrder.auditStatus;
				$('#edit-order-status').modal('hide');
			});
		};

		// 共享订单
		$scope.shareOrder = function(currentOrder) {
			$scope.currentOrder = currentOrder;
			$('#share-order').modal('show');
		};

		// 共享订单 - 发送请求
		$scope.saveSharedOrder = function(currentOrder) {
			$http.put(config.baseurl + 'order/' + currentOrder.id + '/workflow', {
				workflow: currentOrder.workflow
			}).success(function(d) {
				$('#share-order').modal('hide');
			});
		};

		// 修改客户信息
		$scope.editCustomerInfo = function() {
			$scope.isCustometInfoEditable = true;
		};

		// 保存客户信息
		$scope.saveCustomerInfo = function(currentOrder) {
			currentOrder.put().then(function() {
				$scope.isCustometInfoEditable = false;
			});
		};

		// 首次加载定单列表
		$scope.getOrderList();

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('SplitOrder', ['$scope', '$controller', 'Order', function($scope, $controller, Order) {

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'order_no', label: '订单编号', isChecked: true},
			{name: 'phone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true, sortable: true},
			{name: 'paid', label: '付款状态', isChecked: true, sortable: true},
			{name: 'audit', label: '审单状态', isChecked: true, filters: ['待审核', '审核中', '审核通过', '无效']},
			{name: 'create_time', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contact_count', label: '联系次数', isChecked: true}
		];

		// 修改订单列表
		$scope.getOrderList = function() {
			$scope.orders = Order.getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo,
				workflow: 2,
				paid: $scope.searchModel.paid
			}).$object;
		};

		$scope.getOrderList();

		$scope.showSplitModal = function(order) {
			$scope.currentOrder = order;
			$('#split-modal').modal('show');
		};

		$scope.saveSplitResult = function() {
			$('#split-modal').modal('hide');
		};

		$scope.splitOrder = function(order) {
			order.isSplited = true;
			order.splitedOrders = [
				{orderSN: '123071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		};


		$scope.selectGift = function() {
			$('#select-gift').modal('show');
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('Complains', ['$scope', '$controller', '$http', '$filter', 'Restangular', function($scope, $controller, $http, $filter, Restangular) {
		var $returnOrder = $('#return-order');
		var $tree = $('#tree');

		// 搜索下拉
		$scope.filters = [
			{name: '所有投诉', value: 0, input: true},
			{name: '投诉日期', value: 8, datetime: true},
			{name: '客户姓名', value: 5, input: true},
			{name: '联系电话', value: 1, input: true},
			{name: '订单编号', value: 2, input: true},
			{name: '省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 2, input: true},
			{name: '投诉分类', value: 1, subfilters: [{name: '发票抬头错误', value: 31}, {name: '未开发票', value: 32}, {name: '开票时间长', value: 33}, {name: '发票丢失', value: 34}, {name: '客服态度不好', value: 35}, {name: '客服不专业', value: 36}, {name: '客服电话难打', value: 37}, {name: '物流慢', value: 38}, {name: '货物丢失', value: 39}, {name: '物品破损', value: 310}, {name: '快递态度', value: 311}]},
            {name: '紧急程度', value: 1, subfilters: [{name: '一般', value: 1 }, {name: '优先', value: 2 }, {name: '紧急', value: 3 }]},
			{name: '待处理', value: 9},
			{name: '处理中', value: 10},
			{name: '已完成', value: 11},
		];

		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'odrer_no', label: '订单编号', isChecked: true},
			{name: 'phone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true, sortable: true},
			{name: 'paid', label: '付款状态', isChecked: true, sortable: true},
			{name: 'create_time', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contact_times', label: '联系次数', isChecked: true}
		];

		var Workform = Restangular.all('workform');

		// 获取投诉列表
		$scope.getOrderList = function() {
			$scope.complaintsOrders = Workform.all('consulation').getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo,
				status: $scope.searchModel.status
			}).$object;
		};

		// 状态快速查询按钮
		$scope.$watch('searchModel.status', function(current, prev) {
			if (current !== prev) {
				$scope.searchModel.pageNo = 1;
				$scope.getOrderList();
			}
		});

		$scope.getOrderList();

		// 订单详情
		$scope.showComplaintOrders = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
			$scope.currentOrder.complaintOrders = [
				{orderSN: '123071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '0', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', customerName: order.customerName, customerPhone: order.customerPhone, orderType: '季度', createTime: '2014-10-15', payWay: '在线支付', payStatus: '1', birthday: '2010-06-01', orderStatus: '正常'}
			];
		};

		// 新建投诉
		$scope.addNewComplains = function() {
			$scope.complaint = {
				// contact_time: $filter('now')(),
				type: 3,
				theme: 2,
				user: $scope.currentUser.userNo
			};
			$('#complaint-details').modal('show');
		};

		// 保存投诉
		$scope.saveComplaint = function(complaint) {
			$http.post(config.baseurl + 'workform', complaint)
				.success(function(status) {
					status === 'true' && $('#complaint-details').modal('hide');
				});
		};

		// 退换货
		$scope.exchange = function() {
			$returnOrder.modal('show');
		};

		// 退换货
		$scope.return = function() {
			$returnOrder.modal('show');
		};

		$scope.saveOrder = function(order) {
			var
				tree = $tree.fancytree('getTree'),
				selectedNodes = tree.getSelectedNodes();

			console.log(selectedNodes);
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('Return', ['$scope', '$controller', function($scope, $controller) {

		var $tree = $('#tree');

		// ths
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'customerName', label: '退货单号', isChecked: true},
			{name: 'orderSN', label: '客户姓名', isChecked: true},
			{name: 'customerPhone', label: '联系方式', isChecked: false},
			{name: 'customerPhone', label: '家庭住址', isChecked: true},
			{name: 'province', label: '订单编号', isChecked: false, sortable: true},
			{name: 'city', label: '订购类型', isChecked: true},
			{name: 'email', label: '退货原因', isChecked: true},
			{name: 'payStatus', label: '退货日期', isChecked: false, sortable: true},
			{name: 'createTime', label: '退货刊号', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '退货金额', isChecked: true},
			{name: 'contactTimes', label: '到库状态', isChecked: true},
			{name: 'contactTimes', label: '退货结果', isChecked: true},
			{name: 'contactTimes', label: '退货类别', isChecked: true},
		];

		// 新建退货单
		$scope.addNewReturnOrder = function() {
			$('#form-return').modal('show');
		};

		$scope.confirmAndShare =function() {
			$('#share-order').modal('show');

			var treeSourece = [
				{
					'title': '财务部', 'key': '1', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '库房部', 'key': '2', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '投诉组', 'key': '3', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				}
			];
			$tree.fancytree({
				source: treeSourece,
				selectMode: 3,
				clickFolderMode: 2,
				icons: false,
				checkbox: true
			});
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('Exchange', ['$scope', '$controller', function($scope, $controller) {

		var $tree = $('#tree');

		// 搜索下拉
		$scope.filters = [{name: '所有换货', value: 0}, {name: '当日换货', value: 1}, {name: '申请中', value: 1}, {name: '当日换货', value: 1}, {name: '发货中', value: 1}, {name: '未调换', value: 1}, {name: '已调换', value: 1} ];
		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		// ths
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'customerName', label: '调货单号', isChecked: true},
			{name: 'orderSN', label: '客户姓名', isChecked: true},
			{name: 'customerPhone', label: '联系方式', isChecked: false},
			{name: 'customerPhone', label: '家庭住址', isChecked: true},
			{name: 'province', label: '订单编号', isChecked: false, sortable: true},
			{name: 'city', label: '订购类型', isChecked: true},
			{name: 'city', label: '调换类型', isChecked: true},
			{name: 'city', label: '调换科目', isChecked: true},
			{name: 'email', label: '调换刊号', isChecked: true},
			{name: 'email', label: '调换数量', isChecked: true},
			{name: 'contactTimes', label: '到库状态', isChecked: true},
			{name: 'contactTimes', label: '发货状态', isChecked: true},
			{name: 'contactTimes', label: '调换进度', isChecked: true},
			{name: 'contactTimes', label: '调换结果', isChecked: true}
		];

		$scope.addNewExchangeOrder = function() {
			$('#form-exchange').modal('show');
		};

		$scope.confirmAndShare =function() {
			$('#share-order').modal('show');

			var treeSourece = [
				{
					'title': '财务部', 'key': '1', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '库房部', 'key': '2', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				},
				{
					'title': '投诉组', 'key': '3', 'fold': true, 'children': [
						{'title': 'test1', 'key': '3'},
						{'title': 'test2', 'key': '4'}
					]
				}
			];
			$tree.fancytree({
				source: treeSourece,
				selectMode: 3,
				clickFolderMode: 2,
				icons: false,
				checkbox: true
			});
		};

		$controller('CustomerServiceManager', {$scope: $scope});
	}])
	.controller('CustomerPool', ['$scope', '$controller', 'Restangular', function($scope, $controller, Restangular) {
		var Customer = Restangular.all('customer');
		var User = Restangular.all('user');

		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'orderSN', label: '订单编号', isChecked: true},
			{name: 'customerPhone', label: '客户手机', isChecked: true},
			{name: 'customerPhone', label: '固定电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'email', label: 'Email', isChecked: true},
			{name: 'payStatus', label: '客户状态', isChecked: true, sortable: true},
			{name: 'createTime', label: '创建时间', isChecked: true, sortable: true},
			{name: 'contactTimes', label: '联系次数', isChecked: true}
		];

		// 获取投诉列表
		$scope.getCustomerList = function() {
			$scope.isAllChecked = false;
			$scope.customers = Customer.getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo,
				is_allot: $scope.searchModel.isAllot,
				manager: $scope.currentUser.userNo
			}).$object;
		};

		// 状态快速查询按钮
		$scope.$watch('searchModel.isAllot', function(current, prev) {
			if (current !== prev) {
				$scope.searchModel.pageNo = 1;
				$scope.getCustomerList();
			}
		});

		// 获取选中的客户
		$scope.getSelectedCustomers = function() {
			$scope.selectedCustomers = [];
			angular.forEach($scope.customers, function(customer) {
				if (customer.isChecked) {
					$scope.selectedCustomers.push(customer);
				}
			});
			return $scope.selectedCustomers;
		};

		// 批量分配
		$scope.batchAssign = function() {
			$scope.getSelectedCustomers();
			if ($scope.selectedCustomers.length) {
				User.getList().then(function(users) {
					$scope.resUsers = users;
					$('#batch-assgin').modal('show');
				});
			}
		};

		$scope.saveBatchAssign = function() {
			var userIds = [];
			angular.forEach($scope.selectedCustomers, function(customer) {
				userIds.push(customer.id);
			});

			Customer.doPUT({
				// manager: $scope.batchResponser,
				manager: $scope.currentUser.userNo,
				ids: userIds.join(',')
			}).then(function() {
				$('#batch-assgin').modal('hide');
				$scope.getCustomerList();
			});
		};

		// 批量领取
		$scope.batchPick = function() {
			$scope.getSelectedCustomers();
			if ($scope.selectedCustomers.length) {
				$('#batch-pick').modal('show');
			}
		};

		$scope.saveBatchPick = function() {
			var userIds = [];
			angular.forEach($scope.selectedCustomers, function(customer) {
				userIds.push(customer.id);
			});

			Customer.doPUT({
				manager: $scope.currentUser.userNo,
				ids: userIds.join(',')
			}).then(function() {
				$('#batch-pick').modal('hide');
				$scope.getCustomerList();
			});
		};

		$scope.getCustomerList();

		$controller('CustomerServiceManager', {$scope: $scope});
	}]);
