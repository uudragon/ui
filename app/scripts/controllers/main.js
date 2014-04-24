'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'Auth', '$http', 'md5', function ($scope, $state, $stateParams, Auth, $http, md5) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	$scope.date = new Date();
	$scope.currentUser = Auth.getCurrentUser();

}])
