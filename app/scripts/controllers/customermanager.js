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



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Online', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Phone', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Info', ['$scope', '$controller', '$http', function ($scope, $controller, $http) {

		// 搜索下拉
		$scope.filters = [
			{name: '所在省份', value: 1, subfilters: [{name: '河北省', value: 1 }, {name: '山西省', value: 2 }, {name: '吉林省', value: 3 }, {name: '辽宁省', value: 4 }, {name: '黑龙江省', value: 5 }, {name: '陕西省', value: 6 }, {name: '甘肃省', value: 7 }, {name: '青海省', value: 8 }, {name: '山东省', value: 9 }, {name: '福建省', value: 10 }, {name: '浙江省', value: 11 }, {name: '台湾省', value: 12 }, {name: '河南省', value: 13 }, {name: '湖北省', value: 14 }, {name: '湖南省', value: 15 }, {name: '江西省', value: 16 }, {name: '江苏省', value: 17 }, {name: '安徽省', value: 18 }, {name: '广东省', value: 19 }, {name: '海南省', value: 20 }, {name: '四川省', value: 21 }, {name: '贵州省', value: 22 }, {name: '云南省', value: 23 }, {name: '北京市', value: 24 }, {name: '天津市', value: 25 }, {name: '上海市', value: 26 }, {name: '重庆市', value: 27 }, {name: '内蒙古', value: 28 }, {name: '新疆', value: 29 }, {name: '宁夏', value: 30 }, {name: '广西', value: 31 }, {name: '西藏', value: 32 }, {name: '香港', value: 33 }, {name: '澳门', value: 34 }]},
			{name: '城市', value: 2, input: true},
			{name: '订单类型', value: 3, subfilters: [{name: '季度', value: 0}, {name: '半年度', value: 1}, {name: '年度', value: 2}, {name: '一次性周边', value: 3}]},
			{name: '付款状态', value: 4, subfilters: [{name: '已付款', value: 1}, {name: '未付款', value: 2}]},
			{name: '支付方式', value: 5, subfilters: [{name: '货到付款', value: 1}, {name: '在线付款', value: 2}]},
			{name: '审单状态', value: 6, subfilters: [{name: '待审核', value: 1}, {name: '审核中', value: 2}, {name: '审核通过', value: 3}, {name: '无效', value: 4}]},
			{name: '创建时间', value: 7, datetime: true},
			{name: '联系次数', value: 8, input: true},
			{name: '订单状态', value: 9, subfilters: [{name: '正常', value: 1}, {name: '取消', value: 2}]},
			{name: '发货状态', value: 10, subfilters: [{name: '已发货', value: 1}, {name: '未发货', value: 2}]},
			{name: '发票状态', value: 11, subfilters: [{name: '已开', value: 1}, {name: '未开', value: 2}]},
			{name: '退换货单号', value: 12, input: true}
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
