'use strict';

angular.module('mainApp')
.controller('AgentsCtrl', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */
	.controller('Manage', ['$scope', '$controller', '$http',
		function ($scope, $controller, $http) {

		// 搜索下拉
		var $agentsForm = $('#agents-form'),
			$contractForm = $('#contract-form'),
			$contractFormDetails = $('#contract-form-details'),
			$pickgoodAmountForm = $('#pickgood-amount-form');

		// 搜索下拉
		$scope.filters = [
			{name: '代理商姓名', value: 'warehouse_code', input: true},
			{name: '渠道经理', value: 'creator', input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'company', label: '公司名称', isChecked: true},
			{name: 'agencyName', label: '联系人姓名', isChecked: true},
			{name: 'agencyPhone', label: '联系手机', isChecked: true},
			{name: 'proxy_manager', label: '渠道经理', isChecked: true},
			{name: 'fixedtelephone', label: '固定电话', isChecked: true},
			{name: 'email', label: '邮箱', isChecked: true},
			{name: 'addr', label: '地址', isChecked: true},
			{name: 'fax', label: '传真', isChecked: true},
			{name: 'post', label: '邮编', isChecked: true}
		];

		// 新建代理商
		$scope.newAgent = function(form) {
			$scope.resetForm(form);
			$scope.agentsFormTitle = '新建代理商';
			$scope.agent = {
				channelloginId: $scope.currentUser.id,
				channelLoginName: $scope.currentUser.name,
				agencyNo: $scope.guid(),
				// creator: $scope.currentUser.name,
				// updater: $scope.currentUser.name,
				agencyPassword: 111111,
				contracts: []
			};

			$agentsForm.modal('show');
		};

		// 修改代理商
		$scope.editAgent = function(agent, form) {
			$scope.agentsFormTitle = '修改代理商';
			$scope.agent = angular.copy(agent);
			$scope.tmpAgent = agent;
			$agentsForm.modal('show');
		};

		// 保存代理商
		$scope.saveAgent = function(form) {
			if (!$scope.validateForm(form, $agentsForm)) return;

			$scope.processing(form, $agentsForm);

			$http.post(config.agent + 'saveChannelAgency', $scope.agent)
				.success($scope.onFineAgent({
					form: form,
					$form: $agentsForm,
					action: function() {
						$scope.tmpAgent = agent;
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $agentsForm
				}));
		};

		// 维护合同信息
		$scope.manageContact = function(agent) {
			$scope.agent = agent;

			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1,
				agencyloginId: agent.agencyloginId
			};

			$http.post(config.agent + 'queryAgencyContactList', req)
				.success(function(data) {
					$scope.contracts = data.records;
					$contractFormDetails.modal('show');
				});
		};

		// 获取代理商列表
		$scope.getAgentsList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

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

		// 添加合同
		$scope.addContract = function(form) {
			$scope.resetForm(form);
			$scope.contract = {
				agencyLoginId: $scope.agent.agencyPhone,
				contractId: $scope.guid(),
				// channelLoginName: $scope.currentUser.name,
				// creator: $scope.currentUser.name,
				// updater: $scope.currentUser.name,
				// agencyPassword: 111111,
				agencyAreaEntity: []
			};

			console.log($scope.contract);

			$contractForm.modal('show');
		};

		// 保存合同
		$scope.saveContract = function(form) {
			if (!$scope.validateForm(form, $contractForm)) return;

			$scope.processing(form, $contractForm);

			$http.post(config.agent + 'saveAgencyContact', $scope.contract)
				.success($scope.onFineAgent({
					form: form,
					$form: $contractForm,
					action: function() {
						$scope.contracts.push($scope.contract);
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $contractForm
				}));

		};

		// 删除合同
		$scope.removeContract = function(index) {
			$scope.agent.contracts.splice(index, 1);
		};

		// 添加代理区域
		$scope.addProxyArea = function(contract) {
			$scope.contract.agencyAreaEntity.push({
				areaId: $scope.guid()
			});
		};

		// 删除代理区域
		$scope.removeProxyArea = function(contract, index) {
			$scope.contract.agencyAreaEntity.splice(index, 1);
		};

		// 搜索
		$scope.search = function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope.getWarehouseList();
		};

		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}]);
