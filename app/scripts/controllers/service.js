'use strict';

angular.module('mainApp')
.controller('ServiceCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'service';

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ServiceManager', ['$scope', '$controller', function ($scope, $controller) {

		// 获取工单相关信息
		if ( $scope.$state.is('root.service.ordermanager') ) {
			$scope.load('order_statistics');
		} else if ( $scope.$state.is('root.service.getorder') ) {
			// 领取工单
			$scope.searchModel = {userNo: '1'}
			$scope.search('task');

		} else if ( $scope.$state.is('root.service.online') ) {
			$scope.load('online_statistics');
		} else if ( $scope.$state.is('root.service.phone') ) {
			$scope.load('phone_report', 'report');

			$scope.report = {1: [{phone: '023423', status: '接听，并完整沟通', duration: '10', cs: '张三', info: '管理员'}, {phone: '312423', status: '接听，并完整沟通', duration: '10', cs: '李四', info: '不详'}], 2: [{phone: '723423', status: '接听，但忙碌', duration: '10', cs: '张三', info: '管理员'}, {phone: '612423', status: '接听，并完整沟通', duration: '10', cs: '李四', info: '不详'}] }
		} else if ( $scope.$state.is('root.service.data') ) {
			$scope.load('phone_report', 'report');

			$scope.report = {1: [{phone: '023423', status: '接听，并完整沟通', duration: '10', cs: '张三', info: '管理员'}, {phone: '312423', status: '接听，并完整沟通', duration: '10', cs: '李四', info: '不详'}], 2: [{phone: '723423', status: '接听，但忙碌', duration: '10', cs: '张三', info: '管理员'}, {phone: '612423', status: '接听，并完整沟通', duration: '10', cs: '李四', info: '不详'}] }
		}

		$controller('ServiceCtrl', {$scope: $scope});

	}])


	.controller('EmployeeManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.allTasks = [];
		$scope.search('employee');

		// init
		for (var i = 0; i < config.workDays; i++) {
			$scope.allTasks[i] = { net: [], phone: [] };
		}

		$scope.allTasks[0] = {
			net: [
				{userNo: 123123, name: 'A'},
				{userNo: 432123, name: 'B'},
				{userNo: 632123, name: 'C'}
			],
			phone: [
				{userNo: 823123, name: 'A'},
				{userNo: 732123, name: 'B'}
			],
		}

		$scope.tasks = $scope.allTasks[0];
		$scope.model = {};
		$scope.workDays = config.workDays;

		$scope.addTask = function(form) {
			var type = $scope.model.type;

			$scope.submitted = true;
			if (form.$valid) {
				$scope.tasks[type].push(angular.copy($scope.model));
				config.resetForm(form, $scope);
				$scope.submitted = false;
			}
		};

		$scope.removeTask = function($index, type) {
			$scope.tasks[type].splice($index, 1);
		};

		$scope.updateWeek = function(index) {
			if ($scope.week != index) {
				$scope.week = index;
				$scope.tasks = $scope.allTasks[index];
			}
		};

		$scope.print = function() {
			window.print();
		};

		$scope.saveTasks = function() {
			$('#uumodal').modal('hide');
		};

		$controller('ServiceCtrl', {$scope: $scope});
	}])
