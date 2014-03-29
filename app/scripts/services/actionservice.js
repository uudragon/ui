'use strict';

angular.module('mainApp')
	.service('actionService', function sideBarService() {
		var mainActions = [{
			title: '新建客户'
		}, {
			title: '成交客户'
		}];

		mainActions = {
			info: [
				{title: '新建客户', url: ""},
				{title: '成交客户', url: ""}
			],
			customer: [
				{title: '工单管理', url: "customer/order"},
				{title: '员工管理', url: "customer/employee"},
				{title: '在线情况', url: "customer/online"},
				{title: '电话报表', url: "customer/phone"},
				{title: '数据管理', url: "customer/data"}
			],
			agent: [
				{title: '工单管理'},
				{title: '员工管理'},
				{title: '在线情况'},
				{title: '电话报表'},
				{title: '数据管理'}
			],
		};

		var subActions = {
			info: [
				{title: '复制新建'},
				{title: '预览名单'},
			],
			customer: [
				{title: '新建工单', url: "ustomer/order/new"},
				{title: '工单管理', url: "ustomer/order/manager"},
			]
		};

		return {
			mainActions: function(type) {
				return mainActions[type] ? mainActions[type] : [];
			},
			subActions: function(type) {
				return subActions[type] ? subActions[type] : [];
			}
		}
	});
