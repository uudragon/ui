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

		$scope.search = function(param) {
			$scope.searchModel = $scope.searchModel || {};
			UUDBasicService.search($scope, 'user')
		}

		$scope.new = function() {
			$scope.modalTitle = "添加用户";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(user) {
			UUDBasicService.add(user, 'user');

			$scope.result = $scope.result || [];
			$scope.result.push(user);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(user, index) {
			UUDBasicService.delete(user.id, 'user');
			$scope.result.splice(index, 1);
		}

		$scope.modify = function(user) {
			$scope.modalTitle = "编辑用户";
			$scope.modalType = "edit";
			$scope.model = angular.copy(user);
		}

		$scope.save = function(iuser) {

			UUDBasicService.update(iuser, 'user')
			$scope.result.map(function(user, index) {
				if (user.id == iuser.id) {
					$scope.result[index] = iuser;
				}
			})
			$('#uumodal').modal('hide')
		}

	})

	.controller('UgroupCtrl', function ($scope, UUDBasicService) {

		$scope.search = function() {
			UUDBasicService.search($scope, 'userGroup')
		}

		$scope.new = function() {
			$scope.modalTitle = "添加用户";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(group) {
			UUDBasicService.add(group, 'userGroup');

			$scope.result = $scope.result || [];
			$scope.result.push(group);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(group, index) {
			UUDBasicService.delete(group.id, 'userGroup');
			$scope.result.splice(index, 1);
		}

		$scope.modify = function(group) {
			$scope.modalTitle = "编辑用户";
			$scope.modalType = "edit";
			$scope.model = angular.copy(group);
		}

		$scope.save = function(igroup) {

			UUDBasicService.update(igroup, 'userGroup')
			$scope.result.map(function(group, index) {
				if (group.id == igroup.id) {
					$scope.result[index] = igroup;
				}
			})
			$('#uumodal').modal('hide')
		}
	})
		.controller('ShowGroupCtrl', function($scope, $routeParams, UUDBasicService){
			UUDBasicService.loadById($scope, $routeParams.id, 'userGroup')

			$scope.delete = function($index) {
				$scope.model.users.splice($index, 1);
			}
			$scope.addToGroup = function() {
				$scope.model.users = $scope.model.users || [];
				$scope.model.users.push($scope.model.user);
				$scope.model.user = "";
			}
		})

	.controller('RoleCtrl', function ($scope, UUDBasicService) {
		$scope.search = function(param) {
			console.log(param);
			UUDBasicService.search($scope, 'role');
		}

		$scope.new = function() {
			$scope.modalTitle = "添加角色";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(role) {
			UUDBasicService.add(role, 'role');

			$scope.result = $scope.result || [];
			$scope.result.push(role);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(role, index) {
			UUDBasicService.delete(role.id, 'role');
			$scope.result.splice(index, 1);
		}

		$scope.modify = function(role) {
			$scope.modalTitle = "编辑角色";
			$scope.modalType = "edit";
			$scope.model = angular.copy(role);
		}

		$scope.save = function(irole) {

			UUDBasicService.update(irole, 'role')
			$scope.result.map(function(role, index) {
				if (role.id == irole.id) {
					$scope.result[index] = irole;
				}
			})
			$('#uumodal').modal('hide')
		}
	})
	.controller('RgroupCtrl', function ($scope, UUDBasicService) {
		$scope.search = function() {
			UUDBasicService.search($scope, 'roleGroup')
		}

		$scope.new = function() {
			$scope.modalTitle = "添加组";
			$scope.modalType = "add";
			$scope.model = {};
		}

		$scope.add = function(group) {
			UUDBasicService.add(group, 'roleGroup');

			$scope.result = $scope.result || [];
			$scope.result.push(group);
			$('#uumodal').modal('hide');
		}

		$scope.delete = function(group, index) {
			UUDBasicService.delete(group.id, 'roleGroup');
			$scope.result.splice(index, 1);
		}

		$scope.modify = function(group) {
			$scope.modalTitle = "编辑组";
			$scope.modalType = "edit";
			$scope.model = angular.copy(group);
		}

		$scope.save = function(igroup) {

			UUDBasicService.update(igroup, 'roleGroup')
			$scope.result.map(function(group, index) {
				if (group.id == igroup.id) {
					$scope.result[index] = igroup;
				}
			})
			$('#uumodal').modal('hide')
		}
	})
		.controller('ShowRoleCtrl', function($scope, $routeParams, UUDBasicService){
			UUDBasicService.loadById($scope, $routeParams.id, 'roleGroup')

			$scope.delete = function($index) {
				$scope.model.users.splice($index, 1);
			}
			$scope.addToGroup = function() {
				$scope.model.users = $scope.model.users || [];
				$scope.model.users.push($scope.model.user);
				$scope.model.user = "";
			}
		})
	.controller('PrivilegeCtrl', function ($scope) {

	})
