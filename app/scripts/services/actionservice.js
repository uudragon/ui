'use strict';

angular.module('mainApp')
	.service('actionService', function sideBarService() {
		var actions = {
			info: {
				title: "客户信息",
				main: [
					{title: '新建客户', url: "info/new", subview: 'info/new_customer.html'},
					{title: '成交客户', url: "info/summary", subview: 'info/new_customer.html'}
				]
			},
			customer: {
				title: "客服管理",
				main: [
					{
						title: '工单管理',
						url: "customer/order",
						submenu: [
							{title: '新建工单', url: "new", subview: 'info/new_customer.html'},
							{title: '工单管理', url: "manager", subview: 'info/new_customer.html'}
						]
					},
					{title: '员工管理', url: "customer/employee", subview: 'info/new_customer.html'},
					{title: '在线情况', url: "customer/online", subview: 'info/new_customer.html'},
					{title: '电话报表', url: "customer/phone", subview: 'info/new_customer.html'},
					{title: '数据管理', url: "customer/data", subview: 'info/new_customer.html'}
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
