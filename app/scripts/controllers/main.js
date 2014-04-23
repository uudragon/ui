'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'BasicService', '$http', 'md5', function ($scope, $state, $stateParams, BasicService, $http, md5) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;
}])
