'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', function ($scope, $state, $stateParams, Auth) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getUser();

	$scope.range = function(n) {
		return new Array(n);
	};
	    
	$scope.$on('auth:invalid', function(e, d) {
		Auth.logout();
	})
}])
