'use strict';

angular.module('mainApp')
.controller('ShipCtrl', ['$scope', 'ShipService', function ($scope, ShipService) {

	$scope.loadInfo = function(type) {
		if (!type) return;

		var success = function(data, status) {
			$scope.statistics = data;
		}

		var error = function(data, status) {
			console.log('query order info error status: ' + status + ' use dummy data');
			$scope.statistics = {ordersCount: 12345, salesAmount: 54321, accuOrdersCount: 12345678, accuSalesAmount: 87654321};
		}

		ShipService.loadInfo($scope.model, type)
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
				$scope.statistics = {ordersCount: 12345, salesAmount: 54321, accuOrdersCount: 12345678, accuSalesAmount: 87654321};
			})
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
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');
				$scope.result = [
					{orders_no: 'OD1001', shipment_no: 'FH1001', shipped_qty: 1, express_name: '顺风快递', create_time: '2014-04-11', update_time: '2014-04-12', courier: '张三', creater: 'Jack', status: '未发货'},
					{orders_no: 'OD1002', shipment_no: 'FH1002', shipped_qty: 2, express_name: '申通快递', create_time: '2014-04-11', update_time: '2014-04-12', courier: '李四', creater: 'Jack', status: '已发货' },
				];
			})
	}

	$scope.newShip = function() {

		ShipService.newShip($scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('shipment_save error status: ' + status);
			})
	}

	$scope.modify = function(scope, model, title) {
		scope.modalTitle = title;
		scope.modalType = "edit";
		scope.model = angular.copy(model);

		//获取发货主档和明细信息
		ShipService.getShipmentDetails(scope.model)
			.success(function(data, status){
				scope.shipmentDetails = data;
			})
			.error(function(data, status){
				console.log('get shipment details error, use dummy data');
				scope.shipmentDetails = [
					{goods_code: 'SP1001', goods_name: '商品1', goods_qty: 5, actual_qty: 4, goods_desc: '商品1描述'},
					{goods_code: 'SP1002', goods_name: '商品2', goods_qty: 5, actual_qty: 3, goods_desc: '商品2描述'}
				];
			})
	}

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ShipManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.ship.summary') ) {
			// 获取代理商排名等信息
			$scope.loadInfo('orderCountInfo');

		}

		// inherit functions from parent
		$controller('ShipCtrl', {$scope: $scope});

		$scope.modify = function(shipment) {
			$scope.$parent.modify($scope, shipment, "修改发货信息");
		}

	}])
