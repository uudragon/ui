'use strict';

angular.module('mainApp')
.service('Order', ['Restangular', function Order(Restangular) {
	return Restangular.service('order');
}]);
