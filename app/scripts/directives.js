// timer
uud.directive('timing', ['$interval', 'dateFilter',
	function($interval, dateFilter) {
		var Counter = {
			createNew: function() {
				var counter = {
					h: 0,
					m: 0,
					s: 0
				};
				counter.add = function() {
					counter.s += 1;
					if (counter.s >= 60) {
						counter.m += 1;
						counter.s = 0;

						if (counter.m >= 60) {
							counter.h += 1;
							counter.m = 0;
						}
					}
				};
				counter.text = function() {
					function format(num) {
						if (!num) return '00';
						if (num < 10) return '0' + String(num);
						return String(num);
					}
					return format(counter.h) + ':' + format(counter.m) + ':' + format(counter.s);
				};
				return counter;
			}
		};

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
			element.text(Math.ceil((((d - yearStart) / 86400000) + 1) / 7));
		});
	}
	return {
		link: toWeek
	};
})

// get week form date
.directive('toFullWeek', function() {

	function toFullWeek(scope, element, attrs) {
		scope.$watch(attrs.toFullWeek, function(d) {
			if (!d) return;
			d = new Date(+d);
			d.setHours(0, 0, 0);
			d.setDate(d.getDate() + 4 - (d.getDay() || 7));
			var
				year = d.getFullYear(),
				month = d.getMonth() + 1,
				yearStart = new Date(year, 0, 1),
				week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

			element.text(year + '年 ' + month + '月 第' + week + '周');
		});
	}
	return {
		link: toFullWeek
	};
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
			scope.labelOffset = attrs.lOffset ? ('col-xs-offset-' + attrs.lOffset) : '';
			scope.inputCol = 'col-xs-' + (attrs.rCol || 4);
			scope.inputOffset = attrs.rOffset ? ('col-xs-offset-' + attrs.rOffset) : '';
			scope.type = attrs.type || 'text';
			scope.prefix = attrs.prefix || '';
		},
		template: '<div class="form-group">' +
						'<label class="control-label {{ labelCol }} {{ labelOffset }}" for="{{name}}">{{label}}:</label>' +
						'<div class="{{ inputCol }} {{ inputOffset }}">' +
							'<input type="{{ type }}" class="input-sm form-control" ng-model="model" name="{{name}}" id="{{name}}">' +
						'</div>' +
					'</div>'
	};
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
	};
})

// generate statistics field
.directive('uuInfoPanel', function() {
	return {
		transclude: true,
		template: '<div class="info-panel" ng-transclude></div>'
	};
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
	};
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
			scope.classname = attrs.classname || 'val';
		},
		template: '<span class="key" ng-if="label">{{label}}:</span>' +
				  '<span class="{{ classname }}">{{value}} <span class="unit" ng-if="unit">{{unit}}</span></span>' +
				  '<span class="time-indicator" ng-if="indicator"></span>'
	};
})

// confirm dialog, require plugin jquery.confirm
.directive('uuConfirm', function() {
	return {
		scope: {
			label: '@',
			confirm: '&',
			cancel: '&'
		},
		replace: true,
		link: function(scope, elem, attrs) {
			elem.confirm({
				text: attrs.text,
				title: attrs.title,
				confirm: function() {
					scope.confirm();
				},
				cancel: function(button) {
					scope.cancel();
				},
				confirmButton: attrs.confirmBtn || '确定',
				cancelButton: attrs.cancelBtn || '取消',
				confirmButtonClass: 'btn-danger'
			});
		},
		template: '<a href="">{{label}}</a>'
	};
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
	};
})

// generate raido field in form
.directive('uuFieldWrap', function() {
	return {
		transclude: true,
		scope: {
			label: '@',
			form: '=',
			name: '@'
		},
		require: '^form',
		replace: true,
		link: function($scope, $elem, $attrs, ctrl) {
			$scope.labelCol = 'col-xs-' + ($attrs.lCol || 4);
			$scope.inputCol = 'col-xs-' + ($attrs.rCol || 4);
			$scope.searchBtn = $attrs.searchBtn ? true : false;
			$scope.labelOffset = $attrs.lOffset ? ('col-xs-offset-' + $attrs.lOffset) : '';
			$scope.inputOffset = $attrs.rOffset ? ('col-xs-offset-' + $attrs.rOffset) : '';
		},
		template: '<div class="form-group" > ' +
					'<label ng-if="label" for="{{name}}" class="control-label {{ labelCol }} {{ labelOffset }}">{{label}}: </label>' +
					'<div class="{{ inputOffset }} {{ inputCol }}" ng-transclude></div>' +
					'<div class="col-xs-1" ng-if="searchBtn"><button class="btn btn-default btn-sm" type="submit"><span class="glyphicon glyphicon-search"></span></button></div>' +
				'</div>'
	};
})

