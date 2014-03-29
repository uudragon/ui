'use strict';

angular.module('mainApp')
	.service('actionService', function sideBarService() {
		var actions = {
			info: {
				title: "客户信息",
				main: [
					{
						title: '新建客户',
						url: "info/new"
					},
					{
						title: '成交客户',
						url: "info/summary"
					}
				]
			},
			customer: {
				title: "客服管理",
				main: [
					{
						title: '工单管理',
						url: "customer/order",
						submenu: [
							{title: '新建工单', url: "new"},
							{title: '工单管理', url: "manager"}
						]
					},
					{
						title: '员工管理',
						url: "customer/employee"
					},
					{
						title: '在线情况',
						url: "customer/online"
					},
					{
						title: '电话报表',
						url: "customer/phone"
					},
					{
						title: '数据管理',
						url: "customer/data"
					}
				]
			},
			agent: {
				title: "代理商管理",
				main: [
					{title: '工单管理'},
					{title: '员工管理'},
					{title: '在线情况'},
					{title: '电话报表'},
					{title: '数据管理'}
				],
				sub: []
			}
		};

		return {
			actions: function(type) {
				return actions[type] ? actions[type] : [];
			}
		}
	});
