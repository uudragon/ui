'use strict';

angular.module('mainApp')
.service('ShipService', ['$http', function ShipService($http) {

	/***************** 发货管理开始 ***********************/


	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 查询订单总数、销售总金额等
			case 'orderCountInfo':
				suffix = 'shipment_queryOrderCount';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}

	this.search = function(model, type) {
		var suffix;
		console.log(model);
		switch (type) {
			// 查询发货单
			case 'ship':
				suffix = 'shipment_query';
				break;

			default: break;

		}

		return $http.post(baseurl + suffix, model);
	}



	/**
	 * New Ship
	 *
	 */
	this.newShip = function(model) {
		var suffix = 'shipment_save';
		return $http.post(baseurl + suffix, model);
	}

	/**
	 * 获取发货主档和明细信息
	 *
	 * @param  object shipment_no
	 * @return shipment details
	 */
	 this.getShipmentDetails = function(model) {
	 	var suffix = "shipment_getDetails";
	 	return $http.post(baseurl + suffix, model);
	 }

	/***************** 发货管理结束 ***********************/

}])
