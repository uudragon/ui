'use strict';

angular.module('mainApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		$http.post(baseurl + 'bam/basic_info.php', $scope.model)
		.success(function(data, status) {
			$scope.date = new Date();
			$.extend($scope, data);
		})
		.error(function(data, status) {
			// use dummy data for dev
			var dummydata = {
				date: new Date(),
				extension: 568459226,
				status: '已订购',
				seat: '001',
				timing: 1220,
				jobNumber: 12304,
				name: "肖锋",
				group: "管理员"
			}
			$.extend($scope, dummydata);
		})
	}


});
