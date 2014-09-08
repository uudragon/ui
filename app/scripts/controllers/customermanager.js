'use strict';

angular.module('mainApp')
.controller('CustomerManagerCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$scope.objType = 'Financial';

	$controller('MainCtrl', {$scope: $scope});

}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('CustomerManagerManager', ['$scope', '$controller', function ($scope, $controller) {

		if ( $scope.$state.is('root.financial.deposit') || $scope.$state.is('root.financial.rebate') ) {
			// 销售额信息查询
			$scope.load('cash_deposit_statistics');
		} else if ( $scope.$state.is('root.financial.recorded') ) {
			// 查询入账总体信息
			$scope.load('recorded_statistics');
		}

		$scope.employees = [
		{
			SN: '123123123',
			name: '刘云',
			weekDay: '1',
			onelineNum: '8',
			dealedOrderNum: '2403',
			contactPeriod: '100',
			avgContactPeriod: '10',
			totalOnlineTime: '13213',
			outPhoneNum: '300',
			succRate: '40%',
			inPhoneNum: '100',
			avgDealTime: '20',
			avgContactTime: '30',
			avgQueueTime: '5',
			onelineRate: '99%',
			status: '空闲',
			ps: 'null',
			phoneExchangeRate: '20%',
			useRate: '50%',
		},
		{
			SN: '223123123',
			name: '刘表',
			weekDay: '1',
			onelineNum: '8',
			dealedOrderNum: '1403',
			contactPeriod: '140',
			avgContactPeriod: '10',
			totalOnlineTime: '23213',
			outPhoneNum: '500',
			succRate: '30%',
			inPhoneNum: '130',
			avgDealTime: '30',
			avgContactTime: '50',
			avgQueueTime: '8',
			onelineRate: '94%',
			status: '忙碌',
			ps: 'null',
			phoneExchangeRate: '18%',
			useRate: '50%',
		},
		];

		$controller('CustomerManagerCtrl', {$scope: $scope});

	}])
	.controller('Employee', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Online', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Phone', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
	.controller('Info', ['$scope', '$controller', function ($scope, $controller) {



		$controller('CustomerManagerManager', {$scope: $scope});

	}])
