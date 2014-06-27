'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', 'Resource',function ($scope, $state, $stateParams, Auth, Resource) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getUser();

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
	}

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

}])
