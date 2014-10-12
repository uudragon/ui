'use strict';

angular.module('mainApp')
.controller('UtilsCtrl', ['$scope', '$controller', function ($scope, $controller) {

	$controller('MainCtrl', {$scope: $scope});
}])

	/**
	 * Sub-Controller
	 * ---------------------------------------------------------------------------------
	 */

	.controller('UtilsManager', ['$scope', '$controller', function ($scope, $controller) {


		// inherit functions from parent
		$controller('UtilsCtrl', {$scope: $scope});

	}])
	.controller('NewOrder', ['$scope', '$controller', function ($scope, $controller) {



		// inherit functions from parent
		$controller('UtilsManager', {$scope: $scope});

	}])
	.controller('Search', ['$scope', '$controller', function ($scope, $controller) {

		// 搜索下拉
		$scope.filters = [{name: '客户姓名', value: 0}, {name: '客户电话', value: 1}];
		$scope.subfilters = [{name: '包含', value: 0}, {name: '排除', value: 1}];

		$scope.records = [{topic: '回访', dealResult: '处理中', urgency: '紧急', content: '联系内容', phoneStatus: '接听', contactTime: '2010-03-01', nextContactTime: '2010-03-01', complianType: '投诉分类', responser: '李四民'}, {topic: '催费', dealResult: '已完成', urgency: '紧急', content: '联系内容', phoneStatus: '无人接', contactTime: '2010-04-01', nextContactTime: '2010-06-01', complianType: '投诉分类', responser: '比尔盖茨'} ];

		$scope.showContact = function(record) {
			$('#contact-history').modal('show');
		};

		$scope.newContact = function(record) {
			$('#contact-history').modal('show');
		};

		// 订单管理
		$scope.allOrders = [
			{
				orderSN: '123123123',
				startIssues: '2010-04-01',
				endIssues: '2010-08-01',
				deliverTurns: '3',
				amount: '42323.12',
				remainTurns: '2',
				birtchDay: '1999-04-01',
				orderStatus: 'good',
				giftStatus: 'good',
				invoicesStatus: 'good'
			}
		];

		// 发货记录
		$scope.deliverRecords = [
			{
				orderSN: '234234131',
				deliverTime: '2010-04-01',
				deliverStatus: 'good',
				goodName: '年度',
				deliverFeedback: 'good',
				deliverSN: '12335231351'
			}
		];

		// 补开发票
		$scope.goods = [
			{
				name: '季度',
				size: '大号',
				cost: '100万',
				num: '10',
				amount: '1000万',

			}
		];

		// inherit functions from parent
		$controller('UtilsManager', {$scope: $scope});

	}])
	.controller('Notes', ['$scope', '$controller', 'Restangular', '$http', function ($scope, $controller, Restangular, $http) {

		// ths
		$scope.ths = [
			{name: 'content', label: '内容', isChecked: true},
			{name: 'reciever', label: '收件人', isChecked: true},
			{name: 'sendTime', label: '发送时间', isChecked: true}
		];

		var Note =  Restangular.allUrl('messages', '/atnew/ws/notes');
		var searcher = {};
		$scope.msg = {};

		$scope.$watch('filterBy.mailbox', function() {
			$scope.reloadSearch();
		});

		$scope.reloadSearch = function() {
			Note.get($scope.filterBy.mailbox, searcher).then(function(result) {
				$scope.messages = result.records;
				$scope.recordsCount = result.recordsCount;
				$scope.currentPage = 1;
			});
		};

		$scope.keywordSearch = function() {
			searcher.content = $scope.subfilter;
			searcher.pageNo = 1;
			searcher.pageSize = config.perPage;
			$scope.reloadSearch();
		};

		// 删除发件箱/收件箱内容
		$scope.deleteMessage = function() {
			var toBeDeleted = [];
			angular.forEach($scope.messages, function(message) {
				if (message.isChecked) {
					toBeDeleted.push(message.id);
				}
			});
			if (toBeDeleted.length) {
				Note.one($scope.filterBy.mailbox, toBeDeleted).remove();
			}
		};

		// 查看邮件内容
		$scope.readMessage = function(id) {
			if (id) {
				Note.one($scope.filterBy.mailbox, id).get();
			}
		};

		$scope.paginationFn = function() {
			console.log('paginationFn');
			searcher.pageNo = $scope.searchModel.pageNo;
			searcher.pageSize = $scope.searchModel.pageSize;
			$scope.reloadSearch();
		};

		// 一键清零 (清空收件箱/发件箱)
		$scope.clearAllMessage = function() {
			console.log(Note);
			Note.one($scope.filterBy.mailbox).remove();
		};

		$scope.openMessageBox = function() {
			$('#send-message').modal('show');
		};

		$scope.saveNote = function() {
			$scope.msg.send = 'sender';
			Note.post($scope.msg)
				.then(function(data, status) {
					$('#send-message').modal('hide');
				});
		};

		$scope.sendNote = function() {
			Note.doPUT($scope.msg)
				.then(function(data, status) {
					$('#send-message').modal('hide');
				});
		};

		// inherit functions from parent
		$controller('UtilsManager', {$scope: $scope});

	}])
	.controller('Batchmsg', ['$scope', '$controller', 'Restangular', function ($scope, $controller, Restangular) {
		var Msg =  Restangular.allUrl('messages', '/atnew/ws/message');
		$scope.msg = {sendType: 1, opUser: 12};

		$scope.sendMsg = function() {
			// console.log($scope.msg);
			Msg.post($scope.msg);
		};

		// inherit functions from parent
		$controller('UtilsManager', {$scope: $scope});

	}]);