// generate static field in form
.directive('uuStatic', function() {
	return {
		scope: {
			label: '@',
			text: '='
		},
		replace: true,
		link: function($scope, $elem, $attrs) {
			$scope.labelCol = 'col-xs-' + ($attrs.lCol || 4);
			$scope.inputCol = 'col-xs-' + ($attrs.rCol || 4);
		},
		template: '<div class="form-group">' +
					'<label class="control-label" ng-class="labelCol">{{label}}:</label>' +
					'<div ng-class="inputCol">' +
						'<p class="form-control-static">{{text}}</p>' +
					'</div>' +
				'</div>'
	};
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
	};
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
		restrict: 'E',
		replace: true,
		scope: {
			records: '=',
			action: '&',
			page: '=',
			model: '='
		},
		link: function($scope, $element, $attrs, model) {
			$scope.perPage = $attrs.perPage || config.perPage;
			$scope.current = $scope.page || 1;

			var maxPages = $attrs.maxPages || config.maxPages;
			var start = 1;

			updatePagination();

			$scope.prev = function() {
				$scope.to($scope.current - 1);
			};

			$scope.to = function(page, blnNotApply) {
				if (!blnNotApply) $scope.current = betwwen(page, 1, $scope.totalPages);
				updatePagination();
			};

			$scope.next = function() {
				// var totalPages = Math.ceil($scope.records / perPage);
				$scope.to($scope.current + 1);
			};

			// when current page changed, call function
			$scope.$watch('current', function(current, prev, scope) {
				if(current && current !== prev) {
					scope.action($scope.model);
				}
			});

			$scope.noPrev = function() {
				return $scope.current <= 1;
			}

			$scope.noNext = function() {
				return $scope.current >= $scope.totalPages;
			}

			function betwwen(val, min, max) {
				if (val < min) return min;
				if (val > max) return max;
				return val;
			}

			function updatePagination() {

				$scope.totalPages = Math.ceil($scope.records / $scope.perPage);
				$scope.aryTotalPage = [];

				var pages = betwwen($scope.totalPages , 0, maxPages);
				var middlePage = start + Math.floor(pages / 2);
				var offset = 0;

				for (var i = 1; i <= $scope.totalPages; i++) {
					$scope.aryTotalPage.push( i );
				}

				if ($scope.current > middlePage) {
					offset = $scope.current - middlePage;
					start += offset;
				}

				if ($scope.current < middlePage) {
					offset = middlePage - $scope.current;
					start -= offset;
				}

				start = betwwen(start, 1, $scope.totalPages - pages + 1);

				// update the model passed in
				$scope.model = {
					'toPage': $scope.current,
					'perPage': $scope.perPage
				};

				$scope.pages = [];

				for (var i = start; i < start + pages; i++) {
					$scope.pages.push(i);
				}

				return pages;
			}
		},
		template: '<div class="pagination-wraper" >' +
						'<ul class="pagination" ng-if="pages">' +
							'<li ng-class="{disabled : noPrev()}"><a href="" ng-click="to(1)" class="prev">&laquo;</a></li>' +
							'<li ng-class="{disabled : noPrev()}"><a href="" ng-click="prev()" class="prev">‹</a></li>' +
							'<li ng-repeat="page in pages" ng-class="{active : current === page}">' +
								'<a href="" ng-click="to(page)">{{page}}</a>' +
							'</li>' +
							'<li ng-class="{disabled : noNext()}"><a href="" ng-click="next()" class="next">›</a></li>' +
							'<li ng-class="{disabled : noNext()}"><a href="" ng-click="to(totalPages)" class="next">&raquo;</a></li>' +
							// '<li><a>第 ' +
							// 	'<select ng-model="current" class="select" ng-options="page for page in aryTotalPage" ng-change="to(current, true)">' +
							// 	'</select>' +
							// ' 页</a></li>' +
							'<li class="pagination-info"><a>共<span class="pagination-badge" ng-bind="totalPages"></span>页 / <span class="pagination-badge" ng-bind="records"></span>条</a></li>' +
							'<li class="pagination-info"><a>每页<span class="pagination-badge" ng-bind="perPage"></span>条</a></li>' +
							// '<li><a>{{current}}页</a></li>' +
						'</ul>' +
					'</div>'
	};
})

// check http://eternicode.github.io/bootstrap-datepicker for full documentation
// http://bootstrap-datepicker.readthedocs.org/en/release/index.html
.directive('uuDatePicker', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {
			ngModel: '='
		},
		link: function($scope, $element, $attrs, ctrl) {

			var settings = {
				format: $attrs.format || 'yyyy-mm-dd',
				startView: parseInt($attrs.startView, 10) || 0,
				minViewMode: parseInt($attrs.minViewMode, 10) || 0,
				endDate: $attrs.endDate || 0,
				todayHighlight: true,
				autoclose: true,
				language: 'zh-CN'
			};

			var validate = function(value) {
				// valid
				if (!value || /^\s*\d{4}-\d{1,2}(?:-\d{1,2})?\s*$/.test(value)) {
					ctrl.$setValidity('date', true);
					return value;
				} else {
					ctrl.$setValidity('date', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);

			$element.datepicker(settings);
		}
	};
})

.directive('uuAuthFilter', ['Auth', function(Auth) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {

			var accessCode = attrs.uuAuthFilter;
			var valid = false;

			if (accessCode) {
				Auth.getAccessLevels() && Auth.getAccessLevels()
					.success(function(data) {
						for (var i = data.length - 1; i >= 0; i--) {
							if (data[i].code == accessCode) {
								valid = true;
							}
						}

						if (!valid) {
							element.remove();
						}
					})
					.error(function(msg) {
						element.remove();
					});
			}

		}
	};
}])

.directive('uuNum', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^\s*\d*\s*$/.test(value)) {
					ctrl.$setValidity('digit', true);
					return value;
				} else {
					ctrl.$setValidity('digit', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuTooltip', function() {
	return {
		restrict: 'A',
		link: function($scope, elem) {
			elem.tooltip && elem.tooltip();
		}
	};
})

.directive('uuSidebar', function() {
	return {
		restrict: 'A',
		link: function($scope, elem) {
			var
				menus = elem.find('.nav-menu-label'),
				setions = elem.find('.nav-sections-label'),
				toggleFn = function() {
					$(this).next().slideToggle('fast', function() {
						$(this).parent('li').toggleClass('open');
					}).parents('li').siblings().find('ul.nav').slideUp('fast', function() {
						$(this).parent('li').removeClass('open');
					});
				};
			menus.on('click', toggleFn);
			// setions.on('click', toggleFn);
		}
	}
});
