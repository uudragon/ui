'use strict';

angular.module('mainApp')
.controller('ProductCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ProductManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('ProductCtrl', {$scope: $scope});

	}])
	.controller('Commodity', ['$scope', '$controller', function ($scope, $controller) {

		// 搜索下拉
		$scope.filters = [
			{name: '商品编号', value: 0, input: true},
			{name: '商品名称', value: 1, input: true},
			{name: '商品类型', value: 1, subfilters: [{name: '教材(书籍)', value: 0}, {name: '音像制品(DVD/CD)', value: 1}, {name: '开具', value: 1}, {name: '其它', value: 1}]},
			{name: '是否有效', value: 2, subfilters: [{name: '是', value: 0}, {name: '否', value: 1}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: '', label: '商品编号', isChecked: true},
			{name: '', label: '商品名称', isChecked: true},
			{name: '', label: '商品类型', isChecked: true},
			{name: '', label: '商品价格', isChecked: true},
			{name: '', label: '商品体积', isChecked: true},
			{name: '', label: '商品重量', isChecked: true},
			{name: '', label: '商品规格', isChecked: true},
			{name: '', label: 'ISBN号', isChecked: true},
			{name: '', label: '生产时间', isChecked: true},
			{name: '', label: '商品描述', isChecked: true},
			{name: '', label: '是否有效', isChecked: true},
			{name: '', label: '操作员', isChecked: true}
		];

		// inherit functions from parent
		$controller('ProductManager', {$scope: $scope});

	}])
	.controller('Goods', ['$scope', '$controller', function ($scope, $controller) {

		// 搜索下拉
		$scope.filters = [
			{name: '产品编号', value: 0, input: true},
			{name: '产品名称', value: 1, input: true},
			{name: '是否有效', value: 2, subfilters: [{name: '是', value: 0}, {name: '否', value: 1}]}
		];

		// ths
		$scope.isAllThsShow = true;
		$scope.ths = [
			{name: '', label: '产品编号', isChecked: true},
			{name: '', label: '产品名称', isChecked: true},
			{name: '', label: '产品说明', isChecked: true},
			{name: '', label: '创建时间', isChecked: true},
			{name: '', label: '创建人', isChecked: true},
			{name: '', label: '更新时间', isChecked: true},
			{name: '', label: '更新人', isChecked: true},
			{name: '', label: '是否有效', isChecked: true}
		];

		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		// inherit functions from parent
		$controller('ProductManager', {$scope: $scope});

	}]);
