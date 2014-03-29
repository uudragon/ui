'use strict';

angular.module('mainApp')
.service('sideBarService', function sideBarService() {
	var items = [
    		{name: '客户信息', url: 'info'},
    		{name: '客服管理', url: 'customer'},
    		{name: '财务管理', url: 'financial'},
    		{name: '代理商管理', url: 'agents'},
    		{name: '发货管理', url: 'ship'},
    		{name: '生产管理', url: 'prod'},
    		{name: '条法管理', url: 'law'},
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
