'use strict';

angular.module('mainApp')
.controller('RebatesCtrl', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */
	.controller('Manager', ['$scope', '$controller', '$http', 'dialog',
		function ($scope, $controller, $http, dialog) {

		// 搜索下拉
		var $rebatesForm = $('#rebates-form');

		// 搜索下拉
		$scope.filters = [
			{name: '代理商姓名', value: 'agencyName', input: true},
			{name: '渠道经理', value: 'creator', input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'company', label: '公司名称', isChecked: true},
			{name: 'agencyName', label: '联系人姓名', isChecked: true},
			{name: 'agencyPhone', label: '联系手机', isChecked: true},
			{name: 'fixedtelephone', label: '固定电话', isChecked: true},
			{name: 'email', label: '邮箱', isChecked: true},
			{name: 'addr', label: '地址', isChecked: true},
			{name: 'fax', label: '传真', isChecked: false},
			{name: 'post', label: '邮编', isChecked: true},
			{name: 'rebateStatus', label: '渠道经理', isChecked: true}
		];

		$scope.subThs = [
			{name: 'orderNo', label: '订单编号', isChecked: true},
			{name: 'deliveryNo', label: '发货单编号', isChecked: true},
			{name: 'customerName', label: '客户姓名', isChecked: true},
			{name: 'contact', label: '联系方式', isChecked: true},
			{name: 'cardId', label: '返还账号', isChecked: true},
			{name: 'goodsAmount', label: '产品金额', isChecked: true},
			{name: 'rebateStatus', label: '返利状态', isChecked: true},
			{name: 'rebateAmount', label: '返款金额', isChecked: true}
		];

		// 维护返利信息
		$scope.manageRebatesInfo = function(agent, form) {

			var req = {
				pageSize: $scope.subSearchModel.pageSize || config.perPage,
				pageNo: $scope.subSearchModel.pageNo || 1,
				agencyNo: agent.agencyNo,
				rebateStatus: '2,3,4'
			};

			$http.post(config.agent + 'queryGoodsRebateApplyInfo', req)
				.success(function(data) {
					$scope.rebates = data.records;
					$rebatesForm.modal('show');
				});
		};

		// 获取选中的返利单
		$scope.getCheckedReates = function(status) {
			var rebates = [];

			angular.forEach($scope.rebates, function(rebate) {
				if (rebate.isChecked) rebates.push({
					goodsreBateNo: rebate.goodsreBateNo,
					operator: $scope.currentUser.userNo,
					rebateStatus: status
				});
			});

			return rebates;
		};


		// 更新单条返利信息的状态
		$scope.updateRebateStatus = function(rebate, status, form) {

			$scope.processing(form, $rebatesForm);

			$http.post(config.agent + 'batchupdateGoodsRebateApplyInfo', {
				records: [{
					goodsreBateNo: rebate.goodsreBateNo,
					operator: $scope.currentUser.userNo,
					rebateStatus: status
					}]
				})
				.success($scope.onFineAgent({
					form: form,
					$form: $rebatesForm,
					hide: false,
					action: function() {
						rebate.rebateStatus = status;
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $rebatesForm
				}));
		};

		// 批量更新
		$scope.batchUpdateRebates = function(status, form) {

			var rebates = $scope.getCheckedReates(status);

			if (!rebates.length) {
				dialog.info({text: '请至少选择一条记录!'});
				return;
			}

			$scope.processing(form, $rebatesForm);

			$http.post(config.agent + 'batchupdateGoodsRebateApplyInfo', {
					records: rebates
				}).success($scope.onFineAgent({
					form: form,
					$form: $rebatesForm,
					hide: false,
					action: function() {
						angular.forEach($scope.rebates, function(rebate) {
							rebate.isChecked && (rebate.rebateStatus = status);
						});
						$scope.getAgentsList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $rebatesForm
				}));
		};

		// 获取代理商列表
		$scope.getAgentsList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			return $http.post(config.agent + 'queryAgencyInfoList', req)
				.success(function(data) {
					$scope.agents = data.records;
					$scope.agents.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getAgentsList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getAgentsList', 'searchModel');


		// inherit functions from parent
		$controller('RebatesCtrl', {$scope: $scope});

	}])
	.controller('Invoice', ['$scope', '$controller', '$http', 'dialog',
		function ($scope, $controller, $http, dialog) {


		// 搜索下拉
		var $invoicesForm = $('#invoices-form');

		// 搜索下拉
		$scope.filters = [
			{name: '代理商姓名', value: 'agencyName', input: true},
			{name: '渠道经理', value: 'creator', input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'company', label: '公司名称', isChecked: true},
			{name: 'agencyName', label: '联系人姓名', isChecked: true},
			{name: 'agencyPhone', label: '联系手机', isChecked: true},
			{name: 'fixedtelephone', label: '固定电话', isChecked: true},
			{name: 'email', label: '邮箱', isChecked: true},
			{name: 'addr', label: '地址', isChecked: true},
			{name: 'fax', label: '传真', isChecked: false},
			{name: 'post', label: '邮编', isChecked: true},
			{name: 'rebateStatus', label: '渠道经理', isChecked: true}
		];

		$scope.subThs = [
			{name: 'agentNo', label: '代理商编号', isChecked: true},
			{name: 'applyNo', label: '申请编号', isChecked: true},
			{name: 'beginTime', label: '开始时间', isChecked: true},
			{name: 'endTime', label: '结束时间', isChecked: true},
			{name: 'amount', label: '发票金额', isChecked: true},
			{name: 'invoicehead', label: '发票抬头', isChecked: true},
			{name: 'applystatus', label: '申请状态', isChecked: true}
		];

		// 保存代理商
		$scope.saveAgent = function(form) {
			if (!$scope.validateForm(form, $invoicesForm)) return;

			$scope.processing(form, $invoicesForm);

			$http.post(config.agent + 'saveChannelAgency', $scope.agent)
				.success($scope.onFineAgent({
					form: form,
					$form: $invoicesForm,
					action: function() {
						$scope.getAgentsList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $invoicesForm
				}));
		};


		// 维护发票信息
		$scope.manageInvoiceInfo = function(agent, form) {

			var req = {
				pageSize: $scope.subSearchModel.pageSize || config.perPage,
				pageNo: $scope.subSearchModel.pageNo || 1,
				agencyNo: agent.agencyNo,
				applystatus: '1'
			};

			$http.post(config.agent + 'queryInitInvoiceApplyInfo', req)
				.success(function(data) {
					$scope.invoices = data.records;
					$invoicesForm.modal('show');
				});
		};

		// 获取选中的返利单
		$scope.getCheckedInvoices = function(status) {
			var invoices = [];

			angular.forEach($scope.invoices, function(rebate) {
				if (rebate.isChecked) invoices.push({
					agentNo: rebate.agentNo,
					applyNo: rebate.applyNo,
					operator: $scope.currentUser.userNo,
					applystatus: status
				});
			});

			return invoices;
		};


		// 更新单条返利信息的状态
		$scope.updateInvoiceStatus = function(rebate, status, form) {

			$scope.processing(form, $invoicesForm);

			$http.post(config.agent + 'batchUpdateInvoiceApplyInfo', {
				records: [{
					agentNo: rebate.agentNo,
					applyNo: rebate.applyNo,
					operator: $scope.currentUser.userNo,
					applystatus: status
					}]
				})
				.success($scope.onFineAgent({
					form: form,
					$form: $invoicesForm,
					hide: false,
					action: function() {
						rebate.applystatus = status;
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $invoicesForm
				}));
		};

		// 批量更新
		$scope.batchUpdateInvoices = function(status, form) {

			var invoices = $scope.getCheckedInvoices(status);

			if (!invoices.length) {
				dialog.info({text: '请至少选择一条记录!'});
				return;
			}

			$scope.processing(form, $invoicesForm);

			$http.post(config.agent + 'batchUpdateInvoiceApplyInfo', {
					records: invoices
				}).success($scope.onFineAgent({
					form: form,
					$form: $invoicesForm,
					hide: false,
					action: function() {
						angular.forEach($scope.invoices, function(rebate) {
							rebate.isChecked && (rebate.applystatus = status);
						});
						$scope.getAgentsList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $invoicesForm
				}));
		};

		// 获取代理商列表
		$scope.getAgentsList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			return $http.post(config.agent + 'queryAgencyInfoList', req)
				.success(function(data) {
					$scope.agents = data.records;
					$scope.agents.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getAgentsList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getAgentsList', 'searchModel');

		// inherit functions from parent
		$controller('RebatesCtrl', {$scope: $scope});

	}]);
