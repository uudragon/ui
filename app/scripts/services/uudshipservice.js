'use strict';

angular.module('mainApp')
.service('UUDShipService', function UUDShipService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	/***************** 发货管理开始 ***********************/
	/**
	 * New Ship
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.newShip = function($scope) {
		var suffix = 'bam/ship_new';

		console.log($scope.model);
		$http.post(baseurl + suffix, $scope.model)
		.success(function(data, status) {
			return true;
		})
		.error(function(data, status) {
			console.log('new ship error status: ' + status);
			return false;
		})
	}
	/***************** 发货管理结束 ***********************/

});
