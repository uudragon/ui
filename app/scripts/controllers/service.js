'use strict';

angular.module('mainApp')
.controller('ServiceCtrl', ['$scope', 'CSService', function ($scope, CSService) {

	$scope.summit = function(form) {
		$scope.submitted = true;

		if (!form.$valid) return;

		CSService.newOrder($scope.model)
			.success(function(data, status) {
				$scope.model = {};
				form.$setPristine();
				$scope.submitted = false;
			})
			.error(config.errorLog('new', 'task'));
	}

	$scope.loadInfo = function(type) {

		CSService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(config.errorLog('load', type))
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;
		
		CSService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');

				switch (type) {
					case 'order':
						$scope.result = [{order_no: '00123', type: '投诉快递', status: '已处理', result: '更换快递', channel: '电话客服', update_time: new Date(), create_time: new Date(), refer: '否', creater: '电话客服1', customer: {code: '312303', name: '虚竹', gender: '男', c_name: '玄慈', c_gender: '男', order_type: '一年', phone: '123123497', addr: '少林寺'} } ]
						break;

					case 'employee':
						$scope.result = [{employees_no: '00123', type: '投诉快递', status: '已处理', result: '更换快递', channel: '电话客服', update_time: new Date(), create_time: new Date(), refer: '否', creater: '电话客服1', customer: {code: '312303', name: '虚竹', gender: '男', c_name: '玄慈', c_gender: '男', order_type: '一年', phone: '123123497', addr: '少林寺'} } ];
						break;

					default: break;
				}

			})
	}

}])
	
	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ServiceManager', ['$scope', '$controller', function ($scope, $controller) {

		// 获取工单相关信息
		if ( $scope.$state.is('root.service.ordermanager') ) {
			$scope.loadInfo('order_statistics');
		} else if ( $scope.$state.is('root.service.getorder') ) {
			// 领取工单
			$scope.searchModel = {userNo: '1'}
			$scope.search('task');
		} else if ( $scope.$state.is('root.service.online') ) {
			$scope.loadInfo('online_statistics');
		}
 
		$controller('ServiceCtrl', {$scope: $scope});

	}])
