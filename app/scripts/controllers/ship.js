'use strict';

angular.module('mainApp')
.controller('ShipCtrl', function ($scope, ShipService) {
	// UUDShipService.queryShip($scope);

	ShipService.queryOrderCount($scope.model)
		.success(function(data, status) {
			$scope.order = data;
		})
		.error(function(data, status) {
			console.log('shipment_queryOrderCount error status: ' + status);
			$scope.order = {
				ordersCount: 523231231,
				salesAmount: 12321,
				accuOrdersCount: 12321,
				accuSalesAmount: 12321
			}
		})

	$scope.queryShip = function() {

		ShipService.queryShip($scope.model)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('shipment_query error status: ' + status);
				$scope.result = [{"id":8,"orders_no":"OD1001","shipment_no":"FH1001","shipped_qty":1,"express_code":1,"express_name":"test name","express_orders_no":"bbbbbb","express_cost":20,"courier":"obama","courier_tel":"13800138000","create_time":"2014-04-11","creater":"jack","update_time":"2014-04-09","updater":null,"yn":0},{"id":10,"orders_no":"OD1002","shipment_no":"FH1002","shipped_qty":1,"express_code":1,"express_name":"如风达快递","express_orders_no":"bbbbbb","express_cost":20,"courier":"obama","courier_tel":"13800138000","create_time":"2014-04-15","creater":"jack","update_time":"2014-04-15","updater":null,"yn":0}];
			})

	}

	$scope.newShip = function() {

		ShipService.newShip($scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('shipment_save error status: ' + status);
				return false;
			})
	}
})
