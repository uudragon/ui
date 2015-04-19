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
			$scope.agentsFormStatus = 'new';
			$scope.agent = {
				channelloginId: $scope.currentUser.id,
				channelLoginName: $scope.currentUser.name,
				agencyNo: $scope.guid(),
				// creator: $scope.currentUser.name,
				// updater: $scope.currentUser.name,
				agencyPassword: 111111
			};

			// $scope.agent = {
			// 	address: '123123adf夺',
			// 	agencyName: '你是谁',
			// 	agencyPhone: '13910121111',
			// 	channelloginId: $scope.currentUser.id,
			// 	channelLoginName: $scope.currentUser.name,
			// 	agencyNo: $scope.guid(),
			// 	agencyPassword: 111111,
			// 	city: '沈阳',
			// 	company: '圧',
			// 	contracts: [],
			// 	district: '和平区',
			// 	email: 'liadfajf@123.om',
			// 	fax: '123123',
			// 	fixedtelephone: '0532-22221111',
			// 	post: '123123',
			// 	province: '辽宁',
			// 	proxy_manager: '苛夺苛夺'
			// };

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
						$scope.getAgentsList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $agentsForm
				}));
		};


		// 修改代理商
		$scope.editAgent = function(agent, form) {
			$scope.agentsFormTitle = '修改代理商';
			$scope.agentsFormStatus = 'edit';
			$scope.agent = angular.copy(agent);
			$agentsForm.modal('show');
		};

		// 更新代理商
		$scope.updateAgent = function(form) {
			if (!$scope.validateForm(form, $agentsForm)) return;

			$scope.processing(form, $agentsForm);

			$http.post(config.agent + 'updateChannelAgency', $scope.agent)
				.success($scope.onFineAgent({
					form: form,
					$form: $agentsForm,
					action: function() {
						$scope.getAgentsList();
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
				agencyNo: agent.agencyNo
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

		// 添加合同
		$scope.addContract = function(form) {
			$scope.resetForm(form);
			form.step = 1;

			$scope.contract = {
				agencyNo: $scope.agent.agencyNo,
				contractId: $scope.guid(),
				// channelLoginName: $scope.currentUser.name,
				// creator: $scope.currentUser.name,
				// updater: $scope.currentUser.name,
				// agencyPassword: 111111,
				agencyAreaEntity: []
			};

			$contractForm.modal('show');
		};

		// 点击下一步
		$scope.saveContractPre = function(form) {
			if (!$scope.validateForm(form, $contractForm)) return;

			form.step = 2;
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
		$scope.search = $scope.baseSearch($scope, 'getAgentsList', 'searchModel');


		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}])
	.controller('Channel', ['$scope', '$controller', '$http',
		function ($scope, $controller, $http) {

		$('.article-header-search').stop().slideDown('fast');

		var $channelForm = $('#channels-form');

		// 搜索下拉
		$scope.filters = [
			{name: '合同编号', value: 'channelNo', input: true},
			{name: '合同姓名', value: 'channelName', input: true}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'channelNo', label: '渠道商编号', isChecked: true},
			{name: 'channelName', label: '渠道商姓名', isChecked: true},
			{name: 'channelLoginId', label: '登陆id', isChecked: true},
			{name: 'channelPhone', label: '渠道商手机', isChecked: true},
			{name: 'company', label: '渠道商公司', isChecked: true},
			{name: 'status', label: '状态', isChecked: true}
		];

		// 新建渠道商
		$scope.newChannel = function(form) {
			$scope.resetForm(form);
			$scope.channelsFormTitle = '新建渠道商';
			$scope.channelsFormStatus = 'new';
			$scope.channel = {
				channelNo: $scope.guid(),
				operator: $scope.currentUser.name,
				password: 111111
			};

			$channelForm.modal('show');
		};

		// 保存渠道商
		$scope.saveChannel = function(form) {
			if (!$scope.validateForm(form, $channelForm)) return;

			$scope.processing(form, $channelForm);

			$http.post(config.agent + 'saveChannelInfo', $scope.channel)
				.success($scope.onFineAgent({
					form: form,
					$form: $channelForm,
					action: function() {
						$scope.getChannelList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $channelForm
				}));
		};


		// 修改渠道商
		$scope.editChannel = function(channel, form) {
			$scope.channelsFormTitle = '修改渠道商';
			$scope.channelsFormStatus = 'edit';
			$scope.channel = angular.copy(channel);
			$channelForm.modal('show');
		};

		// 更新渠道商
		$scope.updateChannel = function(form) {
			if (!$scope.validateForm(form, $channelForm)) return;

			$scope.processing(form, $channelForm);

			$http.post(config.agent + 'updateChannelInfo', $scope.channel)
				.success($scope.onFineAgent({
					form: form,
					$form: $channelForm,
					action: function() {
						$scope.getChannelList();
					}
				}))
				.error($scope.onError({
					form: form,
					$form: $channelForm
				}));
		};

		// 获取代理商列表
		$scope.getChannelList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			return $http.post(config.agent + 'queryChannelInfoList', req)
				.success(function(data) {
					$scope.channels = data.records;
					$scope.channels.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getChannelList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getChannelList', 'searchModel');

		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}])
	.controller('Contract', ['$scope', '$controller', '$http',
		function ($scope, $controller, $http) {

		$('.article-header-search').stop().slideDown('fast');

		var $contractForm = $('#contract-details');

		// 搜索下拉
		$scope.filters = [
			{name: '代理商编号', value: 'agencyNo', input: true}
			// {name: '代理商姓名', value: 'agencyName', input: true},
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'contractId', label: '合同编号', isChecked: true},
			{name: 'contactsigntime', label: '签订时间', isChecked: true},
			// {name: 'contactstarttime', label: '开始时间', isChecked: true},
			{name: 'contactendime', label: '结束时间', isChecked: true},
			{name: 'agencyfees', label: '代理费', isChecked: true},
			{name: 'contacttype', label: '合同类型', isChecked: true}
		];

		// 查看合同
		$scope.showContract = function(contract) {
			$scope.contract = contract;
			$contractForm.modal('show');
		};

		// 获取合同列表
		$scope.getContractList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			return $http.post(config.agent + 'queryAgencyContactList', req)
				.success(function(data) {
					$scope.contracts = data.records;
					$scope.contracts.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getContractList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getContractList', 'searchModel');

		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}])
	.controller('Overview', ['$scope', '$controller', '$http',
		function ($scope, $controller, $http) {

		$('.article-header-search').stop().slideDown('fast');
		var $areaForm = $('#area-details');

		// 搜索下拉
		$scope.filters = [
			{name: '代理商编号', value: 'agencyNo', input: true},
			{name: '代理商姓名', value: 'agencyName', input: true},
			{name: '区域', addr: true}
		];

		// ths
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'contractId', label: '合同编号', isChecked: false},
			{name: 'agencyNo', label: '代理商编号', isChecked: true},
			{name: 'agencyName', label: '代理商姓名', isChecked: true},
			{name: 'agencyPhone', label: '代理商电话', isChecked: true},
			{name: 'province', label: '代理区域', isChecked: true}
		];

		// 获取合同列表
		$scope.getAreasList = function() {
			var req = {
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo || 1
			};

			$.extend(req, $scope.query);

			return $http.post(config.agent + 'queryAgencyAreaList', req)
				.success(function(data) {
					$scope.areas = data.records;
					$scope.areas.meta = {
							pageSize: data.pageSize,
							pageNo: data.pageNo ? data.pageNo : 1,
							recordsCount: data.recordsCount,
							pageNumber: data.pageNumber
						};
					});
		};

		$scope.getAreasList();

		// 搜索
		$scope.search = $scope.baseSearch($scope, 'getAreasList', 'searchModel');

		// inherit functions from parent
		$controller('AgentsCtrl', {$scope: $scope});

	}]);
