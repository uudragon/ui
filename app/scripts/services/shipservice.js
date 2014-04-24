'use strict';

angular.module('mainApp')
.service('ShipService', ['$http', 'PostService', function ShipService($http, PostService) {

	/***************** 发货管理开始 ***********************/

	var baseurl = config.baseurl;

	this.loadInfo = function(model, type) {
		var suffix;

		switch (type) {
			// 查询订单总数、销售总金额等
			case 'shipment_statistics':
				suffix = 'shipment_statistics';
				break;

			// 获取发货主档和明细信息
			case 'ship_details':
				suffix = 'ship_details_statistics';
				break;

			default: break;

		}
		return PostService.post(baseurl + suffix, model);
	}

	this.search = function(model, type) {
		var suffix;

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


	/***************** 发货管理结束 ***********************/

}])
