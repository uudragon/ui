'use strict';

angular.module('mainApp')
.service('ShipService', function ShipService($http) {

	var baseurl = 'http://bam.uudragon.net/';

	/***************** 发货管理开始 ***********************/

	/**
	 * 查询订单总数、销售总金额等
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.queryOrderCount = function(model) {
		var suffix = 'bam/shipment_queryOrderCount';
		return $http.post(baseurl + suffix, model);
	}


	/**
	 * New Ship
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newShip = function(model) {
		var suffix = 'bam/shipment_save';
		return $http.post(baseurl + suffix, model);
	}

	/**
	 * 查询发货单
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.queryShip = function(model) {
		console.log(model);
		var suffix = 'bam/shipment_query';
		return $http.post(baseurl + suffix, model);
	}
	/***************** 发货管理结束 ***********************/

})
