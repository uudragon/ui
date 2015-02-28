'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource', '$filter', '$http',
function ($scope, $state, $stateParams, Auth, Resource, $filter, $http) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;
	$scope.date = new Date();

	// for debug
	$scope.currentUser = Auth.getUser();
	// $scope.currentUser = Auth.getUser() || {
	// 	account: 'admin',
	// 	birthday: '2014-04-02 00:00',
	// 	email: '1',
	// 	extension: null,
	// 	gender: 1,
	// 	groupId: null,
	// 	id: 1,
	// 	isRemoved: false,
	// 	isValid: true,
	// 	name: 'admin',
	// 	phone: '1',
	// 	positions: '1',
	// 	roleId: 234234,
	// 	seat: null,
	// 	userNo: '000010'
	// };

	$scope.searchModel = {
		filter: 0,
		subfilter: 0,
		keyword: ''
	};

	$scope.subSearchModel = {};

	$scope.print = function() {
		window.print();
	};

	// check is login
	$scope.$on('auth:invalid', function(e, d) {
		console.log('invalid');
		// Auth.logout();
	});

	$scope.logout = function() {
		Auth.logout();
	};

	// 解析filter成可用的json
	$scope.parseFilter = function(searchModel) {
		var query = {},
			value = $.trim(searchModel.subfilter);
		if (value.toString().length && searchModel.filter && searchModel.filter.value) {
			query[searchModel.filter.value] = value;
		}
		return query;
	};

	// 显示隐藏搜索框
	$scope.globalToggleSearch = function() {
		$('.article-header-search').stop().toggle('fast');
	};

	var $gbNewWorkform = $('#global-new-ticket');


	// 新建工单
	$scope.globalNewWorkForm = function(form) {
		$scope.gbWorkform = {
			create_time: $filter('now')(),
			user: $scope.currentUser.userNo
		};
		$scope.resetForm(form);
		$gbNewWorkform.modal('show');
	};

	// $scope.globalNewWorkForm();

	// 保存工单
	$scope.saveGlobalTicket = function(form) {
		// 表单验证
		if (!$scope.validateForm(form, $gbNewWorkform)) return;

		$scope.processing(form, $gbNewWorkform);

		$http.post(config.basews + 'workform', $scope.gbWorkform)
			.success($scope.successHandlerWs(form, $gbNewWorkform, $scope.gbWorkformCallback))
			.error($scope.errorHandler(form, $gbNewWorkform));
	};

	// 所有的全选逻辑
	$scope.toggleCheckAll = function(isAllCheckedFlag, allItems) {
		$scope[isAllCheckedFlag] = !$scope[isAllCheckedFlag];

		angular.forEach(allItems, function(item) {
			item.isChecked = $scope[isAllCheckedFlag];
		});
	};

	// 所有的全选逻辑 - 检查全选checkbox是否应该选上
	$scope.checkIsAllChecked = function(isAllCheckedFlag, allItems, currentItem) {
		currentItem.isChecked = !currentItem.isChecked;

		var isAllChecked = true;

		angular.forEach(allItems, function(item) {
			if (!item.isChecked) {
				isAllChecked = false;
				return false;
			}
		});

		$scope[isAllCheckedFlag] = isAllChecked;

	};

	// 更新表头显示内容
	$scope.chooseTh = function() {
		$('#table-ths').modal('show');
	};

	// 二级下拉选框，当第一次下拉选框变化时，第二次下拉选框默认选择第一项
	$scope.resetSubFilter = function() {
		if ($scope.searchModel && $scope.searchModel.filter) {
			if ($scope.searchModel.filter.input || $scope.searchModel.filter.datetime) {
				$scope.searchModel.subfilter = '';
			} else if ($scope.searchModel.filter.subfilters && $scope.searchModel.filter.subfilters.length){
				$scope.searchModel.subfilter = $scope.searchModel.filter.subfilters[0].value;
			}
		}
	};

	// 表格排序
	$scope.sortBy = function(name, type) {
		console.log('sort by:', name, type);
		console.log($scope.searchModel);
	};


	$scope.mapRevert = function(type) {
		var json = config.typeMap[type] || {},
			result = [];

		for (var key in json) {
			result.push({
				name: json[key],
				value: key
			});
		}

		result.sort(function(a, b) {
			return a.name - b.name;
		});

		return result;
	};

	// 表单相关
	// -----------------------------------------------------

	// 重置表单
	$scope.resetForm = function(form) {
		if (form) {
			form.$setPristine();
			form.$sumitted = false;
			form.processing = false;
		}
	};

	// 表单验证
	$scope.validateForm = function(form, $formModal, msg) {
		form.$sumitted = true;
		msg = msg || '表单填写有误';

		if (!form.$valid) {
			$formModal && $formModal.modal('fail', msg);
			return false;
		}

		return true;
	};

	// 生成编号
	$scope.guid = function() {
		return 'xxxxxxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8 );
			return v.toString(16);
		});
	};

	$scope.processing = function(form, $form) {
		form && (form.processing = true);
		$form && $form.modal('spinner');
	};

	$scope.successHandler = function(form, $form, action) {
		return function(data) {
			form.processing = false;
			$form.modal('success');
			angular.isFunction(action) && action(data);
		};
	};

	$scope.successHandlerWs = function(form, $form, action) {
		return function(status) {
			form.processing = false;
			if (status === 'true') {
				$form.modal('success');
				angular.isFunction(action) && action(status);
			} else {
				$form.modal('fail');
			}
		};
	};

	$scope.errorHandler = function(form, $form, action) {
		return function(data) {
			form.processing = false;
			$form.modal('fail');
			angular.isFunction(action) && action(data);
		};
	};

	$scope.onFineWs = function(params) {
		return function(status) {
			params.form && (params.form.processing = false);
			if (status === 'true') {
				params.$form && params.$form.modal('success', params.msg);
				angular.isFunction(params.action) && params.action(status);
			} else {
				params.$form && params.$form.modal('fail', params.errMsg);
			}
		};
	};

	$scope.onFine = function(params) {
		return function(data) {
			params.form && (params.form.processing = false);
			params.$form && params.$form.modal('success', {msg: params.msg, hide: params.hide});
			angular.isFunction(params.action) && params.action(data);
		};
	};

	$scope.onError = function(params) {
		return function(data) {
			params.form && (params.form.processing = false);
			params.$form && params.$form.modal('fail', params.msg);
			angular.isFunction(params.action) && params.action(data);
		};
	};

	// 搜索相关
	// -----------------------------------------------------

	$scope.baseSearch = function($scope, action) {
		return function() {
			$scope.query = $scope.parseFilter($scope.searchModel);
			$scope[action] && $scope[action]();
		};
	};

	// 获取选中的项目
	$scope.getSelectedItems = function(items, name) {
		$scope.selectedItems = [];
		angular.forEach(items, function(customer) {
			if (customer.isChecked) {
				var item = name ? customer[name] : customer;
				$scope.selectedItems.push(item);
			}
		});
		return $scope.selectedItems;
	};

}]);
