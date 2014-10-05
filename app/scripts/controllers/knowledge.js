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
	.controller('Presale', ['$scope', '$controller', function ($scope, $controller) {

		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: 'subject', label: '标题', isChecked: true},
			{name: 'content', label: '内容', isChecked: true},
			{name: 'author', label: '作者', isChecked: true},
			{name: 'category', label: '分类', isChecked: true, sortable: true},
			{name: 'pv', label: '点击数', isChecked: true},
			{name: 'updateTime', label: '更新时间', isChecked: true, sortable: true}
		];

		$scope.knowledges = [
			{
				subject: '12312',
				content: '12312',
				author: '12312',
				category: '12312',
				pv: '12312',
				updateTime: '12312'
			}
		];

		$scope.newKnowledge = function() {
			$('#new-knowlege').modal('show');
		}

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
