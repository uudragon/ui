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
		var $newCommdity = $('#new-commidy');

		// 搜索下拉
		$scope.filters = [
			{name: '商品编号', value: 0, input: true},
			{name: '商品名称', value: 1, input: true},
			{name: '商品类型', value: 1, subfilters: [{name: '教材(书籍)', value: 0}, {name: '音像制品(DVD/CD)', value: 1}, {name: '开具', value: 1}, {name: '其它', value: 1}]},
			{name: '是否有效', value: 2, subfilters: [{name: '是', value: 0}, {name: '否', value: 1}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'goodsCode', label: '商品编号', isChecked: true},
			{name: 'goodsName', label: '商品名称', isChecked: true},
			{name: 'goodsType', label: '商品类型', isChecked: true},
			{name: 'goodsPrice', label: '商品价格', isChecked: true},
			{name: 'goodsUnit', label: '商品规格', isChecked: true},
			{name: 'isbn', label: 'ISBN号', isChecked: true},
			{name: 'createTime', label: '生产时间', isChecked: true},
			{name: 'goodsDesc', label: '商品描述', isChecked: true},
			{name: 'yn', label: '是否有效', isChecked: true},
			{name: 'creator', label: '操作员', isChecked: true}
		];

		// 新建商品
		$scope.newCommdity = function(form) {
			$scope.resetForm(form);

			$scope.commodity = {
				goods_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
				yn: '1'
			};

			$newCommdity.modal('show');
		};

		// 保存商品
		$scope.saveCommidity = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $newCommdity)) return;

			form.processing = true;
			$newCommdity.modal('spinner');

			$http.post(config.basewms + 'baseinfo/goods_define/', $scope.commodity)
				.success(function() {
					form.processing = false;
					$newCommdity.modal('success');
					$scope.getCommdityList();
				})
				.error(function() {
					form.processing = false;
					$newCommdity.modal('fail');
				});
		};

		// 获取商品列表
		$scope.getCommdityList = function() {
			$scope.commodities = [];
			$scope.commodities.meta = {
				pageSize: $scope.searchModel.pageSize || config.perPage
			};

			$http.post(config.basewms + 'baseinfo/query_goods_list/', {
					pageSize: $scope.commodities.meta.pageSize,
					pageNo: $scope.searchModel.pageNo || 1
				})
				.success(function(data) {
					$scope.commodities = data.records;
					$scope.commodities.meta = {
						// pageSize: data.pageSize,
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
	.controller('Goods', ['$scope', '$controller', '$filter', '$http', function ($scope, $controller, $filter, $http) {
		var
			$newProduct = $('#new-good'),
			$goodsDetails = $('#good-details');

		// 搜索下拉
		$scope.filters = [
			{name: '产品编号', value: 0, input: true},
			{name: '产品名称', value: 1, input: true},
			{name: '是否有效', value: 2, subfilters: [{name: '是', value: 0}, {name: '否', value: 1}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'goodsCode', label: '产品编号', isChecked: true},
			{name: 'goodsName', label: '产品名称', isChecked: true},
			{name: 'goodsDesc', label: '产品说明', isChecked: true},
			{name: 'createTime', label: '创建时间', isChecked: true},
			{name: 'creator', label: '创建人', isChecked: true},
			{name: 'updateTime', label: '更新时间', isChecked: true},
			{name: 'updator', label: '更新人', isChecked: true},
			{name: 'yn', label: '是否有效', isChecked: true}
		];

		// 获取商品列表
		$scope.getCommdityList = function() {
			$scope.goods = [];
			$scope.goods.meta = {
				pageSize: $scope.searchModel.pageSize || config.perPage
			};

			$http.post(config.basewms + 'baseinfo/query_goods_list/', {
				pageSize: $scope.goods.meta.pageSize,
				pageNo: $scope.searchModel.pageNo || 1
			})
			.success(function(data) {
				$scope.goods = data.records;
				$scope.goods.meta = {
						pageNo: data.pageNo ? data.pageNo : 1,
						recordsCount: data.recordsCount,
						pageNumber: data.pageNumber
					};
				});
		};

		// 新建产品
		$scope.newProduct = function(form) {
			$scope.resetForm(form);

			$scope.product = {
				product_code: $scope.guid(),
				creator: $scope.currentUser.account,
				updater: $scope.currentUser.account,
				yn: '1',
				details: []
			};

			$scope.getCommdityList();

			$newProduct.modal('show');

			$scope.commodity_filters = [
				{name: '商品编号', value: 0, input: true},
				{name: '商品名称', value: 1, input: true},
				{name: '商品类型', value: 1, subfilters: [{name: '教材(书籍)', value: 0}, {name: '音像制品(DVD/CD)', value: 1}, {name: '开具', value: 1}, {name: '其它', value: 1}]}
			];
		};

		// 保存产品
		$scope.saveProduct = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $newProduct)) return;

			if (!$scope.product.details.length) {
				$newProduct.modal('fail', '商品列表不能为空');
				return;
			}

			form.processing = true;
			$newProduct.modal('spinner');

			$http.post(config.basewms + 'baseinfo/product_define/', $scope.product)
				.success(function() {
					form.processing = false;
					$newProduct.modal('success');
					$scope.getProductList();
				})
				.error(function() {
					form.processing = false;
					$newProduct.modal('fail');
				});
		};

		// 获取产品列表
		$scope.getProductList = function() {
			$scope.products = [];
			$scope.products.meta = {
				pageSize: $scope.searchModel.pageSize || config.perPage
			};

			$http.post(config.basewms + 'baseinfo/query_product_list/', {
				pageSize: $scope.products.meta.pageSize,
				pageNo: $scope.searchModel.pageNo || 1
			})
			.success(function(data) {
				$scope.products = data.records;

				$scope.products.meta = {
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
				if (existGood.goods_code === good.goodsCode) {
					exists = true;
					return;
				}
			});

			if (!exists) {
				$newProduct.modal('info', '添加成功');
				$scope.product.details.push({
					goods_code: good.goodsCode,
					goods_name: good.goodsName,
					qty: '1',
					is_gift: '0'
				});
			} else {
				$newProduct.modal('info', '已经存在, 请勿重复添加');
			}
		};

		// 修改商品
		$scope.editGood = function(good, form) {
			$scope.resetForm(form);
			$scope.productGood = good;
			$scope.productTmpGood = angular.copy(good);
			$goodsDetails.modal('show');
		};

		// 保存商品详情
		$scope.saveGoodToProduct = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $goodsDetails)) return;
			$scope.productGood.qty = $scope.productTmpGood.qty;
			$scope.productGood.is_gift = $scope.productTmpGood.is_gift;
			$goodsDetails.modal('hide');
		};

		$scope.removeGood = function(index) {
			$scope.product.details.splice(index, 1);
		};

		$scope.getProductList();

		// inherit functions from parent
		$controller('ProductManager', {$scope: $scope});

	}]);
