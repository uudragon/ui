// timer
uud.directive('timing', ['$interval', 'dateFilter',
	function($interval, dateFilter) {
		var Counter = {
			createNew: function() {
				var counter = {
					h: 0,
					m: 0,
					s: 0
				}
				counter.add = function() {
					counter.s += 1;
					if (counter.s >= 60) {
						counter.m += 1
						counter.s = 0;

						if (counter.m >= 60) {
							counter.h += 1;
							counter.m = 0;
						}
					}
				}
				counter.text = function() {
					function format(num) {
						if (!num) return '00';
						if (num < 10) return '0' + String(num);
						return String(num);
					}
					return format(counter.h) + ':' + format(counter.m) + ':' + format(counter.s);
				}
				return counter;
			}
		}

		function link(scope, element, attrs) {
			var format,
				timeoutId,
				c = Counter.createNew();

			function updateTime() {
				c.add();
				element.text(c.text());
			}

			scope.$watch(attrs.timing, function(value) {
				format = value;
				updateTime();
			});

			element.on('$destroy', function() {
				$interval.cancel(timeoutId);
			});

			// start the UI update process; save the timeoutId for canceling
			timeoutId = $interval(function() {
				updateTime(); // update DOM
			}, 1000);
		}

		return {
			link: link
		};
	}
])

// get week form date
.directive('toWeek', function() {

	function toWeek(scope, element, attrs) {
		scope.$watch(attrs.toWeek, function(d) {
			if (!d) return;
			d = new Date(+d);
			d.setHours(0, 0, 0);
			d.setDate(d.getDate() + 4 - (d.getDay() || 7));
			var yearStart = new Date(d.getFullYear(), 0, 1);
			element.text(Math.ceil((((d - yearStart) / 86400000) + 1) / 7))
		});
	}
	return {
		link: toWeek
	}
})

