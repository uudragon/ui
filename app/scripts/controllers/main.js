'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource', '$filter', function ($scope, $state, $stateParams, Auth, Resource, $filter) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getUser() || {};

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
		$('.article-header-search').toggle('fast');
	};

	// 新建工单
	$scope.globalNewOrder = function() {
		$scope.gbOrder = $scope.gbOrder || {};
		$scope.gbOrder.callTime = $filter('now')();
		$scope.gbOrder.responser = $scope.currentUser.name;
		$scope.gbOrder.responserNo = $scope.currentUser.userNo;
		$('#global-new-order').modal('show');
	};

	// 保存工单
	$scope.saveGlobalOrder = function() {
		console.log($scope.gbOrder);
		$('#global-new-order').modal('hide');
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
