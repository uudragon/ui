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

		$scope.orders = [ {orderSN: '123071231', name: '李四民', products: '季度', payDate: '2014-10-15', payWay: '在线支付', payStatus: '已支付', birthday: '2010-06-01', orderStatus: '正常'}];

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
			console.log('confirm and share');
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
