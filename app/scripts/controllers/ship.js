'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'ship';

	$scope.modify = function(model, title) {
		$scope.modalTitle = title;
		$scope.modalType = "edit";
		$scope.model = angular.copy(model);

		var errorCallBack = function() {
			$scope.shipmentDetails = [
				{goods_code: 'SP1001', goods_name: '商品1', goods_qty: 5, actual_qty: 4, goods_desc: '商品1描述'},
				{goods_code: 'SP1002', goods_name: '商品2', goods_qty: 5, actual_qty: 3, goods_desc: '商品2描述'}
			];
		}

		//获取发货主档和明细信息
		$scope.load('ship_details', 'shipmentDetails', errorCallBack);
	}

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ShipManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.ship.summary') ) {
			// 获取代理商排名等信息
			$scope.load('shipment_statistics');
		}

		// inherit functions from parent
		$controller('ShipCtrl', {$scope: $scope});

	}])
