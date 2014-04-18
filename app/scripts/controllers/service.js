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

	$scope.loadInfo = function(type) {

		CSService.loadInfo($scope.model, type) 
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
				switch (type) {
					case 'orderInfo':
						$scope.statistics = {'sum': 100321, 'count_finished': 200, 'count_end_today': 120, 'count_unfinished': 5000, 'sum_history': 23245000 };
						break;

					case 'employeeInfo':
						$scope.statistics = {'sum': 100321, 'count_finished': 200, 'count_end_today': 120, 'count_unfinished': 5000, 'sum_history': 23245000 };
						break;
					
					case 'csInfo':
						$scope.statistics = {
							network: {
								wait: 100,
								Consulting: 124155,
								received: 123124
							},
							telephone: {
								wait: 10,
								Consulting: 15,
								received: 124
							}
						}
						break;

					default: break;
				}
			})
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

				$scope.pages = 10;
			})
	}

}])
	
	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('ServiceManager', ['$scope', '$controller', function ($scope, $controller) {

		// 获取工单相关信息
		if ( $scope.$state.includes('root.service.ordermanager') ) {
			$scope.loadInfo('orderInfo');
		} else if ( $scope.$state.includes('root.service.online') ) {
			$scope.loadInfo('csInfo');
		}
 
		$controller('ServiceCtrl', {$scope: $scope});

	}])