// generate clickable tab
.directive('uuTab', function() {
	return {
		transclude: true,
		scope: {},
		controller: function($scope) {
			var panes = $scope.panes = [];

			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function(pane) {
				if (panes.length === 0) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
		},
		templateUrl: 'views/partial/directives/uutab.html'
	};
})

// content inner clickable tab
.directive('uuPane', function() {
	return {
		require: '^uuTab',
		transclude: true,
		scope: {
			title: '@',
			action: '&'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		templateUrl: 'views/partial/directives/uupane.html'
	};
})

// generate input field in form
.directive('uuInput', function() {
	return {
		scope: {
			label: '@',
			name: '@',
			lCol: '@',
			rCol: '@',
			lOffset: '@',
			rOffset: '@',
			type: '@',
			model: '='
		},
		templateUrl: 'views/partial/directives/uuinput.html'
	}
})

// generate raido field in form
.directive('uuTimeInicator', function() {
	return {
		scope: {
			label: '@',
			datetime: '@'
		},
		templateUrl: 'views/partial/directives/uutimeinicator.html'
	}
})

// generate raido field in form
.directive('uuInfoPanel', function() {
	return {
		transclude: true,
		templateUrl: 'views/partial/directives/uuinfopanel.html'
	}
})

// generate raido field in form
.directive('uuInfoTab', function() {
	return {
		transclude: true,
		scope: {
			title: '@'
		},
		templateUrl: 'views/partial/directives/uuinfotab.html'
	}
})
// generate raido field in form
.directive('uuInfoItem', function() {
	return {
		scope: {
			label: '@',
			value: '@',
			indicator: '@',
			unit: '@'
		},
		templateUrl: 'views/partial/directives/uuinfoitem.html'
	}
})

// generate raido field in form
.directive('uuSwitcher', function() {
	return {
		scope: {
			label: '@',
			ngChange: '&',
			model: '=',
			options: '='
		},
		templateUrl: 'views/partial/directives/uuswitcher.html'
	}
})

// generate raido field in form
.directive('uuFieldWrap', function() {
	return {
		transclude: true,
		scope: {
			label: '@',
			lCol: '@',
			lOffset: '@',
			rOffset: '@',
			rCol: '@'
		},
		templateUrl: 'views/partial/directives/uufieldwrap.html'
	}
})

// action buttion in page
.directive('uuActionItem', function() {
	return {
		scope: {
			label: '@',
			ngClick: '&',
			target: '@'
		},
		templateUrl: 'views/partial/directives/uuactionitem.html'
	}
})

// generate static field in form
.directive('uuStatic', function() {
	return {
		scope: {
			label: '@',
			lCol: '@',
			rCol: '@',
			text: '='
		},
		templateUrl: 'views/partial/directives/uustatic.html'
	}
})

// generate static field for phone in form
.directive('uuStaticPhone', function() {
	return {
		scope: {
			label: '@',
			name: '@',
			lCol: '@',
			rCol: '@',
			text: '=',
			main: '=',
		},
		templateUrl: 'views/partial/directives/uustaticphone.html'
	}
})

// generate simple search field
.directive('uuSimpleSearch', function() {
	return {
		scope: {
			model: '=?'
		},
		replace: true,
		link: function($scope, element, attrs) {
			$scope.required =  attrs.required ? 'required' : 'false';
			$scope.placeholder = attrs.placeholder ? attrs.placeholder : '请输入搜索关键字';
		},
		templateUrl: 'views/partial/directives/uusimplesearch.html'
	}
})

// generate search field
.directive('uuSearch', function() {
	return {
		transclude: true,
		scope: {
			placeholder: '@',
			ngSubmit: '&',
			lCol: '@',
			rCol: '@',
			offset: '@',
			model: '='
		},
		templateUrl: 'views/partial/directives/uusearch.html'
	}
})

/**
 * generate pagination
 *
 * @param int records 总记录数
 * @param int per-page 每页显示的记录数 default: 10
 * @param int max-pages 最多显示多少页 default: 10
 * @param function action 点击页码后调用的方法
 * @param object model 需要更新的model (最好在controller中初始化: $scope.searchModel = {})
 *
 * example:
 * <div uu-pagination records="1000" per-page="20" max-pages="10" action="search()" model="searchModel.toPage"></div>
 */

.directive('uuPagination', function() {
	return {
		scope: {
			records: '=',
			perPage: '=',
			maxPages: '=',
			action: '&',
			model: '='
		},
		link: function($scope, element, attrs, model) {

			var maxPages = $scope.maxPages || 10;
			var perPage = $scope.perPage || 20;
			var totalPages = Math.ceil($scope.records / perPage);
			var pages = betwwen(totalPages , 0, maxPages);
			var start = 1;
			var length = pages;
			$scope.current = 1;

			updatePagination();

			function updatePagination() {
				$scope.pages = [];

				for (var i = start; i < start + length; i++) {
					$scope.pages.push(i)
				}
				return pages;
			}

			$scope.prev = function() {
				$scope.current--;
				if ($scope.current < 1) {
					$scope.current =1;
				}
				perform();
			}

			$scope.to = function(page) {
				$scope.current = page;
				perform();
			}

			$scope.next = function() {
				$scope.current++;
				if ($scope.current > totalPages) {
					$scope.current = totalPages;
				}
				perform();
			}

			function perform() {
				var middlePage = start + Math.floor(length / 2);
				var offset = 0;

				if ($scope.current > middlePage) {
					offset = $scope.current - middlePage;
					start += offset;
				}

				if ($scope.current < middlePage) {
					offset = middlePage - $scope.current;
					start -= offset;
				}

				start = betwwen(start, 1, totalPages - length + 1)

				// update the model passed in
				$scope.model = {
					'toPage': $scope.current,
					'perPage': perPage
				}
				updatePagination();

			}

			// when current page changed, call function
			$scope.$watch('current', function(current, prev, scope) {
				if(angular.isDefined(current) && current !== null) {
					scope.action();
				}
			})

			function betwwen(val, min, max) {
				if (val < min) return min;
				if (val > max) return max;
				return val;
			}
		},
		templateUrl: 'views/partial/directives/pagination.html'
	}
})
.directive('uuAuthFilter', function(Auth) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			if (!Auth.authorize(attrs.uuAuthFilter)) {
				element.remove();
			}
		}
	}
})
