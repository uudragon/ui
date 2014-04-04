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

		$scope.search = function() {
			UUDBasicService.searchUsers($scope);
		}

		$scope.new = function() {
			$scope.modalTitle = "添加用户";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(user) {
			UUDBasicService.addUser(user)
			$scope.users.push(user)
			$('#uumodal').modal('hide')
		}

		$scope.delete = function(user, index) {
			UUDBasicService.deleteUser(user.id);
			$scope.users.splice(index, 1);
		}

		$scope.modify = function(user) {
			$scope.modalTitle = "编辑用户";
			$scope.modalType = "edit";
			$scope.model = angular.copy(user);
		}

		$scope.save = function(iuser) {

			UUDBasicService.updateUser(iuser)
			$scope.users.map(function(user, index) {
				if (user.id == iuser.id) {
					$scope.users[index] = iuser;
				}
			})
			$('#uumodal').modal('hide')
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
