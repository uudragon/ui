'use strict';

angular.module('mainApp')
.controller('ProductCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ProductManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('ProductCtrl', {$scope: $scope});

	}])
	.controller('Commodity', ['$scope', '$controller', '$filter', '$http', function ($scope, $controller, $filter, $http) {
		var $commodityForm = $('#commidy-form');

		// 搜索下拉
		$scope.filters = [
			{name: '商品编号', value: 'goods_code', input: true},
			{name: '商品名称', value: 'goods_name', input: true},
			{name: '商品类型', value: 'goods_type', subfilters: [{name: '教材(书籍)', value: 1}, {name: '音像制品(DVD/CD)', value: 2}, {name: '玩具', value: 3}, {name: '其它', value: 4}]},
			{name: '是否有效', value: 'yn', subfilters: [{name: '是', value: 1}, {name: '否', value: 0}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'goods_code', label: '商品编号', isChecked: true},
			{name: 'goods_name', label: '商品名称', isChecked: true},
			{name: 'goods_type', label: '商品类型', isChecked: true},
			{name: 'goods_price', label: '商品价格', isChecked: true},
			{name: 'goods_unit', label: '商品规格', isChecked: true},
			{name: 'isbn', label: 'ISBN号', isChecked: true},
			{name: 'create_time', label: '生产时间', isChecked: true},
			{name: 'goods_desc', label: '商品描述', isChecked: true},
			{name: 'yn', label: '是否有效', isChecked: true},
			{name: 'creator', label: '操作员', isChecked: true}
		];

		// 新建商品
		$scope.newCommdity = function(form) {
			$scope.resetForm(form);
			$scope.commodityFormTitle = '添加商品';

			$scope.commodity = {
				goods_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
				yn: '1'
			};

			$commodityForm.modal('show');
		};

		// 编辑商品 && 复制新增商品
		$scope.editCommodity = function(commodity, isDuplicate) {
			$scope.commodityFormTitle = isDuplicate ? '复制添加商品' : '编辑商品';
			$scope.commodity = angular.copy(commodity);
			isDuplicate && ($scope.commodity.goods_code = $scope.guid());
			$commodityForm.modal('show');
		};

		// 保存商品
		$scope.saveCommidity = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $commodityForm)) return;

			form.processing = true;
			$commodityForm.modal('spinner');

			$http.post(config.basewms + 'baseinfo/goods_define/', $scope.commodity)
				.success(function() {
					form.processing = false;
					$commodityForm.modal('success');
					$scope.getCommdityList();
				})
				.error(function() {
					form.processing = false;
					$commodityForm.modal('fail');
				});
		};

		// 搜索
		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getCommdityList();
		};

		// 获取商品列表
		$scope.getCommdityList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'baseinfo/query_goods_list/', req)
				.success(function(data) {
					$scope.commodities = data.records;
					$scope.commodities.meta = {
						pageSize: data.pageSize,
						pageNo: data.pageNo ? data.pageNo : 1,
						recordsCount: data.recordsCount,
						pageNumber: data.pageNumber
					};
				});
		};

		$scope.getCommdityList();

		// inherit functions from parent
		$controller('ProductManager', {$scope: $scope});

	}])
	.controller('Goods', ['$scope', '$controller', '$filter', '$http', '$q', function ($scope, $controller, $filter, $http, $q) {
		var
			$productForm = $('#product-form'),
			$goodsDetailsForm = $('#good-details-form');

		// 搜索下拉
		$scope.filters = [
			{name: '产品编号', value: 'product_code', input: true},
			{name: '产品名称', value: 'product_name', input: true},
			{name: '是否有效', value: 'yn', subfilters: [{name: '是', value: 1}, {name: '否', value: 0}]}
		];

		$scope.goodLevels = _.map(new Array(12), function(item, index) {
			return index + 1;
		});

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'goods_code', label: '产品编号', isChecked: true},
			{name: 'goods_name', label: '产品名称', isChecked: true},
			{name: 'goods_desc', label: '产品说明', isChecked: true},
			{name: 'create_time', label: '创建时间', isChecked: true},
			{name: 'creator', label: '创建人', isChecked: true},
			{name: 'update_time', label: '更新时间', isChecked: true},
			{name: 'updator', label: '更新人', isChecked: true},
			{name: 'yn', label: '是否有效', isChecked: true}
		];

		// 获取商品列表
		$scope.getCommdityList = function() {
			return $http.post(config.basewms + 'baseinfo/query_goods_list/', {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
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

		// 新建产品
		$scope.newProduct = function(form) {
			$scope.resetForm(form);
			$scope.productFormTitle = '添加产品';

			$scope.product = {
				product_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
				yn: '1',
				details: []
			};

			$scope.getCommdityList()
				.success(function() {
					$productForm.modal('show');
				});
		};

		// 编辑产品 && 复制添加产品
		$scope.editProduct = function(code, isDuplicate) {
			var productDefer = $http.get(config.basewms + 'baseinfo/query_product/' + code + '/');
			var commodityListDefer = $scope.getCommdityList();

			$scope.productFormTitle = isDuplicate ? '复制添加产品' : '编辑产品';

			$q.all([productDefer, commodityListDefer])
				.then(function(data) {
					if (data && data[0].status === 200 && data[1].status === 200) {
						$scope.product = data[0].data;
						isDuplicate && ($scope.product.product_code = $scope.guid());
						$productForm.modal('show');
					}
				});
		};

		// 保存产品
		$scope.saveProduct = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $productForm)) return;

			// 验证商品列表是否为空
			if (!$scope.product.details.length) {
				$productForm.modal('fail', '商品列表不能为空');
				return;
			}

			form.processing = true;
			$productForm.modal('spinner');

			$http.post(config.basewms + 'baseinfo/product_define/', $scope.product)
				.success(function() {
					form.processing = false;
					$productForm.modal('success');
					$scope.getProductList();
				})
				.error(function() {
					form.processing = false;
					$productForm.modal('fail');
				});
		};

		// 搜索
		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getProductList();
		};

		// 获取产品列表
		$scope.getProductList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'baseinfo/query_product_list/', req)
				.success(function(data) {
					$scope.products = data.records;
					$scope.products.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		// 为产品添加商品
		$scope.addGoodToProduct = function(good) {

			var exists = false;

			angular.forEach($scope.product.details, function(existGood) {
				if (existGood.goods_code === good.goods_code) {
					exists = true;
					return;
				}
			});

			if (!exists) {
				$productForm.modal('info', '添加成功');
				$scope.product.details.push({
					goods_code: good.goods_code,
					goods_name: good.goods_name,
					qty: '1',
					is_gift: '0'
				});
			} else {
				$productForm.modal('info', '已经存在, 请勿重复添加');
			}
		};

		// 修改商品
		$scope.editGood = function(good, form) {
			$scope.resetForm(form);
			$scope.productGood = good;
			$scope.productTmpGood = angular.copy(good);
			$goodsDetailsForm.modal('show');
		};

		// 保存商品详情
		$scope.saveGoodToProduct = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $goodsDetailsForm)) return;
			$scope.productGood.qty = $scope.productTmpGood.qty;
			$scope.productGood.is_gift = $scope.productTmpGood.is_gift;
			$goodsDetailsForm.modal('hide');
		};

		$scope.removeGood = function(index) {
			$scope.product.details.splice(index, 1);
		};

		$scope.getProductList();

		// inherit functions from parent
		$controller('ProductManager', {$scope: $scope});

	}]);
