'use strict';

angular.module('mainApp')
.service('sideBarService', function sideBarService() {
	var items = [
    		{name: '客户信息', url: 'info/home'},
    		{name: '客服管理', url: 'customer/home'},
    		{name: '财务管理', url: 'financial/home'},
    		{name: '代理商管理', url: 'agents/home'},
    		{name: '发货管理', url: 'ship/home'},
    		{name: '生产管理', url: 'prod/home'},
    		{name: '条法管理', url: 'law/home'},
    	];

    return {
    	highlight: function(index) {
            for (var i in items) {
                items[i].active = i == index ? true : false;
            }
    		return items;
    	}
    }
});
