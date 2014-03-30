'use strict';

angular.module('mainApp')
.controller('InfoCtrl', function ($scope, actionService, $http, $routeSegment, loader) {
	$scope.actions = actionService.actions('info');
	$scope.date = new Date()
	$scope.exNumber = '0012';

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;
	console.log($routeSegment);

	$scope.$on('routeSegmentChange', function() {
	    loader.show = false;
	})
	$scope.summit = function() {
		console.log($scope.model);
		$http.post('http://services.bam.uudragon.com', $scope.model)
		.success(function(data, status) {
			console.log(data);
		})
		.error(function(data, status) {
			console.log('error status:' + status);
		})
	}
})
.controller('CustomerCtrl', function ($scope, actionService, $routeSegment, loader) {
	$scope.actions = actionService.actions('customer');
	$scope.date = new Date()

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;
	console.log($routeSegment);

	$scope.$on('routeSegmentChange', function() {
	    loader.show = true;
	})
})
.controller('FinancialCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('AgentsCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('ShipCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('ProductionCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('LawCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('MainCtrl', function ($scope, $routeSegment, loader) {
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
	    loader.show = false;
	})
})
