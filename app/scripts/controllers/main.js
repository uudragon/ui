'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource', '$filter', function ($scope, $state, $stateParams, Auth, Resource, $filter) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getUser();

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
		Auth.logout();
	});

	var resetForm = function(form) {
		$scope.model = {};
		form.$setPristine();
		$scope.submitted = false;
	};

	// 新建工单
	$scope.globalNewOrder = function() {
		$scope.gbOrder = $scope.gbOrder || {};
		$scope.gbOrder.callTime = $filter('now')();
		$scope.gbOrder.responser = $scope.currentUser;
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

	// fake date
	$scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '0', checkStatus: '0', createTime: '2014-10-15', contactTimes: '15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', orderType: '季度', payStatus: '1', checkStatus: '1', createTime: '2014-11-15', contactTimes: '5'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', checkStatus: '2', createTime: '2014-10-15', contactTimes: '4'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', checkStatus: '3', createTime: '2014-10-15', contactTimes: '11'}, ];

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
