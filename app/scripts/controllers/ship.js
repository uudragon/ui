'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', 'ShipService', function ($scope, ShipService) {

	$scope.loadInfo = function(type) {
		if (!type) return;

		ShipService.loadInfo($scope.model, type)
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(config.errorLog('load', type))
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;

		// var fakeData = {
		// 	'YN':0
		// }
		// $.extend($scope.searchModel, fakeData);

		ShipService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(config.errorLog('search', type))
	}


	$scope.modify = function(model, title) {
		$scope.modalTitle = title;
		$scope.modalType = "edit";
		$scope.model = angular.copy(model);

		//获取发货主档和明细信息
		ShipService.loadInfo($scope.model, 'ship_details')
			.success(function(data, status){
				$scope.shipmentDetails = data;
			})
			.error(function(data, status) {
				$scope.shipmentDetails = [
					{goods_code: 'SP1001', goods_name: '商品1', goods_qty: 5, actual_qty: 4, goods_desc: '商品1描述'},
					{goods_code: 'SP1002', goods_name: '商品2', goods_qty: 5, actual_qty: 3, goods_desc: '商品2描述'}
				];
			})
	}


	$scope.save = function(model) {
		ShipService.save(model)
			.success(function(data, status) {

			})
			.error(function(data, status) {
				
			})
		$('#uumodal').modal('hide');
	}

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ShipManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.ship.summary') ) {
			// 获取代理商排名等信息
			$scope.loadInfo('shipment_statistics');
		}

		// inherit functions from parent
		$controller('ShipCtrl', {$scope: $scope});

	}])
