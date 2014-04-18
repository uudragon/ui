'use strict';

angular.module('mainApp')
//代理商管理
.controller('AgentsCtrl', ['$scope', 'AgentsService', function ($scope, AgentsService) {

	$scope.loadInfo = function(type) {

		AgentsService.loadInfo($scope.model, type)
			.success(function(data, status) {
				$scope.statistics = data;
			})
			.error(function(data, status) {
				console.log('query order info error status: ' + status + ' use dummy data');
				switch (type) {
					case 'rankInfo':
						$scope.statistics = {'current': 234, 'history': 300};
						break;

					case 'promoCodeInfo':
						$scope.statistics = {'td_hq_sum': 300, 'td_agent_sum': 100321, 'td_consume': 200, 'remain': 120, 'hq_sum': 2342345000, 'agent_sum': 23245000 };
						break;

					case 'salesInfo':
						$scope.statistics = {
							count_of_today: 51222,
							sum_of_today: 123425,
							count: 1223223,
							sum: 52342324123
						};
						break;

					default: break;
				}
			})
	}

	// 搜索
	$scope.search = function (type) {
		if (!type) return;

		AgentsService.search($scope.searchModel, type)
			.success(function(data, status) {
				$scope.result = data;
			})
			.error(function(data, status) {
				console.log('search ' + type + ' error, use fake data');

				switch (type) {
					case 'agents':
						$scope.result = [{"ID":1,"code":"1001","name":"张三丰","license":"license001","grade":1,"area":"北京","contract_code":"UUD_C001","leal_person":"张三丰","type":1,"registered_capital":500000,"begin_time":"2014-04-01","end_time":"2015-04-01","contact":"82320552","address":"中关村科技园","remark":"没有备注","meet":1,"status":1,"check":"1","disable_time":"2015-04-01","cause":0,"create_time":"2014-04-14","creater":"jack","update_time":"2014-04-14"},{"ID":2,"code":"1002","name":"张无忌","license":"license002","grade":1,"area":"石家庄","contract_code":"UUD_C002","leal_person":"张无忌","type":1,"registered_capital":5000000,"begin_time":"2014-03-14","end_time":"2018-03-14","contact":"88525500","address":"益园文化创意产业园","remark":"无备注","meet":1,"status":1,"check":"1","disable_time":"2018-03-14","cause":0,"create_time":"2014-03-14","creater":"jack","update_time":"2014-03-14"}];
						break;

					case 'rank':
						$scope.result = [{add_amount: 2000, area: '华东', agent_name: '迅捷有限公司', creater: '晓峰', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华西', agent_name: '天意有限公司', creater: '虚竹', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华南', agent_name: '国脉有限公司', creater: '段玉', total_amount: 1100, actual_amount: 100, balance: 1000}, {add_amount: 2000, area: '华北', agent_name: '海华有限公司', creater: '朱朱', total_amount: 1100, actual_amount: 100, balance: 1000} ];
						break;

					case 'promoCode':
						$scope.result = [{agent_code: 21, quidco_amount: 5000, quidco_detail: '四月返款', quidco_desc: '银行卡转账', accu_quidco_amount: 9000, remark: '四月返款'} ];
						break;

					case 'sales':
						$scope.result = [{enter_amount: 20000, bank_code: '中国银行', account_name: '虚竹', account_no: 51870120, remark: '银行付款1'} ];
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

	.controller('AgentsManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.includes('root.agents.list') ) {
			console.log('var');
			// 获取代理商列表
			$scope.search('agents');

			// 查询目前签约代理数、今日销售总额、累计销售总额、今日新增客户数、历史销售人数
			$scope.loadInfo('agentCountInfo');
		} else if ( $scope.$state.includes('root.agents.rank') ) {
			// 获取代理商排名等信息
			$scope.loadInfo('rankInfo');
		} else if ( $scope.$state.includes('root.agents.promocode') ) {
			// 获取优惠码信息
			$scope.loadInfo('promoCodeInfo');
		} else if ( $scope.$state.includes('root.agents.sales') ) {
			// 获取销售信息
			$scope.loadInfo('salesInfo');
		}

		$controller('FinancialCtrl', {$scope: $scope});

	}])
