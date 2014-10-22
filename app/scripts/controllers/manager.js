'use strict';

angular.module('mainApp')
.controller('CustomerManagerCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'Financial';

	$controller('MainCtrl', {$scope: $scope});

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerManagerManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.is('root.financial.deposit') || $scope.$state.is('root.financial.rebate') ) {
			// 销售额信息查询
			$scope.load('cash_deposit_statistics');
		} else if ( $scope.$state.is('root.financial.recorded') ) {
			// 查询入账总体信息
			$scope.load('recorded_statistics');
		}

		$scope.employees = [
		{
			SN: '123123123',
			name: '刘云',
			weekDay: '1',
			onelineNum: '8',
			dealedOrderNum: '2403',
			contactPeriod: '100',
			avgContactPeriod: '10',
			totalOnlineTime: '13213',
			outPhoneNum: '300',
			succRate: '40%',
			inPhoneNum: '100',
			avgDealTime: '20',
			avgContactTime: '30',
			avgQueueTime: '5',
			onelineRate: '99%',
			status: '空闲',
			ps: 'null',
			phoneExchangeRate: '20%',
			useRate: '50%',
		},
		{
			SN: '223123123',
			name: '刘表',
			weekDay: '1',
			onelineNum: '8',
			dealedOrderNum: '1403',
			contactPeriod: '140',
			avgContactPeriod: '10',
			totalOnlineTime: '23213',
			outPhoneNum: '500',
			succRate: '30%',
			inPhoneNum: '130',
			avgDealTime: '30',
			avgContactTime: '50',
			avgQueueTime: '8',
			onelineRate: '94%',
			status: '忙碌',
			ps: 'null',
			phoneExchangeRate: '18%',
			useRate: '50%',
		},
		];

		$controller('CustomerManagerCtrl', {$scope: $scope});

	}])
	.controller('Employee', ['$scope', '$controller', function ($scope, $controller) {

		// ths
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'SN', label: '工号', isChecked: true},
			{name: 'name', label: '姓名', isChecked: true},
			{name: 'dealedOrderNum', label: '处理订单量', isChecked: true},
			{name: 'contactPeriod', label: '总通话时间', isChecked: true},
			{name: 'avgContactPeriod', label: '平均通话时长', isChecked: false},
			{name: 'totalOnlineTime', label: '总在线时间', isChecked: true},
			{name: 'outPhoneNum', label: '外呼量', isChecked: true},
			{name: 'succRate', label: '成单率', isChecked: true},
			{name: 'inPhoneNum', label: '呼入量', isChecked: true},
			{name: 'avgDealTime', label: '平均后处理时间', isChecked: false},
			{name: 'avgContactTime', label: '平均通话时长', isChecked: false},
			{name: 'avgQueueTime', label: '平均排队时间', isChecked: true},
			{name: 'onelineRate', label: '出勤率', isChecked: true},
			{name: 'phoneExchangeRate', label: '呼叫转接率', isChecked: false},
			{name: 'useRate', label: '利用率', isChecked: true}
		];

		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Online', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Phone', ['$scope', '$controller', function ($scope, $controller) {

		// ths
		$scope.isAllThsShow = false;
		$scope.ths = [
			{name: 'SN', label: '工号', isChecked: true},
			{name: 'name', label: '姓名', isChecked: true},
			{name: 'dealedOrderNum', label: '处理订单量', isChecked: true},
			{name: 'contactPeriod', label: '总通话时间', isChecked: true},
			{name: 'avgContactPeriod', label: '平均通话时长', isChecked: false},
			{name: 'totalOnlineTime', label: '总在线时间', isChecked: true},
			{name: 'outPhoneNum', label: '外呼量', isChecked: true},
			{name: 'succRate', label: '成单率', isChecked: true},
			{name: 'inPhoneNum', label: '呼入量', isChecked: true},
			{name: 'avgDealTime', label: '平均后处理时间', isChecked: false},
			{name: 'avgContactTime', label: '平均通话时长', isChecked: false},
			{name: 'avgQueueTime', label: '平均排队时间', isChecked: true},
			{name: 'onelineRate', label: '出勤率', isChecked: true},
			{name: 'phoneExchangeRate', label: '呼叫转接率', isChecked: false},
			{name: 'useRate', label: '利用率', isChecked: true}
		];

		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Info', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		// 搜索下拉
		$scope.filters = [
			{name: '客户电话', value: 1, input: true},
			{name: '时间段', value: 2, datetime: true},
			{name: '发送状态', value: 3, subfilters: [{name: '已发送', value: 1}, {name: '未发送', value: 2}]},
			{name: '主题', value: 4, subfilters: [{name: '主题1', value: 1}, {name: '主题2', value: 2}] },
			{name: '内容', value: 5, input: true}
		];


		$scope.msg = {};

		$scope.newMsgTemplate = function() {
			$('#new-msg-templet').modal('show');
		};

		// 保存短信模板
		$scope.saveMsgTemplate = function() {
			$http.post('/atnew/ws/message/template', $scope.msg)
				.success(function(data, status) {
					$('#new-msg-templet').modal('hide');
				});
		};

		// 查询
		$scope.listByPage = function() {
			$http.get('/atnew/ws/message', $scope.searchModel)
				.success(function(data, status) {
					$scope.msgs = data.records;
					$scope.recordsCount = data.recordsCount;
				});
		};

		$controller('CustomerManagerManager', {$scope: $scope});
	}]);
