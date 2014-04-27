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
		template: '<div class="bs-tabs">' +
					'<ul class="nav nav-tabs">' +
						'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}" ng-click="pane.action()">' +
							'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
						'</li>' +
					'</ul>' +
					'<div class="tab-content" ng-transclude></div>' +
				  '</div>'
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
		template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
	};
})

// generate input field in form
.directive('uuInput', function() {
	return {
		scope: {
			label: '@',
			name: '@',
			model: '=?'
		},
		link: function(scope, elem, attrs) {
			scope.labelCol = 'col-xs-' + (attrs.lCol || 4);
			scope.labelOffset = attrs.lOffset ? ('col-xs-' + attrs.lOffset) : '';
			scope.inputCol = 'col-xs-' + (attrs.rCol || 4);
			scope.inputOffset = attrs.rOffset ? ('col-xs-' + attrs.rOffset) : '';
			scope.type = attrs.type || 'text';
			scope.prefix = attrs.prefix || '';
		},
		template: '<div class="form-group">' +
						'<label class="control-label {{ labelCol }} {{ labelOffset }}" for="{{name}}">{{label}}:</label>' +
						'<div class="{{ inputCol }} {{ inputOffset }}">' +
							'<input type="{{ type }}" class="input-sm form-control" ng-model="model" name="{{name}}" id="{{name}}">' +
						'</div>' +
					'</div>'
	}
})

// generate raido field in form
.directive('uuTimeInicator', function() {
	return {
		scope: {
			label: '@',
			datetime: '@'
		},
		template: '<span class="key" ng-if="label">{{label}}:</span>' +
					'<span class="val">{{datetime}}</span>' +
					'<span class="time-indicator"></span>'
	}
})

// generate statistics field
.directive('uuInfoPanel', function() {
	return {
		transclude: true,
		template: '<div class="info-panel" ng-transclude></div>'
	}
})

// generate statistics field
.directive('uuInfoTab', function() {
	return {
		transclude: true,
		scope: {
			title: '@'
		},
		template: '<h3 class="info-panel-title" ng-if="title">{{title}}</h3>' +
					'<ul class="list-inline info-panel-content" ng-transclude></ul>'
	}
})

// generate statistics field
.directive('uuInfoItem', function() {
	return {
		scope: {
			label: '@',
			value: '@',
			indicator: '@',
			unit: '@'
		},
		link: function(scope, elem, attrs) {
			scope.class = attrs.class || 'val';
		},
		template: '<span class="key" ng-if="label">{{label}}:</span>' +
				  '<span class="{{ class }}">{{value}} <span class="unit" ng-if="unit">{{unit}}</span></span>' +
				  '<span class="time-indicator" ng-if="indicator"></span>'
	}
})

// generate raido field in form
.directive('uuSwitcher', function() {
	return {
		scope: {
			label: '@',
			ngChange: '&',
			modify: '&',
			export: '&',
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
 			records: '=?',
 			perPage: '=?',
 			maxPages: '=',
 			action: '&',
 			current: '=page?',
 			model: '='
 		},
 		link: function($scope, $element, attrs, model) {

 			var maxPages = $scope.maxPages || config.maxPages;
 			var perPage = $scope.perPage || config.perPage;
 			var start = 1;

 			updatePagination();

 			$scope.current = $scope.current || 1;

 			function updatePagination() {
 				var totalPages = Math.ceil($scope.records / perPage);
 				var pages = betwwen(totalPages , 0, maxPages);
 				var middlePage = start + Math.floor(pages / 2);
 				var offset = 0;

 				if ($scope.current > middlePage) {
 					offset = $scope.current - middlePage;
 					start += offset;
 				}

 				if ($scope.current < middlePage) {
 					offset = middlePage - $scope.current;
 					start -= offset;
 				}


 				start = betwwen(start, 1, totalPages - pages + 1)

 				// update the model passed in
 				$scope.model = {
 					'toPage': $scope.current,
 					'perPage': perPage
 				}

 				$scope.pages = [];

 				for (var i = start; i < start + pages; i++) {
 					$scope.pages.push(i)
 				}

 				// hide pagination when there is only one page
 				if (pages <= 1) {
 					$element.css('display', 'none');
 				}
 				return pages;
 			}

 			$scope.prev = function() {
 				$scope.current--;
 				if ($scope.current < 1) {
 					$scope.current =1;
 				}
 				updatePagination();
 			}

 			$scope.to = function(page) {
 				$scope.current = page;
 				updatePagination();
 			}

 			$scope.next = function() {
 				var totalPages = Math.ceil($scope.records / perPage);
 				$scope.current++;
 				if ($scope.current > totalPages) {
 					$scope.current = totalPages;
 				}
 				updatePagination();
 			}

 			// when current page changed, call function
 			$scope.$watch('current', function(current, prev, scope) {
 				if(current && current !== prev) {
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

// check http://eternicode.github.io/bootstrap-datepicker for full documentation
.directive('uuDatePicker', function() {
	return {
		restrict: 'A',
		scope: {
			ngModel: '='
		},
		link: function($scope, $element, $attrs) {
			
			var settings = {
				format: $attrs.format || 'yyyy-mm-dd',
				startView: parseInt($attrs.startView, 10) || 0,
				minViewMode: parseInt($attrs.minViewMode, 10) || 0,
				endDate: $attrs.endDate || 0,
				autoclose: true,
				language: "zh-CN"
			}

			$element.datepicker(settings)
		}
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

