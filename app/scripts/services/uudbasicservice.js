'use strict';

angular.module('authApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';
	var self = this;
	var PER_PAGE = 20;

	this.getBreadcrumb = function(route) {

		var breadcrumb = {
			'root' : {href: '', label: '首页'},
			'root.login' : {href: 'login', label: 'login'},
			'root.user' : {href: 'user', label: '用户管理'},
			'root.ugroup' : {href: 'user-group', label: '用户组管理'},
			'root.ugroup.show' : {href: '', label: '用户组查看'},
			'root.role' : {href: 'role', label: '角色管理'},
			'root.rgroup' : {href: 'role-group', label: '角色组管理'},
			'root.rgroup.show' : {href: '', label: '角色查看'},
			'root.privilege' : {href: 'privilege', label: '权限管理'}
		}

		return breadcrumb[route];

	}



	this.post = function(url, data) {

		var serialize = function(obj, prefix) {
			var str = [];
			for(var p in obj) {
				var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
				str.push(typeof v == "object" ?
					serialize(v, k) :
					encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
			return str.join("&");
		}

		return $http({
			url: url,
			method: 'POST',
			data: serialize(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
	}


	/**
	 * 载入对象
	 *
	 * @param  string id
	 * @return object
	 */
	this.loadById = function($scope, id, type) {

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


		self.post(baseurl + suffix, {id: id})
			.success(function(data, status) {

			})
			.error(function(data, status) {
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

		self.post(baseurl + suffix, model)
			.success(function(data, status) {

			})
			.error(function(data, status) {
				console.log('error');
				console.log(status);
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

		self.post(baseurl + suffix, {id: id})
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

		console.log(model);
		self.post(baseurl + suffix, model)
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
				suffix = 'bam/search_user.php';
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

		$scope.searchModel.pagination = $scope.searchModel.pagination || {toPage: 1, perPage: PER_PAGE}

		console.log($scope.searchModel);

		self.post(baseurl + suffix, $scope.searchModel)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error status: ' + status + ' use dummy data');

				// dummy data
				$scope.result = {
					recordsCount: 100,
					records: [
						{id: 1, type: 1, rolename: '财务', name: 'test1', account: "account2", isValid: 1, gender: 'male', email: 'testemail@email.com', positions: 'admin'},
						{id: 2, type: 2, rolename: '管理人员', name: 'test2', account: "account6", isValid: 1, gender: 'female', email: 'testemdail@email.com', positions: 'admin'},
						{id: 3, type: 2, rolename: '渠道经理', name: 'test3', account: "account34", isValid: 1, gender: 'male', email: 'test3@email.com', positions: 'register'},
						{id: 4, type: 1, rolename: '客服', name: 'test4', account: "account6", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'},
						{id: 5, type: 1, rolename: '客服主管', name: 'test45', account: "account4", isValid: 1, gender: 'male', email: 'testd4@email.com', positions: 'admin'},
						{id: 6, type: 1, rolename: '发货员', name: '21312', account: "account2", isValid: 1, gender: 'female', email: 'test4@email.com', positions: 'admin'}
					]
				}
			})
	}

	this.load = function($scope, type) {

		var suffix;

		switch (type) {
			case 'user':
				suffix = 'bam/search_user.php';
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

		self.post(baseurl + suffix)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('load ' + type + ' error status: ' + status + ' use dummy data');

				// dummy data
				$scope.result = {
					recordsCount: 100,
					records: [
						{id: 1, type: 1, name: 'testasdf1'},
						{id: 2, type: 2, name: 'test2'},
						{id: 3, type: 2, name: 'test3'},
						{id: 4, type: 1, name: 'test4'},
						{id: 5, type: 1, name: 'test45'},
						{id: 6, type: 1, name: '21312'}
					]
				}
			})
	}

	this.getPrevilegeJSON = function(editor) {

		var suffix = 'getPrevilegeJSON';

		self.post(baseurl + suffix)
			.success(function(data, status) {
				editor.set(data);
			})
			.error(function(data, status) {
				console.log('getPrevilegeJSON error status: ' + status + ' use dummy data');
				// dummy data
				//

				var result = {
					'页面一': {
						'用户一': 'Test1',
						'用户二': 'Test2',
					}
				}

				editor.set(result);
				editor.expandAll();
			})

	}

	this.sendPrevilegeJSON = function(json) {

		var suffix = 'sendPrevilegeJSON';

		self.post(baseurl + suffix, json)
			.success(function(data, status) {
				console.log(data);
			})
			.error(function(data, status) {
				console.log('sendPrevilegeJSON error: ');
				console.log(json);
			})

	}

});
