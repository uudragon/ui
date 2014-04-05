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

	/**
	 * 载入对象
	 *
	 * @param  string id
	 * @return object
	 */
	this.loadById = function($scope, $id, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/load_user';
				break;
			case 'userGroup':
				suffix = 'bam/load_user_group';
				break;

			case 'role':
				suffix = 'bam/load_role';
				break;

			case 'userRole':
				suffix = 'bam/load_user_role';
				break;

			case 'roleGroup':
				suffix = 'bam/load_role_group';
				break;

			default:
				break;

		}

		$http.post(baseurl + suffix, id)
			.success(function(data, status) {
				$scope.model = data;
			})
			.error(function(data, status) {
				// use dummy group for dev
				console.log('load ' + type + ' error status:' + status);
				$scope.model = {
					name: '用户组*',
					type: '568459226',
					status: '已订购',
					isValid: '1',
					users: ['用户1', '用户3', '用户4', '用户5', '用户6'],
				}
			})
	}

	/**
	 * 添加对象
	 *
	 * @param  object model
	 * @param  string type
	 * @return bool
	 */
	this.add = function(model, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/add_user';
				break;
			case 'userGroup':
				suffix = 'bam/add_user_group';
				break;

			case 'role':
				suffix = 'bam/add_role';
				break;

			case 'userRole':
				suffix = 'bam/add_user_role';
				break;

			case 'roleGroup':
				suffix = 'bam/add_role_group';
				break;

			default:
				break;

		}

		$http.post(baseurl + suffix, model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('add ' + type + ' error status:' + status);
				return false;
			})
	}


	/**
	 * 删除对象
	 *
	 * @param  string id
	 * @param  string type
	 * @return bool
	 */
	this.delete = function(id, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/delete_user';
				break;
			case 'userGroup':
				suffix = 'bam/delete_user_group';
				break;

			case 'role':
				suffix = 'bam/delete_role';
				break;

			case 'userRole':
				suffix = 'bam/delete_user_role';
				break;

			case 'roleGroup':
				suffix = 'bam/delete_role_group';
				break;

			default:
				break;

		}

		$http.post(baseurl + suffix, id)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('delete ' + type + ' error status:' + status);
				return false;
			})
	}


	/**
	 * 更新对象
	 *
	 * @param  object model
	 * @param  string type
	 * @return bool
	 */
	this.update = function(model, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/update_user';
				break;
			case 'userGroup':
				suffix = 'bam/update_user_group';
				break;

			case 'role':
				suffix = 'bam/update_role';
				break;

			case 'userRole':
				suffix = 'bam/update_user_role';
				break;

			case 'roleGroup':
				suffix = 'bam/update_role_group';
				break;

			default:
				break;

		}

		$http.post(baseurl + suffix, model.model)
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('update ' + type + ' error status:' + status);
				return false;
			})
	}


	/**
	 * 对象查询
	 *
	 * @param  object search
	 * @param  string type
	 * @return none
	 */

	this.search = function($scope, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/search_user';
				break;
			case 'userGroup':
				suffix = 'bam/search_user_group';
				break;

			case 'role':
				suffix = 'bam/search_role';
				break;

			case 'userRole':
				suffix = 'bam/search_user_role';
				break;

			case 'roleGroup':
				suffix = 'bam/search_role_group';
				break;

			default:
				break;

		}
		console.log($scope.searchModel);

		return $http.post(baseurl + suffix, $scope.searchModel)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error status: ' + status + ' use dummy data');

				// dummy data
				$scope.result = [
					{id: 1, name: 'test1', account: "account2", isValid: 1, gender: 'male', email: 'testemail@email.com', positions: 'admin'},
					{id: 4, name: 'test2', account: "account6", isValid: 1, gender: 'female', email: 'testemdail@email.com', positions: 'admin'},
					{id: 14, name: 'test3', account: "account34", isValid: 1, gender: 'male', email: 'test3@email.com', positions: 'register'},
					{id: 43, name: 'test4', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
				]
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
