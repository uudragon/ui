'use strict';

angular.module('mainApp')
//代理商管理
.controller('AgentsCtrl', function ($scope) {
	$scope.submit = function () {

		console.log($scope.model);
	}
})
	.controller('agentManage', function ($scope, UUDAgentsService){
		UUDAgentsService.searchOverallAgent($scope);

		UUDAgentsService.searchAgent($scope);
	})
	.controller('agentRankManage', function ($scope, UUDAgentsService){

		UUDAgentsService.searchAgentRank($scope);
	})
