'use strict';

angular.module('mainApp')
//代理商管理
.controller('AgentsCtrl', ['$scope', function ($scope) {

}])
	// Sub Controllers
	.controller('agentManage', ['$scope', 'AgentsService', function ($scope, AgentsService){

			// 获取代理商排名等信息
			AgentsService.searchOverallAgent()
				.success(function(data, status) {
					$scope.agentInfo = data;
				})
				.error(function(data, status){} )

			// 获取代理商列表
			AgentsService.searchAgent()
				.success(function(data, status) {
					$scope.result = data;
				})
				.error(function(data, status){} )

		}])

	.controller('agentRankManage', ['$scope', 'AgentsService', function ($scope, AgentsService){
			// 获取代理商排名
			AgentsService.searchAgentRank()
				.success(function(data, status) {
					$scope.rank = data;
				})
				.error(function(data, status) {

				})
		}])

	.controller('agentPromoManage', ['$scope', 'AgentsService', function ($scope, AgentsService){
			// 获取优惠码信息
			AgentsService.searchPromoCode()
				.success(function(data, status) {
					$scope.promoCode = data;
				})
				.error(function(data, status) {

				})
		}])
	.controller('agentSalesManage', ['$scope', 'AgentsService', function ($scope, AgentsService){
			// 获取优惠码信息
			AgentsService.searchSalesInfo()
				.success(function(data, status) {
					$scope.saleInfo = data;
				})
				.error(function(data, status) {

				})
		}])
