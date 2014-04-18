'use strict';

angular.module('mainApp')

.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'BasicService', function ($scope, $state, $stateParams, BasicService) {

	BasicService.loadBasicInfo($scope)
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
				group: "admin"
			}
			$.extend($scope, dummydata);
		})

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

}])
