'use strict';

angular.module('mainApp')
.controller('ServiceCtrl', ['$scope', 'CSService', function ($scope, CSService) {

	$scope.summit = function() {
		CSService.newOrder()
			.success(function(data, status) {
				return true;
			})
			.error(function(data, status) {
				console.log('new order error status: ' + status);
				return false;
			});
	}

}])
	.controller('orderManger', ['$scope', 'CSService', function ($scope, CSService) {

			// 获取工单相关信息
			CSService.queryOrderInfo($scope);

			// 搜索
			$scope.search = function () {
				console.log($scope);
				CSService.search($scope.model, 'order')
					.success(function(data, status) {
						$scope.result = data;
					})
					.error(function(data, status) {
						console.log('search order error status: ' + status + ' use dummy data');

						// dummy data
						$scope.result = [{order_no: '00123', type: '投诉快递', status: '已处理', result: '更换快递', channel: '电话客服', update_time: new Date(), create_time: new Date(), refer: '否', creater: '电话客服1', customer: {code: '312303', name: '虚竹', gender: '男', c_name: '玄慈', c_gender: '男', order_type: '一年', phone: '123123497', addr: '少林寺'} } ]
					})
			}
		}])
	.controller('employeeManger', ['$scope', 'CSService', function ($scope, CSService) {

			// 获取工单相关信息
			CSService.queryEmployeeInfo($scope);

			// 搜索
			$scope.search = function () {
				CSService.searchEmployee($scope)
			};
		}])
