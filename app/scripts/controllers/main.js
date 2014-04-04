'use strict';

angular.module('authApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	// UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = true;
	})

})
	.controller('LoginCtrl', function ($scope, UUDBasicService) {
		$scope.summit = function() {
			UUDBasicService.newCustomer($scope);
		}
	})

	.controller('UserCtrl', function ($scope, UUDBasicService) {

		UUDBasicService.loadUsers($scope);

		$scope.modify = function(index) {
			console.log(index);
		}

		$scope.delete = function(index) {
			console.log(index);
			// UUDBasicService.delete(index);
			$scope.users.splice(index, 1);
		}
	})

	.controller('UgroupCtrl', function ($scope) {

	})
	.controller('RoleCtrl', function ($scope) {

	})
	.controller('RgroupCtrl', function ($scope) {

	})
	.controller('PrivilegeCtrl', function ($scope) {

	})
