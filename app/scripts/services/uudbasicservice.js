'use strict';

angular.module('authApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

	this.getBreadcrumb = function(route) {

		var breadcrumb = {
			'root' : {href: '', label: '首页'},
			'root.login' : {href: 'login', label: 'login'},
			'root.user' : {href: 'user', label: '用户管理'},
			'root.ugroup' : {href: 'user-group', label: '用户组管理'},
			'root.ugroup.show' : {href: '', label: '用户组查看'},
			'root.role' : {href: 'role', label: '角色管理'},
			'root.rgroup' : {href: 'role-group', label: '角色组管理'},
			'root.privilege' : {href: 'privilege', label: '权限管理'}
		}

		return breadcrumb[route];

	}


	// Load Top Header Info
	this.loadBasicInfo = function($scope) {

		$http.post(baseurl + 'bam/basic_info.php', $scope.model)
		.success(function(data, status) {
			$scope.date = new Date();
			$.extend($scope, data);
		})
		.error(function(data, status) {
			// use dummy data for dev
			var dummydata = {
				date: new Date(),
				extension: 568459226,
				status: '已订购',
				seat: '001',
				timing: 1220,
				jobNumber: 12304,
				name: "肖锋",
				group: "管理员"
			}
			$.extend($scope, dummydata);
		})
	}


	/**
	 * 添加用户
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.addUser = function($scope) {
		var suffix = 'bam/add_user';

		$http.post(baseurl + suffix, $scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('add user error status:' + status);
				return false;
			})
	}


	/**
	 * 删除用户
	 *
	 * @param  string id
	 * @return bool
	 */
	this.deleteUser = function(id) {
		var suffix = 'bam/delete_user';

		$http.post(baseurl + suffix, id)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('delete user error status:' + status);
				return false;
			})
	}


	/**
	 * 更新用户
	 *
	 * @param  object user
	 * @return bool
	 */
	this.updateUser = function(user) {
		var suffix = 'bam/update_user';

		$http.post(baseurl + suffix, user)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('update user error status:' + status);
				return false;
			})
	}


	/**
	 * 用户查询
	 *
	 * @param  object $scope
	 * @return none
	 */

	this.searchUsers = function($scope) {

		console.log($scope.searchModel);
		$http.post(baseurl + 'bam/search_user', $scope.search)
			.success(function(data, status) {
				$scope.users = data;
			})
		.error(function(data, status) {
			console.log('search user error status: ' + status + ' use dummy data');

			// dummy data
			$scope.users = [
				{id: 1, name: 'test1', account: "account2", isValid: 1, gender: 'male', email: 'testemail@email.com', positions: 'admin'},
				{id: 4, name: 'test2', account: "account6", isValid: 1, gender: 'female', email: 'testemdail@email.com', positions: 'admin'},
				{id: 14, name: 'test3', account: "account34", isValid: 1, gender: 'male', email: 'test3@email.com', positions: 'registerUser'},
				{id: 43, name: 'test4', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
			]
			$scope.pages = 10;
		})
	}

	/**
	 * 添加用户组
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.addGroup = function($scope) {
		var suffix = 'bam/add_group';

		$http.post(baseurl + suffix, $scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('add group error status:' + status);
				return false;
			})
	}


	/**
	 * 删除用户组
	 *
	 * @param  string id
	 * @return bool
	 */
	this.deleteGroup = function(id) {
		var suffix = 'bam/delete_group';

		$http.post(baseurl + suffix, id)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('delete group error status:' + status);
				return false;
			})
	}


	/**
	 * 更新用户组
	 *
	 * @param  object Group
	 * @return bool
	 */
	this.updateGroup = function(Group) {
		var suffix = 'bam/update_group';

		$http.post(baseurl + suffix, group)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('update group error status:' + status);
				return false;
			})
	}


	/**
	 * 用户组查询
	 *
	 * @param  object $scope
	 * @return none
	 */

	this.searchGroups = function($scope) {

		console.log($scope.searchmodel);
		$http.post(baseurl + 'bam/search_group', $scope.keyword)
			.success(function(data, status) {
				$scope.groups = data;
			})
		.error(function(data, status) {
			console.log('search group error status: ' + status + ' use dummy data');

			// dummy data
			$scope.groups = [
				{id: 1, name: 'test1', account: "account2", isValid: 1, gender: 'male', email: 'testemail@email.com', positions: 'admin'},
				{id: 4, name: 'test2', account: "account6", isValid: 1, gender: 'female', email: 'testemdail@email.com', positions: 'admin'},
				{id: 14, name: 'test3', account: "account34", isValid: 1, gender: 'male', email: 'test3@email.com', positions: 'registerGroup'},
				{id: 43, name: 'test4', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
			]
			$scope.pages = 10;
		})
	}


	// Load Top Header Info
	this.getGroupById = function($scope, id) {

		$http.post(baseurl + 'bam/get_group_by_id', id)
			.success(function(data, status) {
				$scope.group = data;
			})
			.error(function(data, status) {
				// use dummy group for dev
				var group = {
					name: '用户组*',
					type: '568459226',
					status: '已订购',
					isValid: '1',
					users: ['用户1', '用户3', '用户4', '用户5', '用户6'],
				}
				$scope.group = group;
			})
	}


	/**
	 * 添加角色
	 *
	 * @param  object $scope
	 * @return bool
	 */
	this.addRole = function($scope) {
		var suffix = 'bam/add_role';

		$http.post(baseurl + suffix, $scope.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('add role error status:' + status);
				return false;
			})
	}


	/**
	 * 删除角色
	 *
	 * @param  string id
	 * @return bool
	 */
	this.deleteRole = function(id) {
		var suffix = 'bam/delete_role';

		$http.post(baseurl + suffix, id)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('delete role error status:' + status);
				return false;
			})
	}


	/**
	 * 更新角色
	 *
	 * @param  object role
	 * @return bool
	 */
	this.updateRole = function(role) {
		var suffix = 'bam/update_role';

		$http.post(baseurl + suffix, role)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('update role error status:' + status);
				return false;
			})
	}


	/**
	 * 角色查询
	 *
	 * @param  object $scope
	 * @return none
	 */

	this.searchRoles = function($scope) {

		console.log($scope.searchModel);
		$http.post(baseurl + 'bam/search_role', $scope.search)
			.success(function(data, status) {
				$scope.roles = data;
			})
		.error(function(data, status) {
			console.log('search role error status: ' + status + ' use dummy data');

			// dummy data
			$scope.roles = [
				{id: 1, name: '财务', account: "account2", isValid: 1, gender: 'male', email: 'testemail@email.com', positions: 'admin'},
				{id: 2, name: '管理人员', account: "account6", isValid: 1, gender: 'female', email: 'testemdail@email.com', positions: 'admin'},
				{id: 3, name: '渠道经理', account: "account34", isValid: 1, gender: 'male', email: 'test3@email.com', positions: 'registerrole'},
				{id: 4, name: '客服', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
				{id: 5, name: '客服主管', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
				{id: 6, name: '发货员', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
			]
			$scope.pages = 10;
		})
	}

});
