'use strict';

angular.module('authApp')
.service('UUDBasicService', function UUDBasicService($http) {

	var baseurl = 'http://services.bam.uudragon.com/';

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
		$http.post(baseurl + 'bam/search_user', $scope.keyword)
		.success(function(data, status) {
			$scope.users = data;
		})
		.error(function(data, status) {
			console.log('search user error status: ' + status + ' use dummy data');

			// dummy data
			$scope.users = [
				{id: 1, name: 'test1', type: 2, gender: 'male', email: 'testemail@email.com', group: 'admin'},
				{id: 4, name: 'test2', type: 6, gender: 'female', email: 'testemdail@email.com', group: 'admin'},
				{id: 14, name: 'test3', type: 34, gender: 'male', email: 'test3@email.com', group: 'registerUser'},
				{id: 43, name: 'test4', type: 6, gender: 'female', email: 'test4@email.com', group: 'admin'},
			]
			$scope.pages = 10;
		})
	}


});
