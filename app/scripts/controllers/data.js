'use strict';

angular.module('mainApp')
.controller('DataCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'service';

	$controller('MainCtrl', {$scope: $scope});

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('DataManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		};


		$controller('DataCtrl', {$scope: $scope});

	}])


	.controller('OrderManag', ['$scope', '$controller', 'Order', function ($scope, $controller, Order) {
		console.log('var');
		// 搜索下拉
		$scope.filters = [
			{name: '所在省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
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
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'customerName', label: '姓名', isChecked: true, sortable: true},
			{name: 'gender', label: '性别', isChecked: true, sortable: true},
			{name: 'customerPhone', label: '手机', isChecked: true, sortable: true},
			{name: 'orderSN', label: '订单号', isChecked: true, sortable: true},
			{name: 'orderType', label: '订购商品', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: false, sortable: true},
			{name: 'area', label: '地址', isChecked: false, sortable: true},
			{name: 'alipay', label: '支付宝账号', isChecked: false, sortable: true},
			{name: 'orderStatus', label: '订单时间', isChecked: true, sortable: true},
			{name: 'payType', label: '订单状态', isChecked: false, sortable: true},
			{name: 'payway', label: '订单类型', isChecked: true, sortable: true},
			{name: 'payStatus', label: '付款方式', isChecked: true, sortable: true},
			{name: 'sumAmount', label: '付款状态', isChecked: true, sortable: true},
			{name: 'sumAmount', label: '累计订单金额', isChecked: false, sortable: true},
			{name: 'details', label: '详细', isChecked: true, sortable: true}
		];

		// 修改订单列表
		$scope.getOrderList = function() {
			$scope.orders = Order.getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo,
				// workflow: 1,
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

		$scope.getOrderList();

		$scope.newContact = function(record) {
			$('#contact-history').modal('show');
		};

		$scope.showContact = function(record) {
			$('#contact-history').modal('show');
		};

		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Work', ['$scope', '$controller', function ($scope, $controller) {

		// 搜索下拉
		$scope.filters = [
			{name: '所在省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
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
			{name: 'customer_name', label: '姓名', isChecked: true, sortable: true},
			{name: 'gender', label: '性别', isChecked: true, sortable: true},
			{name: 'customer_phone', label: '手机', isChecked: true, sortable: true},
			{name: 'orderSN', label: '工单号', isChecked: true, sortable: true},
			{name: 'city', label: '城市', isChecked: true, sortable: true},
			{name: 'workstart', label: '工单开始时间', isChecked: false, sortable: true},
			{name: 'workend', label: '工单结束时间', isChecked: false, sortable: true},
			{name: 'responser', label: '受理人', isChecked: true, sortable: true},
			{name: 'workStatus', label: '工单状态', isChecked: true, sortable: true},
			{name: 'workType', label: '工单类型', isChecked: true, sortable: true}
		];

		// fake data
		$scope.orders = [{"id":7,"order_no":"7","order_type":1,"effective":"2014-10-23 00:00","deadline":"2014-10-30 00:00","customer_code":"2","customer_name":null,"customer_phone":'1203323212',"customer_addr":null,"has_invoice":true,"source":1,"agent_code":null,"coupon_code":null,"discount_amount":1,"amount":1,"payment":1,"status":2,"paid":0,"validity":1,"order_time":"2014-10-30 23:19","creator":"1","create_time":"2014-10-30 23:19","updater":null,"update_time":null,"contact_count":0,"yn":true,"audit":4,"workflow":1,"customer":{"id":2,"code":"2","type":1,"name":"客户2","sex":1,"birthday":"1","child":"客户2孩子","c_sex":1,"email":"1","province":"山西","city":"太原","district":null,"street":null,"address":"太远","post":null,"phone":"","main_phone":null,"fax":null,"status":null,"creator":"","create_time":null,"updater":null,"update_time":null,"yn":1,"is_allot":null},"details":[{"id":9,"orders_no":"7","product_no":"1","effective":"2014-10-30 23:28","qty":1,"bulk":1,"weight":1,"status":1,"yn":true}],"route":"order","reqParams":null,"fromServer":true,"parentResource":null,"restangularCollection":false,"$$hashKey":"01V"},{"id":8,"order_no":"8","order_type":1,"effective":"2014-10-23 00:00","deadline":"2014-10-30 00:00","customer_code":"2","customer_name":null,"customer_phone":null,"customer_addr":null,"has_invoice":true,"source":1,"agent_code":null,"coupon_code":null,"discount_amount":1,"amount":1,"payment":1,"status":2,"paid":0,"validity":1,"order_time":"2014-10-30 23:19","creator":"1","create_time":"2014-10-30 23:19","updater":null,"update_time":null,"contact_count":0,"yn":true,"audit":2,"workflow":1,"customer":{"id":2,"code":"2","type":1,"name":"客户2","sex":1,"birthday":"1","child":"客户2孩子","c_sex":1,"email":"1","province":"山西","city":"太原","district":null,"street":null,"address":"太远","post":null,"phone":"","main_phone":null,"fax":null,"status":null,"creator":"","create_time":null,"updater":null,"update_time":null,"yn":1,"is_allot":null},"details":[{"id":11,"orders_no":"8","product_no":"1","effective":"2014-10-30 23:28","qty":1,"bulk":1,"weight":1,"status":1,"yn":true}],"route":"order","reqParams":null,"fromServer":true,"parentResource":null,"restangularCollection":false,"$$hashKey":"01W"}];
		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Inventory', ['$scope', '$controller', '$filter', function ($scope, $controller, $filter) {

		$scope.products = [{type: 'lorem', name: '李四民', content: 'lorem', sku: '3213', minSKU: '123', SN: '1231231123', location: '山东'}, {type: 'lorem', name: '张三', content: 'lorem', sku: '1231', minSKU: '123', SN: '123124121', location: '青岛'} ]; $scope.isAllThsShow = true;
		$scope.order = {};

		$scope.ths = [
				{name: 'type', label: '产品类别', isChecked: true, sortable:true},
				{name: 'name', label: '产品名称', isChecked: true, sortable:true},
				{name: 'content', label: '产品内容', isChecked: true, sortable:true},
				{name: 'sku', label: '库存数量', isChecked: true, sortable:true},
				{name: 'minSKU', label: '库存下限', isChecked: true, sortable:true},
				{name: 'SN', label: '产品编码', isChecked: true, sortable:true},
				{name: 'location', label: '所在仓库', isChecked: true, sortable:true}
		];

		$scope.getProducts = function(order) {
			$scope.currentOrder = order;
			$scope.order.topic = '调库';
			$scope.order.createTime = $filter('now')();
			$scope.order.updatedTime = $scope.order.createTime;
			$scope.order.status = '';
			$('#order-details').modal('show');
		};

		$scope.fillProducts = function(order) {
			$scope.currentOrder = order;
			$scope.order.topic = '补库';
			$scope.order.createTime = (new Date()).toLocaleString();
			$scope.order.updatedTime = $scope.order.createTime;
			$scope.order.status = '';
			$('#order-details').modal('show');
		};

		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Statistics', ['$scope', '$controller', function ($scope, $controller) {

		$scope.products = [{type: 'lorem', name: '李四民', content: 'lorem', sku: '3213', minSKU: '123', SN: '1231231123', location: '山东'}, {type: 'lorem', name: '张三', content: 'lorem', sku: '1231', minSKU: '123', SN: '123124121', location: '青岛'} ]; $scope.isAllThsShow = true;

		$scope.ths = [
				{name: 'type', label: '产品类别', isChecked: true, sortable:true},
				{name: 'name', label: '产品名称', isChecked: true, sortable:true},
				{name: 'content', label: '产品内容', isChecked: true, sortable:true},
				{name: 'sku', label: '库存数量', isChecked: true, sortable:true},
				{name: 'minSKU', label: '库存下限', isChecked: true, sortable:true},
				{name: 'SN', label: '产品编码', isChecked: true, sortable:true},
				{name: 'location', label: '所在仓库', isChecked: true, sortable:true}
		];

		$scope.getProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '调库';
			$('#order-details').modal('show');
		};

		$scope.fillProducts = function(order) {
			$scope.currentOrder = order;
			$scope.modalTitle = '补库';
			$('#order-details').modal('show');
		};

		$scope.printCharts = function() {
			$scope.print();
		};

		$controller('DataManager', {$scope: $scope});
	}]);
