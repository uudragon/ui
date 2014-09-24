'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource',function ($scope, $state, $stateParams, Auth, Resource) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getUser();

	$scope.searchModel = {};

	$scope.range = function(n) {
		return new Array(n);
	};

	$scope.$on('auth:invalid', function(e, d) {
		Auth.logout();
	})

	var resetForm = function(form) {
		$scope.model = {};
		form.$setPristine();
		$scope.submitted = false;
	};

	// load records or statistics
	$scope.load = function(type, keyname, errorCallBack, successCallBack) {
		Resource.load($scope.model, type)
			.success(function(data, status) {

				if (keyname) {
					$scope[keyname] = data;
				} else {
					$scope.statistics = data;
				}
				// success call back
				if (angular.isFunction(successCallBack)) {
					successCallBack();
				}
			})
			.error(config.errorLog('load', type, errorCallBack))
	}

	$scope.reloadSearch = function(type) {
		$scope.result = [];
		$scope.search(type);
	}

	// 搜索
	$scope.search = function (type, keyname) {
		Resource.search($scope.searchModel, type)
			.success(function(data, status) {
				if (keyname) {
					$scope[keyname] = data;
				} else {
					$scope.result = data;
				}
			})
			.error(config.errorLog('search', type))
	}

	$scope.createNew = function(form) {
		$scope.submitted = true;
		if (!form.$valid) return;
		Resource.createNew($scope.model, $scope.objType)
			.success(function(data, status) {
				if (data.success) {
					// 成功保存
					resetForm(form);
				} else {
					// 保存失败
				}
			})
			.error(config.errorLog('new', 'customer'))
	}

	$scope.save = function(model) {
		Resource.save(model, $scope.objType)
			.success(function(data, status) {

			})
			.error(function(data, status) {

			})
		$('#uumodal').modal('hide');
	}

	// fake date
	$scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '0', createTime: '2014-10-15', contactTimes: '15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', orderType: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '5'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '4'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '11'}, ];

	$scope.toggleCheckAll = function() {
		$scope.isAllChecked = !$scope.isAllChecked;

		angular.forEach($scope.orders, function(item) {
			item.isChecked = $scope.isAllChecked;
		});
	}

	$scope.checkIsAllChecked = function(order) {
		order.isChecked = !order.isChecked;
		var isAllChecked = true;

		angular.forEach($scope.orders, function(item) {
			if (!item.isChecked) {
				isAllChecked = false;
				return false;
			}
		});

		$scope.isAllChecked = isAllChecked;

	}

}])
