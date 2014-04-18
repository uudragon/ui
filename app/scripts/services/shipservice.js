'use strict';

angular.module('mainApp')
.service('ShipService', ['$http', function ShipService($http) {

	var baseurl = 'http://bam.uudragon.net/';

	/***************** 发货管理开始 ***********************/


	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 查询订单总数、销售总金额等
			case 'orderCountInfo':
				suffix = 'bam/shipment_queryOrderCount';
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
				suffix = 'bam/shipment_query';
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
		var suffix = 'bam/shipment_save';
		return $http.post(baseurl + suffix, model);
	}

	/***************** 发货管理结束 ***********************/

}])
