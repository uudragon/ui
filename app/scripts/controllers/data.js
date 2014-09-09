'use strict';

angular.module('mainApp')
.controller('DataCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'service';

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('DataManager', ['$scope', '$controller', function ($scope, $controller) {

		// 获取工单相关信息
		$scope.orders = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', products: '季度', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', products: '季度', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.showOrder = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		}


		$controller('DataCtrl', {$scope: $scope});

	}])


	.controller('OrderManager', ['$scope', '$controller', function ($scope, $controller) {



		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Work', ['$scope', '$controller', function ($scope, $controller) {



		$controller('DataManager', {$scope: $scope});
	}])
	.controller('Inventory', ['$scope', '$controller', function ($scope, $controller) {

		$scope.products = [{customerName: '李四民', orderSN: '5223071231', customerPhone: '1395334239543', province: '山东', city: '青岛', products: '季度', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '0', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '张三', orderSN: '212131071231', customerPhone: '3123334239543', province: '上海', city: '上海', area: '0', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-11-15', contactTimes: '2014-10-15'}, {customerName: '李七', orderSN: '123071231', customerPhone: '4395334239543', province: '山东', city: '青岛', products: '季度', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, {customerName: '李五民', orderSN: '223071231', customerPhone: '5395334234343', province: '山东', city: '青岛', area: '1', alipay: '1232113124@gail.com', orderStatus: '1', payType: '1', payway: 'online', products: '季度', payStatus: '1', createTime: '2014-10-15', contactTimes: '2014-10-15'}, ];

		$scope.getProducts = function(order) {
			$scope.currentOrder = order;
			$('#order-details').modal('show');
		}

		$controller('DataManager', {$scope: $scope});
	}])
