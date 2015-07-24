'use strict';

angular.module('mainApp')
.controller('CustomerServiceCtrl', ['$scope', '$controller', '$http', '$filter', function ($scope, $controller, $http, $filter) {

	var $contactForm = $('#contact-history');

	// init
	$scope.searchModel = {
		pageSize: config.perPage,
		pageNo: 1,
	};

	$scope.getBaseOrder = function() {
		console.log('get base order');
	};

	// 新建联系记录
	$scope.addContact = function(form) {
		$scope.resetForm(form);
		$scope.gbContact = {
			// creator: $scope.currentUser.userNo,
			// updator: $scope.currentUser.userNo,
			user_no: $scope.currentUser.userNo,
			id: $scope.guid(),
			form_no: $scope.guid(),
			start_time: $filter('now')(),
			end_time: $filter('now')(),
			next_time: $filter('now')(),
			tel_no: $scope.currentUser.phone,
			name: $scope.currentUser.name
		};
		$contactForm.modal('show');
	};

	// 保存联系记录
	$scope.saveContact = function(form) {
		if (!$scope.validateForm(form, $contactForm)) return;
		$scope.processing(form, $contactForm);
		console.log($scope.gbContact);

		$http.post(config.basews + 'communication/', $scope.gbContact)
			.success($scope.onFine({
				form: form,
				$form: $contactForm
			}))
			.error($scope.onError({
				form: form,
				$form: $contactForm
			}));
	};

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CheckOrder', ['$scope', '$controller', 'Order', '$http', '$filter', '$q', function($scope, $controller, Order, $http, $filter, $q) {
		var
			$orderShareForm = $('#share-order'),
			$orderDetails = $('#order-details'),
			$gbNewOrder = $('#global-new-order'),
			$orderUpdateForm = $('#edit-order-status');

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 'province', subfilters: $scope.mapRevert('province')},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'customer_phone', input: true},
			{name: '订单编号', value: 'order_no', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: $scope.mapRevert('payStatus')},
			{name: '支付方式', value: 'payment', subfilters: $scope.mapRevert('payment') },
			{name: '审单状态', value: 'status', subfilters:  $scope.mapRevert('orderStatus')},
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
			{name: 'payment', label: '支付方式', isChecked: true},
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
				status: 1,
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
			$scope.processing(form, $orderUpdateForm);

			$http.put(config.basews + 'order/' + $scope.currentOrder.id + '/audit', {
				audit: $scope.currentOrder.auditStatus
			}).success(function(status) {
				form.processing = false;

				if (status) {
					$scope.currentOrder.audit = $scope.currentOrder.auditStatus;
					$orderUpdateForm.modal('success', {
						callback: function() {
							$orderDetails.modal('hide');
							$scope.getOrderList();
						}
					});
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

		// 获取套餐列表
		$scope.getSuitList = function() {

			return $http.post(config.basewms + 'baseinfo/packages/', {
				pageNo: 1,
				pageSize: 1000
			})
			.success(function(data) {
				$scope.suits = data.records;
			});
		};

		// 新建订单
		$scope.globalNewOrder = function(form) {
			$scope.resetForm(form);

			$scope.gbOrder = {
				effective: $filter('now')(),
				order_no: $scope.guid(),
				creator: $scope.currentUser.userNo,
				sourceName: '客服系统',
				source: '1',
				workflow: 2,
				audit: 1,
				payment: '3',
				status: '1',
				paid: '0'
			};

			$q.all([$http.get(config.basews + 'order/getOrderNo/'), $scope.getSuitList()])
				.then(function(data) {
				$scope.gbOrder.order_no = data[0].data;
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
	.controller('SplitOrder', ['$scope', '$controller', 'Order', '$http', '$q', 'dialog', function($scope, $controller, Order, $http, $q, dialog) {
		var $splitForm = $('#split-form'),
			$splitResult = $('#split-results'),
			$shipmentForm = $('#shipment-form'),
			$shipmentCheckForm = $('#shipment-check-form'),
			$giftForm = $('#gift-form');

		// 搜索下拉
		$scope.filters = [
			{name: '省份', value: 'province', subfilters: $scope.mapRevert('province')},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'cicustomer_phone', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: $scope.mapRevert('payStatus')},
			{name: '支付方式', value: 'payment', subfilters: $scope.mapRevert('payment') },
			{name: '审单状态', value: 'status', subfilters:  $scope.mapRevert('orderStatus')},
			{name: '创建时间', value: 'create_time', date: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]},
			{name: '退换货单号', value: 12, input: true}
		];

		$scope.goodsFilters = [
			{name: '商品编号', value: 'goods_code', input: true},
			{name: '商品名称', value: 'goods_name', input: true},
			{name: '商品类型', value: 'goods_type', subfilters: $scope.mapRevert('goodType')},
			{name: '是否有效', value: 'yn', subfilters: $scope.mapRevert('yesno')}
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

				$scope.isAllChecked = false;
				$shipmentForm.modal('show');
				$shipmentForm.modal('spinner', true);
			});
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

		// 查看发货单
		$scope.showTableShipment = function(shipmentNo) {
			$shipmentForm.modal('spinner');
			return $http.get(config.basewms + 'outbound/shipment/' + shipmentNo + '/');
		};

		$scope.showTableShipmentCallback = function(params) {

			var $content = params.$content,
				data = params.data,
				$innerTable;

			$innerTable = $('<table class="uu-table""><thead><tr><th class="nowrap">编号</th><th class="nowrap">名称</th><th class="nowrap">数量</th><th class="nowrap">产品类别</th></tr></thead><tbody></tbody></table>');

			angular.forEach(data.details, function(d) {
				var $tr = $('<tr></tr>');

				$tr.append('<td>' + d.code + '</td>');
				$tr.append('<td>' + d.name + '</td>');
				$tr.append('<td>' + d.qty + '</td>');

				if (d.is_product) $tr.append('<td>产品</td>');
				if (d.is_gift) $tr.append('<td>赠品</td>');

				$innerTable.find('tbody').append($tr);
			});

			$content.html($innerTable);
			$shipmentForm.modal('spinner', true);
		};

		// 发货单复核
		$scope.checkShipment = function(shipmentNo, form) {

			$scope.resetForm(form);

			var shipmentDefer = $http.get(config.basewms + 'outbound/shipment/' + shipmentNo + '/');
			var warehousesDefer = $scope.getWarehouseList();
			var commodityListDefer = $scope.getCommdityList();

			return $q.all([shipmentDefer, commodityListDefer, warehousesDefer])
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

		// 合并出库单
		$scope.mergeShipment = function(form) {

			var shipmentNos = $scope.getCheckedShipments($scope.shipments);

			if (shipmentNos.length < 2) {
				dialog.info({text: '请至少选择两个出库单!'});
				return;
			}

			dialog.alert({
				text: '确定将所选出库单合并为一张出库单? 您的操作将无法撤消!',
				cancel: 1,
				onyes: function() {
					$scope.processing(form, $shipmentForm);

					$http.post(config.basewms + 'outbound/shipment/merge/', {
							shipment_nos: shipmentNos,
							updater: $scope.currentUser.userNo
						})
						.success($scope.onFine({
							form: form,
							$form: $shipmentForm,
							hide: false,
							action: function() {
								$scope.isAllChecked = false;
								$scope.showShipments();
								$shipmentForm.modal('spinner');
							}
						}))
						.error($scope.onError({
							form: form,
							$form: $shipmentForm
						}));
				}
			});
		};

		// 获取商品列表
		$scope.getCommdityList = $scope.getBaseCommdityList($scope, 'subSearchModel', 'subQuery', 'goods', $shipmentCheckForm);

		// 商品搜索
		$scope.goodsSearch = function() {
			$scope.subQuery = $scope.parseFilter($scope.subSearchModel);
			$scope.getCommdityList();
		};

		$scope.getCheckedShipments = function(shipments) {
			var shipmentNos = [];

			angular.forEach(shipments, function(shipment) {
				if (shipment.isChecked && shipment.status === 0) shipmentNos.push(shipment.shipment_no);
			});

			return shipmentNos;

		};


		// 批量复合
		$scope.batchConfirm = function(form) {
			var shipmentNos = $scope.getCheckedShipments($scope.shipments);

			if (!shipmentNos.length) {
				dialog.info({text: '请至少选择一个出库单!'});
				return;
			}

			$scope.processing(form, $shipmentForm);

			$http.post(config.basewms + 'outbound/shipments/check/', {
					shipment_nos: shipmentNos,
					updater: $scope.currentUser.userNo
				})
				.success($scope.onFine({
					form: form,
					$form: $shipmentForm,
					hide: false,
					action: function() {
						$scope.isAllChecked = false;
						$scope.showShipments();
						$shipmentForm.modal('spinner');
					}
				})).error($scope.onError({
					form: form,
					$form: $shipmentForm
				}));
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

		// 回退
		$scope.goBack = function(order, onFine, onError) {

			console.log(order);

			console.log('go back');

			setTimeout(function() {
				onError();
			}, 1000);
		};

		$controller('CustomerServiceCtrl', {$scope: $scope});
	}])
	.controller('Firstbuy', ['$scope', '$controller', 'Order', '$http', function($scope, $controller, Order, $http) {

		var $orderDetails = $('#order-details');


		// 搜索下拉
		$scope.filters = [
			// {name: '订单类型', value: 'order_type', subfilters: $scope.mapRevert('orderType')},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '代理商号', value: 'agent_id', input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'order_no', label: '订单号', isChecked: true},
			{name: 'order_type', label: '订单类型', isChecked: true},
			{name: 'customer_name', label: '客户姓名', isChecked: true},
			{name: 'customer_phone', label: '客户手机', isChecked: true},
			{name: 'customer_tel', label: '客户电话', isChecked: true},
			{name: 'customer_addr', label: '客户地址', isChecked: true},
			{name: 'has_invoice', label: '是否有发票', isChecked: true},
			{name: 'amount', label: '总金额', isChecked: true},
			{name: 'payment', label: '支付方式', isChecked: true},
			{name: 'status', label: '状态', isChecked: true}
		];

		$scope.showOrder = function(order_no) {

			$http.get('agency/orders/query_orders/' + order_no + '/')
				.success(function(order) {
					$scope.order = order;
					$orderDetails.modal('show');
				});
		};

		// 审核通过
		$scope.confirmOrder = function(form, order_no) {
			$scope.processing(form, $orderDetails);

			$http.post('agency/orders/check_orders/' + order_no + '/', {
				updater: $scope.currentUser.userNo
			})
				.success($scope.onFine({
					form: form,
					$form: $orderDetails,
					action: $scope.getOrderList
				}))
				.error($scope.onError({
					form: form,
					$form: $orderDetails
				}));
		};

		// 获取订单列表
		$scope.getOrderList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1,
				paid: $scope.searchModel.paid,
				order_type: '0'
			};

			$.extend(req, $scope.query);

			$http.get('agency/orders/query_all/', {params: req})
				.success(function(data) {
					$scope.orders = data.records;
					$scope.orders.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
				});
		};

		// 状态快速切换
		$scope.$watch('query.order_type', function(current, prev) {
			if (current !== prev) {
				$scope.searchModel.pageNo = 1;
				$scope.getOrderList();
			}
		});

		// 搜索
		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getOrderList();
		};

		$scope.goodsSearch = $scope.baseSearch($scope, 'getCommdityList', 'subSearchModel');

		$scope.getOrderList();

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

		// 新建退货单
		$scope.addNewReturnOrder = function(form) {
			$scope.resetForm(form);

			$scope.order = {
				order_no: $scope.guid(),
				creator: $scope.currentUser.userNo,
				updator: $scope.currentUser.userNo
			};

			$returnForm.modal('show');
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
			$complaintForm = $('#complaint-form'),
			$orderDetails = $('#order-details'),
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
			{name: '省份', value: 'province', subfilters: $scope.mapRevert('province')},
			{name: '城市', value: 'city', input: true},
			{name: '客户姓名', value: 'customer_name', input: true},
			{name: '客户电话', value: 'customer_phone', input: true},
			{name: '订单编号', value: 'order_no', input: true},
			// {name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 'paid', subfilters: $scope.mapRevert('payStatus')},
			{name: '支付方式', value: 'payment', subfilters: $scope.mapRevert('payment') },
			{name: '审单状态', value: 'status', subfilters:  $scope.mapRevert('orderStatus')},
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
