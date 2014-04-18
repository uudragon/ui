'use strict';

angular.module('mainApp')
.service('BasicService', ['$http', function BasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		return $http.post(baseurl + 'bam/basic_info.php', $scope.model);
	}


}]);
