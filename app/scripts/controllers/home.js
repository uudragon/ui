'use strict';

angular.module('mainApp')
.controller('HomeCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}]);
