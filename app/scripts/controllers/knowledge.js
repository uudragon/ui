'use strict';

angular.module('mainApp')
.controller('KnowledgeCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */


	.controller('KnowledgeManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('KnowledgeCtrl', {$scope: $scope});

	}])
	.controller('Presale', ['$scope', '$controller', 'Restangular', '$http', function ($scope, $controller, Restangular, $http) {

		var $knowlegeForm = $('#knowlege-form');

		// 搜索下拉
		$scope.filters = [{name: '任意字段', value: 0}, {name: '标题', value: 1}];
		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'subject', label: '标题', isChecked: true},
			{name: 'content', label: '内容', isChecked: true},
			{name: 'author', label: '作者', isChecked: true},
			{name: 'category', label: '分类', isChecked: true, sortable: true},
			{name: 'pv', label: '点击数', isChecked: true},
			{name: 'updateTime', label: '更新时间', isChecked: true, sortable: true}
		];

		var Knowledge = Restangular.all('knowledgeBase');

		// 获取知识库列表
		$scope.getKnowlegeList = function() {
			$scope.knowledges = Knowledge.getList({
				pageSize: $scope.searchModel.pageSize || config.perPage,
				pageNo: $scope.searchModel.pageNo
			}).$object;
		};

		$scope.getKnowlegeList();

		$scope.newKnowledge = function(form) {
			form.$setPristine();
			form.$sumitted = false;
			$scope.knowlege = {};
			$scope.formStatus = 'new';
			$knowlegeForm.modal('show');
		};

		$scope.editKnowledge = function(knowledge) {
			$scope.knowlege = angular.copy(knowledge);
			$scope.formStatus = 'update';
			$knowlegeForm.modal('show');
		};

		$scope.deleteKnowledge = function(knowledge) {
			knowledge.doDELETE().then(function(status) {
				status === 'true' && $scope.getKnowlegeList();
			});
		};

		$scope.viewKnowledge = function(knowlege) {
			Knowledge.get(knowlege.id).then(function(knowlege) {
				$scope.formStatus = 'view';
				$scope.knowlege = knowlege;
				$knowlegeForm.modal('show');
			});
		};

		$scope.updateKnowledge = function(form) {
			// 触发表单验证
			form.$sumitted = true;

			if (!form.$valid) {
				$knowlegeForm.modal('fail', '表单填写有误');
				return;
			}

			$knowlegeForm.modal('spinner');
			$http.put(config.baseurl + 'knowledgeBase', $scope.knowlege)
				.success(function(status) {
					if (status === 'true') {
						$knowlegeForm.modal('success');
						$scope.getKnowlegeList();
					} else {
						$knowlegeForm.modal('fail');
					}
				})
				.error(function() {
					$knowlegeForm.modal('fail');
				});
			$knowlegeForm.modal('show');
		};

		$scope.saveKnowledge = function(form) {
			// 触发表单验证
			form.$sumitted = true;

			if (!form.$valid) {
				$knowlegeForm.modal('fail', '表单填写有误');
				return;
			}

			$scope.knowlege.type = 1;
			$scope.knowlege.creater = $scope.currentUser.userNo;

			$knowlegeForm.modal('spinner');
			$http.post(config.baseurl + 'knowledgeBase', $scope.knowlege)
				.success(function(status) {
					if (status === 'true') {
						$knowlegeForm.modal('success');
						$scope.getKnowlegeList();
					} else {
						$knowlegeForm.modal('fail');
					}
				})
				.error(function() {
					$knowlegeForm.modal('fail');
				});
		};

		// inherit functions from parent
		$controller('KnowledgeManager', {$scope: $scope});

	}])
	.controller('Aftersale', ['$scope', '$controller', function ($scope, $controller) {



		// inherit functions from parent
		$controller('KnowledgeManager', {$scope: $scope});

	}])
	.controller('QA', ['$scope', '$controller', function ($scope, $controller) {



		// inherit functions from parent
		$controller('KnowledgeManager', {$scope: $scope});

	}]);
