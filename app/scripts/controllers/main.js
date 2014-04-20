'use strict';

angular.module('mainApp')
.controller('MainCtrl', ['$scope', '$state', '$stateParams', 'BasicService', '$http', 'md5', function ($scope, $state, $stateParams, BasicService, $http, md5) {

	$scope.$state = $state;
	$scope.$stateParams = $stateParams;

	// $scope.login = function() {

	// 	$scope.model = $scope.model || {account: '', password: ''};

	// 	var data = {
	// 		account: $scope.model.account,
	// 		password: md5.createHash($scope.model.password)
	// 	}

	// 	var serialize = function(obj, prefix) {
	// 		var str = [];
	// 		for(var p in obj) {
	// 			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
	// 			str.push(typeof v == "object" ?
	// 				serialize(v, k) :
	// 				encodeURIComponent(k) + "=" + encodeURIComponent(v));
	// 		}
	// 		return str.join("&");
	// 	}

	// 	$scope.date = new Date();


	// 	// 发送请求
	// 	$http.get('http://127.0.0.1:9000?' + serialize(data))
	// 		.success(function(data, status) {
	// 			if (data.legal) {
	// 				//  登陆成功
	// 				$scope.userInfo = data.user;
	// 				$scope.token = data.token;

	// 				$scope.data = {
	// 					token: data.token
	// 				}
	// 				$http.get('urllllllll' + serialize({token: data.token}))
	// 					.success(function(data, status) {
	// 						alert('转发token成功, 请打开控制台查看数据');
	// 						console.log(data);
	// 					})
	// 					.error(function(msg, status) {
	// 						alert('转发token失败, status ' + msg);
	// 					})

	// 			} else {
	// 				//  登陆失败
	// 				$scope.data = {
	// 					status: '连接成功，登陆失败',
	// 					login_name: $scope.model.account,
	// 					password: md5.createHash($scope.model.password),
	// 					message: data.message
	// 				}

	// 			}

	// 		})
	// 		.error(function(data, status) {
	// 			// 连接失败
	// 			$scope.data = {
	// 				login_name: $scope.model.account,
	// 				password: md5.createHash($scope.model.password),
	// 				status: status,
	// 				message: '连接失败'
	// 			}
	// 		})
	// }

}])
