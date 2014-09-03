'use strict';

angular.module('mainApp')
.controller('CustomerCtrl', ['$scope', '$controller',function ($scope, $controller) {

	// init
	$scope.searchModel = {
		pagination: {
			perPage: config.perPage,
			toPage: 1
		}
	}

	$scope.page = 1;
	$scope.objType = 'customer';

	$controller('MainCtrl', {$scope: $scope});

}])


	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerManager', ['$scope', '$controller', function ($scope, $controller) {

		$scope.searchModel = {};

		if ( $scope.$state.includes('root.customer.traded') ) {
			$scope.search('tradedCustomer');
		} else if ( $scope.$state.includes('root.customer.manager') ) {
			$scope.load('customer_statistics');
		}

		// fake date
		$scope.orders = [{customerName: '李四民', orderSN: '123071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '12131071231', customerPhone: '123334239543', province: '上海', city: '上海', orderType: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '1395334239543', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '1395334234343', province: '山东', city: '青岛', orderType: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.tmp = {
			orderSN: '123071231',
			name: '李四民',
			products: '季度',
			payDate: '2014-10-15',
			payWay: '在线支付',
			payStatus: '已支付',
			birthday: '2010-06-01',
			orderStatus: '正常'}

		$scope.shareOrder = function() {
			$('#share-order').modal('show');
		}

		$scope.showOrder = function(index) {
			$('#order-details').modal('show');
		}

		$scope.checkOrder = function() {
			$('#recheck-order').modal('show');
		}

		$scope.return = function() {
			$('#return-order').modal('show');
		}

		$scope.confirmAndShare = function() {
			$('#share-order').modal('show');
		}

		$scope.splitOrder = function() {
			$scope.isSplitOrder = true;
			$scope.orders = [
				{orderSN: '123071231', name: '李四民', products: '季度', payDate: '2014-10-15', payWay: '在线支付', payStatus: '已支付', birthday: '2010-06-01', orderStatus: '正常'},
				{orderSN: '143071231', name: '李四民', products: '季度', payDate: '2014-10-15', payWay: '在线支付', payStatus: '已支付', birthday: '2010-06-01', orderStatus: '正常'}
			];
		}

		$scope.selectGift = function() {
			$('#select-gift').modal('show');
		}

		$controller('CustomerCtrl', {$scope: $scope});

	}])
	.controller('checkOrderCtrl', ['$scope', '$controller', function($scope, $controller) {

		$controller('CustomerManager', {$scope: $scope});
	}])
