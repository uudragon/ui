'use strict';

angular.module('mainApp')
.controller('InfoCtrl', function ($scope, UUDInfoService) {
	$scope.summit = function() {
		UUDInfoService.newCustomer($scope);
	}
})
	.controller('TradedCtrl', function ($scope, UUDInfoService) {
		UUDInfoService.loadCustomer($scope);
	})
