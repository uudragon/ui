'use strict';

angular.module('mainApp')
.service('sideBarService', function sideBarService() {
	var items = [
    		{name: '客户信息', url: 'customer_infomation'},
    		{name: '客户管理', url: 'customer_management'},
    		{name: '财务管理', url: 'financial_management'},
    		{name: '代理商管理', url: 'agents_management'},
    		{name: '发货管理', url: 'ship_management'},
    		{name: '生产管理', url: 'production_management'},
    		{name: '条法管理', url: 'management_of_law'},
    	];

    return {
    	query: items,
    	highlight: function(index) {
            for (var i in items) {
                items[i].active = i == index ? true : false;
            }
    		return items;
    	}
    }
});
