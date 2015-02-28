'use strict';

angular.module('mainApp')
.controller('CustomerServiceCtrl', ['$scope', '$controller', 'Order', function ($scope, $controller, Order) {

	// init
	$scope.searchModel = {
		pageSize: config.perPage,
		pageNo: 1,
	};

	$scope.getBaseOrder = function() {
		console.log('get base order');
	};

	// 新建退货单
	$scope.addNewContact = function($form) {
		return function(form) {
			$scope.resetForm(form);

			$scope.order = {
				order_no: $scope.guid(),
				creator: $scope.currentUser.userNo,
				updator: $scope.currentUser.userNo
			};

			$form.modal('show');
		};
	};

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CheckOrder', ['$scope', '$controller', 'Order', '$http', '$filter', function($scope, $controller, Order, $http, $filter) {
		var
			$orderShareForm = $('#share-order'),
			$orderDetails = $('#order-details'),
			$gbNewOrder = $('#global-new-order'),
			$orderUpdateForm = $('#edit-order-status');

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 'province', subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'customer_phone', input: true},
			{name: '订单编号', value: 'order_no', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: [{name: '未支付', value: 0}, {name: '已支付', value: 1}]},
			{name: '支付方式', value: 'payment', subfilters: [{name: '银行', value: 1}, {name: '支付宝', value: 2}, {name: '货到付款', value: 3}]},
			{name: '审单状态', value: 'status', subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 'create_time', date: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'order_no', label: '订单编号', isChecked: true},
			{name: 'phone', label: '客户电话', isChecked: true},
			{name: 'province', label: '所在省', isChecked: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true},
			{name: 'paid', label: '付款状态', isChecked: true},
			// {name: 'audit', label: '审单状态', isChecked: true, filters: ['待审核', '审核中', '审核通过', '无效']},
			{name: 'audit', label: '审单状态', isChecked: true },
			{name: 'create_time', label: '创建时间', isChecked: true},
			{name: 'contact_count', label: '联系次数', isChecked: true}
		];

		// 获取订单列表
		$scope.getOrderList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1,
				workflow: 1,
				paid: $scope.searchModel.paid
			};

			$.extend(req, $scope.query);
			$scope.orders = Order.getList(req).$object;
		};

		// 所有, 已付费, 未付费快速查询按钮
		$scope.$watch('searchModel.paid', function(current, prev) {
			if (current !== prev) {
				$scope.searchModel.pageNo = 1;
				$scope.getOrderList();
			}
		});

		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getOrderList();
		};

		// 查看订单
		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$scope.isCustometInfoEditable = false;
			$orderDetails.modal('show');
		};

		// 修改订单状态
		$scope.editOrderStatus = function(currentOrder) {
			currentOrder.auditStatus = currentOrder.audit;
			$scope.currentOrder = currentOrder;
			$orderUpdateForm.modal('show');
		};

		// 保存订单状态
		$scope.updateOrderStatus = function(form) {
			$orderUpdateForm.modal('spinner');
			form.processing = true;

			$http.put(config.basews + 'order/' + $scope.currentOrder.id + '/audit', {
				audit: $scope.currentOrder.auditStatus
			}).success(function(status) {
				form.processing = false;

				if (status) {
					$scope.currentOrder.audit = $scope.currentOrder.auditStatus;
					$orderUpdateForm.modal('success');
					$scope.getOrderList();
				} else {
					$orderUpdateForm.modal('fail');
				}
			})
			.error(function() {
				form.processing = false;
				$orderUpdateForm.modal('fail');
			});
		};

		// 共享订单
		$scope.shareOrder = function(currentOrder) {
			$scope.currentOrder = currentOrder;
			$orderShareForm.modal('show');
		};

		// 共享订单 - 发送请求
		$scope.saveSharedOrder = function(form) {
			$scope.processing(form, $orderShareForm);
			$http.put(config.basews + 'order/' + $scope.currentOrder.id + '/workflow', {
				workflow: $scope.currentOrder.workflow
			}).success(function(status) {
				form.processing = false;
				if (status) {
					$orderShareForm.modal('success');
					$orderShareForm.one('hidden.bs.modal', function() {
						$orderDetails.modal('hide');
					});
					$scope.getOrderList();
				} else {
					$orderShareForm.modal('fail');
				}
			}).error(function() {
				form.processing = false;
				$orderShareForm.modal('fail');
			});
		};

		// 修改客户信息
		$scope.editCustomerInfo = function() {
			$scope.isCustometInfoEditable = true;
		};

		// 保存客户信息
		$scope.saveCustomerInfo = function(form) {
			if (!$scope.isCustometInfoEditable || form.processing) return;

			// 表单验证
			if (!$scope.validateForm(form, $orderDetails)) return;

			$scope.processing(form, $orderDetails);

			$scope.currentOrder.put()
				.then($scope.onFine({
					form: form,
					$form: $orderDetails,
					action: function() {
						$scope.isCustometInfoEditable = false;
					},
					hide: false
				}), $scope.errorHandler(form, $orderDetails));
		};

		// 首次加载定单列表
		$scope.getOrderList();

		// 新建订单
		$scope.globalNewOrder = function(form) {
			$scope.resetForm(form);

			$scope.gbOrder = {
				effective: $filter('now')(),
				order_no: $scope.guid(),
				creator: $scope.currentUser.userNo,
				sourceName: '客服系统',
				source: '1',
				amount: '2380',
				workflow: 2,
				audit: 1,
				payment: '3',
				status: '1',
				paid: '0'
			};

			// $scope.gbOrder = {"effective":"2015-02-01 20:12","order_no":"6d08040d-0b8f-808b","creator":"admin","sourceName":"客服系统","source":"1","amount":"2380","workflow":2,"audit":4,"paid":"0","order_type":"13c3d04e-82da-11ab","status":"1","customer":{"name":"你是苛夺革","phone":"15932331233","child":"是谁","birthday":"2015-01-28","c_sex":"0","main_phone":"11111","email":"","sex":"0","province":"黑龙江省","city":"伊春市","address":"哪里哪里","post":"121231","creator":"admin"},"has_invoice":"1","invoice_title":"你是那","payment":"1","deadline":"2015-02-05","details":[{"orders_no":"112312","product_no":"313213","qty":"2","bulk":"123","weight":"12321","status":"1","yn":"1"}]};
			// $scope.gbOrder.order_no = $scope.guid();
			// 获取套餐列表
			$http.post(config.basewms + 'baseinfo/packages/', {
				pageSize: 50,
				pageNo: 1
			})
			.success(function(data) {
				$scope.suits = data.records;
				$gbNewOrder.modal('show');
			});
		};

		// 保存订单
		$scope.saveGlobalOrder = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $gbNewOrder)) return;

			form.processing = true;

			var staticOrderDetails = {
				orders_no: '112312',
				product_no: '313213',
				qty: '2',
				bulk: '123',
				weight: '12321',
				status: '1',
				yn: '1'
			};

			$scope.gbOrder.customer.creator = $scope.currentUser.account;
			$scope.gbOrder.details = [staticOrderDetails];

			$gbNewOrder.modal('spinner');

			$http.post(config.basews + 'order', $scope.gbOrder)
				.success(function(status) {
					form.processing = false;

					if (status === 'true') {
						$gbNewOrder.modal('success');
						$scope.getOrderList();
					} else {
						$gbNewOrder.modal('fail');
					}
				})
				.error(function() {
					form.processing = false;
					$gbNewOrder.modal('fail');
				});
		};


		$controller('CustomerServiceCtrl', {$scope: $scope});
	}])
	.controller('SplitOrder', ['$scope', '$controller', 'Order', '$http', '$q', function($scope, $controller, Order, $http, $q) {
		var $splitForm = $('#split-form'),
			$splitResult = $('#split-results'),
			$shipmentForm = $('#shipment-form'),
			$shipmentCheckForm = $('#shipment-check-form'),
			$giftForm = $('#gift-form');

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 'province', subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'cicustomer_phone', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: [{name: '未支付', value: 0}, {name: '已支付', value: 1}]},
			{name: '支付方式', value: 'payment', subfilters: [{name: '银行', value: 1}, {name: '支付宝', value: 2}, {name: '货到付款', value: 3}]},
			{name: '审单状态', value: 'status', subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 'create_time', date: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]},
			{name: '退换货单号', value: 12, input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'order_no', label: '订单编号', isChecked: true},
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'phone', label: '客户电话', isChecked: true},
			{name: 'province', label: '详细地址', isChecked: true},
			{name: 'order_type', label: '订购类型', isChecked: true},
			{name: 'payment', label: '付款方式', isChecked: true},
			{name: 'paid', label: '付款状态', isChecked: true},
			{name: 'create_time', label: '下单时间', isChecked: true},
			{name: 'who', label: '下单人', isChecked: true}
		];

		// 获取订单列表
		$scope.getOrderList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1,
				workflow: 2,
				paid: $scope.searchModel.paid
			};

			$.extend(req, $scope.query);

			$scope.orders = Order.getList(req).$object;
		};


		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getOrderList();
		};

		$scope.getOrderList();

		$scope.showSplitModal = function(order) {
			$scope.currentOrder = order;
			$splitForm.modal('show');
		};

		// 拆分定单(名称与行为不一致)
		$scope.showShipments = function(order) {
			order && ($scope.order = order);

			$http.get(config.basews + 'order/' + $scope.order.id + '/split', {
				params: {
					updater: $scope.currentUser.userNo
				}
			})
			.success(function(data) {
				$scope.shipments = data;
				$shipmentForm.modal('show');
			});

			// $http.get(config.basewms + 'outbound/shipments/orders' + $scope.order.order_no + '/')
			// .success(function(data) {
			// 	$scope.shipments = data;
			// 	$shipmentForm.modal('show');
			// });
		};

		// 获取库房列表
		$scope.getWarehouseList = function() {
			return $http.post(config.basewms + 'baseinfo/warehouses/', {
				pageSize: 50,
				pageNo: 1
			})
			.success(function(data) {
				$scope.warehouses = data.records;
			});
		};

		// 发货单复核
		$scope.checkShipment = function(shipmentNo, form) {

			$scope.resetForm(form);

			var shipmentDefer = $http.get(config.basewms + 'outbound/shipment/' + shipmentNo + '/');
			var warehousesDefer = $scope.getWarehouseList();
			var commodityListDefer = $scope.getCommdityList();

			$q.all([shipmentDefer, commodityListDefer, warehousesDefer])
				.then(function(data) {
					if (data && data[0].status === 200 && data[1].status === 200 && data[2].status === 200) {
						$scope.shipment = data[0].data;
						$scope.shipment.updater = $scope.currentUser.userNo;
						$shipmentCheckForm.modal('show');
					}
				});
		};


		// 保存发货单
		$scope.confirmShipment = function(form) {
			if (!$scope.validateForm(form, $shipmentCheckForm)) return;

			$scope.processing(form, $shipmentCheckForm);

			$http.post(config.basewms + 'outbound/shipment/check/', {
					warehouse: $scope.shipment.warehouse,
					updater: $scope.currentUser.userNo,
					shipment_no: $scope.shipment.shipment_no,
					sent_date: $scope.shipment.sent_date,
					type: '1',
					details: $scope.shipment.details
				})
				.success($scope.onFine({
					form: form,
					$form: $shipmentCheckForm,
					action: $scope.showShipments
				}))
				.error($scope.onError({
					form: form,
					$form: $shipmentCheckForm
				}));
		};

		// 获取商品列表
		$scope.getCommdityList = function() {

			return $http.post(config.basewms + 'baseinfo/query_goods_list/', {
				pageSize: $scope.subSearchModel.pageSize || Math.ceil(config.perPage / 2 ),
				pageNo: $scope.subSearchModel.pageNo || 1
			})
			.success(function(data) {
				$scope.goods = data.records;
				$scope.goods.meta = {
					pageSize: data.pageSize,
					pageNo: data.pageNo ? data.pageNo : 1,
					recordsCount: data.recordsCount,
					pageNumber: data.pageNumber
				};
			});
		};

		$scope.splitOrder = function(form) {

			$scope.processing(form, $shipmentForm);

			$http.put(config.basews + 'order/' + $scope.order.id + '/split/', {
					updater: $scope.currentUser.userNo
				})
				.success($scope.onFineWs({
					form: form,
					$form: $shipmentForm,
					msg: '成功',
					errMsg: '失败',
					action: $scope.getOrderList
				})).error($scope.onError({
					form: form,
					$form: $shipmentForm,
					msg: '失败!'
				}));
		};

		$scope.editShipment = function(shipment) {
			$scope.tmpShipment = angular.copy(shipment);
			$shipmentForm.modal('show');
		};


		// 为产品添加商品
		$scope.addGoodToShipment = function(good) {

			var exists = false;

			angular.forEach($scope.shipment.details, function(existGood) {
				if (existGood.code === good.goods_code) {
					exists = true;
					return;
				}
			});

			if (!exists) {
				$shipmentCheckForm.modal('info', '添加成功');
				$scope.shipment.details.push({
					code: good.goods_code,
					name: good.goods_name,
					qty: '1',
					is_product: '0',
					operatable: true,
					is_gift: '1'
				});
			} else {
				$shipmentCheckForm.modal('info', '已经存在, 请勿重复添加');
			}
		};

		// 修改商品
		$scope.editGood = function(good, form) {
			$scope.resetForm(form);
			$scope.shipmentGood = good;
			$scope.shipmentTmpGood = angular.copy(good);
			$giftForm.modal('show');
		};

		$scope.removeGood = function(index) {
			$scope.shipment.details.splice(index, 1);
		};

		// 保存商品详情
		$scope.saveGoodToShipment = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $giftForm)) return;
			$scope.shipmentGood.qty = $scope.shipmentTmpGood.qty;
			$scope.shipmentGood.is_gift = $scope.shipmentTmpGood.is_gift;
			$scope.shipmentGood.is_product = $scope.shipmentTmpGood.is_product;
			$scope.shipmentGood.status = $scope.shipmentTmpGood.status;
			$giftForm.modal('hide');
		};

		$scope.selectGift = function(currentOrder) {
			$scope.tmpOrder = {gift: currentOrder.gift};
			$giftForm.modal('show');
		};

		$scope.saveSelectedGift = function() {
			$scope.currentOrder.gift = $scope.shipmentTmpGood.gift;
			$giftForm.modal('hide');
		};

		$controller('CustomerServiceCtrl', {$scope: $scope});
	}])
	.controller('Return', ['$scope', '$controller', function($scope, $controller) {

		var $tree = $('#tree'),
			$returnForm = $('#return-form');

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

		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			// $scope.getOrderList();
		};

		$scope.confirmAndShare =function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $returnForm)) return;

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

		$controller('CustomerServiceCtrl', {$scope: $scope});
	}])
	.controller('Complains', ['$scope', '$controller', '$http', '$filter', 'Restangular', function($scope, $controller, $http, $filter, Restangular) {
		var
			$returnOrder = $('#return-order'),
			$orderDetails = $('#order-details'),
			$complaintForm = $('#complaint-form'),
			$tree = $('#tree');

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
            {name: '紧急程度', value: 1, subfilters: [{name: '一般', value: 1 }, {name: '优先', value: 2 }, {name: '非常紧急', value: 3 }]},
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
			{name: 'province', label: '所在省', isChecked: true},
			{name: 'city', label: '城市', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true},
			{name: 'paid', label: '付款状态', isChecked: true},
			{name: 'create_time', label: '创建时间', isChecked: true},
			{name: 'subType', label: '投诉分类', isChecked: true},
			{name: 'status', label: '处理结果', isChecked: true},
			{name: 'next_time', label: '回访时间', isChecked: true},
			{name: 'contact_times', label: '联系次数', isChecked: true}
		];

		var Workform = Restangular.all('workform');

		// 获取投诉列表
		$scope.getOrderList = function() {
			$scope.complaintsOrders = Workform.all('complain').getList({
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
		$scope.addNewReturnOrder = $scope.addNewContact($complaintForm);


		// 查看订单
		$scope.showComplaintOrders = function(order) {
			$scope.currentOrder = order;
			$scope.isCustometInfoEditable = false;
			$orderDetails.modal('show');
		};

		// 新建投诉
		$scope.addNewComplains = function(form) {
			$scope.resetForm(form);
			$scope.complaint = {
				// contact_time: $filter('now')(),
				type: 3,
				theme: 2,
				user: $scope.currentUser.userNo
			};
			$complaintForm.modal('show');
		};

		// 保存投诉
		$scope.saveComplaint = function(form) {
			if (!$scope.validateForm(form, $complaintForm)) return;

			$scope.processing(form, $complaintForm);

			$http.post(config.basews + 'workform', $scope.complaint)
				.success($scope.onFineWs({
					form: form,
					$form: $complaintForm,
					action: $scope.getOrderList
				}))
				.error($scope.onError({
					form: form,
					$form: $complaintForm
				}));
		};

		// 退换货
		$scope.exchange = function() {
			$returnOrder.modal('show');
		};

		// 退换货
		$scope.returnGoods = function() {
			$returnOrder.modal('show');
		};

		$scope.saveOrder = function(order) {
			var
				tree = $tree.fancytree('getTree'),
				selectedNodes = tree.getSelectedNodes();

			console.log(selectedNodes);
		};

		$controller('CustomerServiceCtrl', {$scope: $scope});
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

		$controller('CustomerServiceCtrl', {$scope: $scope});
	}])
	.controller('CustomerPool', ['$scope', '$controller', 'Restangular', function($scope, $controller, Restangular) {
		var
			Customer = Restangular.all('customer'),
			User = Restangular.all('user'),
			$assginForm = $('#batch-assgin'),
			$pickForm = $('#batch-pick');

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 'province', subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'customer_phone', input: true},
			{name: '订单编号', value: 'order_no', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: [{name: '未支付', value: 0}, {name: '已支付', value: 1}]},
			{name: '支付方式', value: 'payment', subfilters: [{name: '银行', value: 1}, {name: '支付宝', value: 2}, {name: '货到付款', value: 3}]},
			{name: '审单状态', value: 'status', subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 'create_time', date: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]}
		];

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
		$scope.batchAssign = function(form) {
			$scope.getSelectedCustomers();
			if ($scope.selectedCustomers.length) {
				User.getList().then(function(users) {
					$scope.resUsers = users;
					$scope.resetForm(form);
					$assginForm.modal('show');
				});
			}
		};

		$scope.saveBatchAssign = function(form) {
			if (!$scope.validateForm(form, $assginForm)) return;

			var userIds = [];

			angular.forEach($scope.selectedCustomers, function(customer) {
				userIds.push(customer.id);
			});

			$scope.processing(form, $assginForm);

			Customer.doPUT({
				manager: $scope.batchResponser,
				ids: userIds.join(',')
			}).then($scope.onFineWs({
				form: form,
				$form: $assginForm,
				action: $scope.getCustomerList
			}), $scope.onError({
				form: form,
				$form: $assginForm
			}));
		};

		// 批量领取
		$scope.batchPick = function(form) {
			$scope.getSelectedCustomers();
			if ($scope.selectedCustomers.length) {
				$scope.resetForm(form);
				$pickForm.modal('show');
			}
		};

		$scope.saveBatchPick = function(form) {
			var userIds = [];
			angular.forEach($scope.selectedCustomers, function(customer) {
				userIds.push(customer.id);
			});

			$scope.processing(form, $pickForm);

			Customer.doPUT({
				manager: $scope.currentUser.userNo,
				ids: userIds.join(',')
			}).then($scope.onFineWs({
				form: form,
				$form: $pickForm,
				action: $scope.getCustomerList
			}), $scope.onError({
				form: form,
				$form: $pickForm
			}));
		};

		$scope.getCustomerList();

		$controller('CustomerServiceCtrl', {$scope: $scope});
	}]);
