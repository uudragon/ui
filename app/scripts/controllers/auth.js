'use strict';

angular.module('mainApp')
.controller('AuthCtrl', function ($scope, Auth, md5, $http) {

	// init
	$scope.model = {account: '', password: ''};

	$scope.login = function(isValid) {
		$scope.submitted = true;
		if (!isValid) return;

		var user = {
			account: $scope.model.account,
			password: md5.createHash($scope.model.password)
		}

		$scope.date = new Date();
		Auth.login(user, function(code) {
			switch (code) {

				case 'E_00101':
					$scope.errorMsg = '用户不存在！';
					$scope.inValid = 'account';
					break;

				case 'E_00100':
					$scope.errorMsg = '密码与用户名不匹配！';
					$scope.inValid = 'password';
					break;

				case '0':
					delete $scope.errorMsg;
					delete $scope.inValid;
					break;

				default:
					$scope.errorMsg = '错误！code: ' + code
					break;
			}
		}, function(msg) {
			console.log('faild' + msg);
		})
	}

	$scope.logout = function() {
		Auth.logout(function(){}, function() {})
	}
});
