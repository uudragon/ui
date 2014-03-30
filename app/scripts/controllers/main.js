'use strict';

angular.module('mainApp')
.controller('InfoCtrl', function ($scope, $http, $routeSegment, loader) {
	$scope.date = new Date()
	$scope.exNumber = '0012';

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
	    loader.show = false;
	})


	$scope.summit = function() {

		var url = '';

		switch ($scope.model.btn) {
			case 'saved':
				url = 'http://services.bam.uudragon.com/bam/consumer_saved';
				break;

			case 'insert':
				url = 'http://services.bam.uudragon.com/bam/orders_insert';
				break;

			case 'query':
				url = 'http://services.bam.uudragon.com/bam/bamstomer_query';
				break;

			default: break;

		}

		$http.post(url, $scope.model)
		.success(function(data, status) {
			console.log(data);
		})
		.error(function(data, status) {
			console.log('error status:' + status);
		})
	}


})
.controller('customerManger', function ($scope, $http) {

	// 获取预订总数和成交客户
	$http.post('http://services.bam.uudragon.com/bam/query')
	.success(function(data, status) {
		 $scope.statistics = data;
	})
	.error(function(data, status) {
		 $scope.statistics = {
			'preorder': 100,
			'dealed': 5000
		};
	})

	// 搜索
	$scope.search = function() {
		$http.post('http://services.bam.uudragon.com/search', $scope.model)
		.success(function(data, status) {

			$scope.result = data;
		})
		.error(function(data, status) {
			console.log('error status:' + status);

			$scope.result = [
				{code: 1, name: 'test1', type: 2, gender: 'male', email: 'testemail@email.com'},
				{code: 4, name: 'test2', type: 6, gender: 'female', email: 'testemdail@email.com'},
				{code: 14, name: 'test3', type: 34, gender: 'male', email: 'test3@email.com'},
				{code: 43, name: 'test4', type: 6, gender: 'female', email: 'test4@email.com'},
			]
			$scope.pages = 10;
		})
	}

})
.controller('CustomerCtrl', function ($scope, $routeSegment, loader) {
	$scope.date = new Date()
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
	    loader.show = true;
	})
})
.controller('FinancialCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('AgentsCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('ShipCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('ProductionCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('LawCtrl', function ($scope, $routeSegment) {
	$scope.$routeSegment = $routeSegment;
	$scope.date = new Date()
})
.controller('MainCtrl', function ($scope, $routeSegment, loader) {
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
	    loader.show = false;
	})
})
