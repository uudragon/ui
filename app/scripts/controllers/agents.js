'use strict';

angular.module('mainApp')
.controller('AgentsCtrl', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */
	.controller('Manage', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		// 搜索下拉
		var $agentsForm = $('#agents-form'),
			$pickgoodForm = $('#pickgood-form'),
			$pickgoodAmountForm = $('#pickgood-amount-form');

		// 搜索下拉
		$scope.filters = [
			{name: '库房编号', value: 'warehouse_code', input: true},
			// {name: '库房名称', value: 'warehouse_name', input: true},
			{name: '库房类型', value: 'type', subfilters: $scope.mapRevert('warehouse')},
			{name: '创建人', value: 'creator', input: true},
			{name: '修改人', value: 'updater', input: true},
			{name: '是否有效', value: 'yn', subfilters: [{name: '是', value: 1}, {name: '否', value: 0}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'warehouse_code', label: '库房编号', isChecked: true},
			{name: 'warehouse_name', label: '库房名称', isChecked: true},
			{name: 'address', label: '库房地址', isChecked: true},
			{name: 'type', label: '库房类型', isChecked: true},
			{name: 'creator', label: '创建人', isChecked: true},
			{name: 'create_time', label: '创建时间', isChecked: true},
			{name: 'updater', label: '修改人', isChecked: true},
			{name: 'update_time', label: '修改时间', isChecked: true},
			{name: 'yn', label: '是否生效', isChecked: true}
		];

		// 新建代理商
		$scope.newAgent = function(form) {
			$scope.resetForm(form);
			$scope.agentsFormTitle = '代理商录入';
			$scope.agent = {
				order_no: $scope.guid(),
				creator: $scope.currentUser.name,
				updater: $scope.currentUser.name,
				password: 111111
			};

			$agentsForm.modal('show');
		};

		// 保存代理商
		$scope.saveAgent = function(form) {
			if (!$scope.validateForm(form, $agentsForm)) return;

			$agentsForm.modal('hide');
		};

		// 编辑库房 && 复制添加库房
		$scope.editWarehouse = function(code, isDuplicate) {
			$scope.agentsFormTitle = isDuplicate ? '复制添加库房' : '编辑库房';

			$http.get(config.basewms + 'baseinfo/warehouse/' + code + '/')
				.success(function(warehouse) {
					$scope.warehouse = warehouse;
					$scope.warehouse.updater = $scope.currentUser.name;

					if (isDuplicate) {
						$scope.warehouse.warehouse_code = $scope.guid();
					}
					$agentsForm.modal('show');
				});
		};

		// 拣货
		$scope.pickProduct = function(warehouse_code) {

			$scope.pickInfo = {
				warehouse_code: warehouse_code
			};

			$scope.subSearchModel.pageNo = 1;

			$scope.getProductList()
				.success(function() {
					$pickgoodForm.modal('show');
				});
		};

		// 获取产品列表
		$scope.getProductList = function() {

			var req = {
				pageSize: $scope.subSearchModel.pageSize || config.perPage,
				pageNo: $scope.subSearchModel.pageNo || 1
			};

			return $http.post(config.basewms + 'baseinfo/query_product_list/', req)
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

		// 执行预拣货
		$scope.savePickProduct = function(product, form) {
			if (form.processing) return;

			$scope.processing(form, $pickgoodForm);

			$http.post(config.basewms + 'inner/' + $scope.pickInfo.warehouse_code + '/picking_statistic/', {
					product_code: product.product_code,
					updater: $scope.currentUser.account
				})
				.success($scope.onFine({
					form: form,
					$form: $pickgoodForm,
					hide: false,
					action: function(result) {
						if (result.picking_qty === 0) {
							$pickgoodForm.modal('info', '可拣货数为零, 不能执行拣货');

						} else {

							$scope.pickInfo = {
								product_code: product.product_code,
								max: result.picking_qty,
								picking_count: result.picking_qty,
								warehouse_code: $scope.pickInfo.warehouse_code,
								productName: product.product_name
							};

							$pickgoodAmountForm.modal('show');
						}
					}
				}))
				.error($scope.onError({form: form, $form: $pickgoodForm }));
		};

		// 保存调整拣货数
		$scope.tweakPickProduct = function(form) {
			if (!$scope.validateForm(form, $pickgoodAmountForm)) return;

			$scope.processing(form, $pickgoodAmountForm);

			$http.post(config.basewms + 'inner/' + $scope.pickInfo.warehouse_code + '/picking/', $scope.pickInfo)
				.success($scope.onFine({
					form: form,
					$form: $pickgoodAmountForm
				}))
				.error($scope.onError({form: form, $form: $pickgoodAmountForm }));
		};

		// 保存库房
		$scope.saveWarehouse = function(form) {
			// 表单验证
			if (!$scope.validateForm(form, $agentsForm)) return;

			$scope.processing(form, $agentsForm);

			$http.post(config.basewms + 'baseinfo/warehouse/save/', $scope.warehouse)
				.success($scope.successHandler(form, $agentsForm, $scope.getWarehouseList))
				.error($scope.errorHandler(form, $agentsForm));
		};

		// 搜索
		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getWarehouseList();
		};

		// 获取库房列表
		$scope.getWarehouseList = function() {

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			$http.post(config.basewms + 'baseinfo/warehouses/', req)
				.success(function(data) {
					$scope.warehouses = data.records;
					$scope.warehouses.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getWarehouseList();

		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}]);
