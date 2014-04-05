'use strict';

angular.module('authApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	// UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = true;

		// generte breadcrumb
		$scope.breadcrumb = [];

		var state = [];
		$routeSegment.chain.map(function(elem, index) {
			state.push(elem.name)
			var obj = UUDBasicService.getBreadcrumb(state.join('.'));
			if (obj) {
				$scope.breadcrumb.push(obj);
			}
		})
	})

})
	.controller('LoginCtrl', function ($scope, UUDBasicService) {
		$scope.summit = function() {
			UUDBasicService.newCustomer($scope);
		}
	})

	.controller('UserCtrl', function ($scope, UUDBasicService) {

		$scope.search = function() {
			UUDBasicService.search($scope, 'user')
		}

		$scope.new = function() {
			$scope.modalTitle = "添加用户";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(user) {
			UUDBasicService.add(user, 'user');

			$scope.users = $scope.users || [];
			$scope.users.push(user);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(user, index) {
			UUDBasicService.delete(user.id, 'user');
			$scope.users.splice(index, 1);
		}

		$scope.modify = function(user) {
			$scope.modalTitle = "编辑用户";
			$scope.modalType = "edit";
			$scope.model = angular.copy(user);
		}

		$scope.save = function(iuser) {

			UUDBasicService.update(iuser, 'user')
			$scope.users.map(function(user, index) {
				if (user.id == iuser.id) {
					$scope.users[index] = iuser;
				}
			})
			$('#uumodal').modal('hide')
		}

	})

	.controller('UgroupCtrl', function ($scope, UUDBasicService) {

		$scope.search = function() {
			UUDBasicService.searchGroups($scope);
		}

		$scope.new = function() {
			$scope.modalTitle = "添加用户";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(group) {
			UUDBasicService.addGroup(group);

			$scope.groups = $scope.groups || [];
			$scope.groups.push(group);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(group, index) {
			UUDBasicService.deleteGroup(group.id);
			$scope.groups.splice(index, 1);
		}

		$scope.modify = function(group) {
			$scope.modalTitle = "编辑用户";
			$scope.modalType = "edit";
			$scope.model = angular.copy(group);
		}

		$scope.save = function(igroup) {

			UUDBasicService.updateGroup(igroup)
			$scope.groups.map(function(group, index) {
				if (group.id == igroup.id) {
					$scope.users[index] = iuser;
				}
			})
			$('#uumodal').modal('hide')
		}

		$scope.view = function(id) {
			console.log(id);
		}
	})
		.controller('ShowGroupCtrl', function($scope, $routeParams, UUDBasicService){
			UUDBasicService.getGroupById($scope, $routeParams.id)

			$scope.delete = function($index) {
				$scope.group.users.splice($index, 1);
			}
			$scope.addToGroup = function() {
				$scope.group.users = $scope.group.users || [];
				$scope.group.users.push($scope.model);
				$scope.model = "";
			}
		})

	.controller('RoleCtrl', function ($scope, UUDBasicService) {
		$scope.search = function() {
			UUDBasicService.searchRoles($scope);
		}

		$scope.new = function() {
			$scope.modalTitle = "添加角色";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(role) {
			UUDBasicService.addRole(role);

			$scope.roles = $scope.roles || [];
			$scope.roles.push(role);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(role, index) {
			UUDBasicService.deleteRole(role.id);
			$scope.roles.splice(index, 1);
		}

		$scope.modify = function(role) {
			$scope.modalTitle = "编辑角色";
			$scope.modalType = "edit";
			$scope.model = angular.copy(role);
		}

		$scope.save = function(irole) {

			UUDBasicService.updateRole(irole)
			$scope.roles.map(function(role, index) {
				if (role.id == irole.id) {
					$scope.roles[index] = irole;
				}
			})
			$('#uumodal').modal('hide')
		}
	})
	.controller('RgroupCtrl', function ($scope) {

	})
	.controller('PrivilegeCtrl', function ($scope) {

	})
