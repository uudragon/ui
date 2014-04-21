'use strict';

angular.module('mainApp')
.controller('AuthCtrl', function ($scope, Auth, md5, $http) {
	$scope.login = function() {

		$scope.model = $scope.model || {account: '', password: ''};

		var user = {
			account: $scope.model.account,
			password: md5.createHash($scope.model.password)
		}
		$scope.date = new Date();
		Auth.login(user, function(res) {
			console.log(res);
		}, function(msg) {
			console.log('faild' + msg);
		})
		// // 发送请求
		// $http.get('http://127.0.0.1:9000?' + serialize(data))
		// 	.success(function(data, status) {
		// 		if (data.legal) {
		// 			//  登陆成功
		// 			$scope.userInfo = data.user;
		// 			$scope.token = data.token;

		// 			$scope.data = {
		// 				token: data.token
		// 			}
		// 			$http.get('urllllllll' + serialize({token: data.token}))
		// 				.success(function(data, status) {
		// 					alert('转发token成功, 请打开控制台查看数据');
		// 					console.log(data);
		// 				})
		// 				.error(function(msg, status) {
		// 					alert('转发token失败, status ' + msg);
		// 				})

		// 		} else {
		// 			//  登陆失败
		// 			$scope.data = {
		// 				status: '连接成功，登陆失败',
		// 				login_name: $scope.model.account,
		// 				password: md5.createHash($scope.model.password),
		// 				message: data.message
		// 			}

		// 		}

		// 	})
		// 	.error(function(data, status) {
		// 		// 连接失败
		// 		$scope.data = {
		// 			login_name: $scope.model.account,
		// 			password: md5.createHash($scope.model.password),
		// 			status: status,
		// 			message: '连接失败'
		// 		}
		// 	})
	}

	$scope.logout = function() {
		Auth.logout(function(){}, function() {})
	}
});
