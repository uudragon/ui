'use strict';

angular.module('mainApp')
.service('BasicService', ['$http', function BasicService($http) {

	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		return $http.post(baseurl + 'basic_info', $scope.model);
	}


}]);
