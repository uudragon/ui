'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource', '$filter', '$http',
function ($scope, $state, $stateParams, Auth, Resource, $filter, $http) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	// for debug
	$scope.currentUser = Auth.getUser() || {
		account: 'admin',
		birthday: '2014-04-02 00:00',
		email: '1',
		extension: null,
		gender: 1,
		groupId: null,
		id: 1,
		isRemoved: false,
		isValid: true,
		name: 'admin',
		phone: '1',
		positions: '1',
		roleId: null,
		seat: null,
		userNo: '000010'
	};

	$scope.searchModel = {
		filter: 0,
		subfilter: 0,
		keyword: ''
	};

	$scope.print = function() {
		window.print();
	};

	// check is login
	$scope.$on('auth:invalid', function(e, d) {
	// 	Auth.logout();
	});

	$scope.logout = function() {
		Auth.logout();
	};

	var resetForm = function(form) {
		$scope.model = {};
		form.$setPristine();
		$scope.submitted = false;
	};

	// 显示隐藏搜索框
	$scope.globalToggleSearch = function() {
		$('.article-header-search').stop().toggle('fast');
	};

	// 新建工单
	$scope.globalNewOrder = function() {
		$scope.gbOrder = {};
		$('#global-new-order').modal('show');
	};

	// $scope.globalNewOrder();

	// 保存工单
	$scope.saveGlobalOrder = function(gbOrder, form) {
		form.$setDirty(true);
		if (!form.$valid) return;

		var staticOrderDetails = {
			orders_no: '112312',
			product_no: '313213',
			effective: '2014-12-25',
			qty: '2',
			bulk: '123',
			weight: '12321',
			status: '1',
			yn: '1'
		};
		var staticCustomer = {
			code: '123123',
			type: '1',
			name: '客户姓名',
			sex: '1',
			birthday: '2014-12-25',
			child: '孩子姓名',
			c_sex: '1',
			email: '12321@sadfa.com',
			province: '山东',
			city: '青岛',
			district: '12321',
			street: '街道',
			address: '详细地址',
			post: '123123',
			phone: '123123',
			main_phone: '123123123',
			fax: '123123123',
			status: '1',
			creator: '1',
			updater: '1',
			yn: '1'
		};
		gbOrder.customer = staticCustomer;
		gbOrder.details = [staticOrderDetails];
		$http.post(config.baseurl + 'order', gbOrder)
			.success(function(status) {
				form.$setPristine();
				status === 'true' && $('#global-new-order').modal('hide');
			});
	};

	// 新建订单
	$scope.globalNewTicket = function() {
		$scope.gbTicket = $scope.gbTicket || {};
		$scope.gbTicket.create_time = $filter('now')();
		$scope.gbTicket.update_time = $scope.gbTicket.create_time;
		$('#global-new-ticket').modal('show');
	};

	// 保存订单
	$scope.saveGlobalTicket = function() {
		console.log($scope.gbTicket);
		$('#global-new-ticket').modal('hide');
		$scope.gbTicket = {};
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

}]);
