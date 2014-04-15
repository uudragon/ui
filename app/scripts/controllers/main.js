'use strict';

angular.module('mainApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = true;
	})

})
