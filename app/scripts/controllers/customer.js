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

		$scope.showOrder = function(index, id) {
			var $elem = $('#' + id);

			if ( $elem.css('display') === 'none' || index !== $scope.lastOrderIndex) {
				$elem.slideDown();
			} else if ( $scope.lastOrderIndex === index ) {
				$elem.slideToggle();
			}

			$scope.lastOrderIndex = index;
		}

		$controller('CustomerCtrl', {$scope: $scope});

	}])
