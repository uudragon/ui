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
			};

			$scope.noNext = function() {
				return $scope.current >= $scope.totalPages;
			};

			function betwwen(val, min, max) {
				if (val < min) return min;
				if (val > max) return max;
				return val;
			}

			function updatePagination() {

				$scope.totalPages = Math.ceil($scope.records / $scope.perPage);
				$scope.aryTotalPage = [];

				var
					pages = betwwen($scope.totalPages , 0, maxPages),
					middlePage = start + Math.floor(pages / 2),
					offset = 0,
					i;

				for (i = 1; i <= $scope.totalPages; i++) {
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

				for (i = start; i < start + pages; i++) {
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

			var
				startView = parseInt($attrs.startView, 10),
				minView = parseInt($attrs.minView, 10),
				settings = {
					format: $attrs.format || 'yyyy-mm-dd',
					weekStart: 1,
					startView: $.isNumeric(startView) ? startView : 2,
					minView: $.isNumeric(minView) ? minView : 2,
					endDate: $attrs.endDate || 0,
					todayHighlight: true,
					forceParse: true,
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
			$element.datetimepicker(settings);
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
			if (elem.tooltip) elem.tooltip();
		}
	};
})

.directive('uuSort', function() {
	return {
		restrict: 'A',
		priority: -10000,
		scope: {
			uuSort: '=',
			sortName: '=',
			action: '&'
		},
		link: function($scope, elem, attrs) {
			var
				isSortable = $scope.uuSort;
			isSortable && elem.on('click', function() {

				$scope.action({
					name: $scope.sortName,
					type: elem.hasClass('sort-asc') ? 'desc' : 'asc'
				});

				elem.siblings('.sort').removeClass('sort-desc').removeClass('sort-asc');

				elem.hasClass('sort-asc') ?
					elem.addClass('sort-desc').removeClass('sort-asc') :
					elem.removeClass('sort-desc').addClass('sort-asc');
			});
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
	};
})

.directive('uuFormField', function() {
	return {
		scope: {
			isFiledEnable: '=uuFormField'
		},
		restrict: 'A',
		link: function($scope, elem) {
			$scope.$watch('isFiledEnable', function(val) {
				val ? elem.attr('disabled', false) :  elem.attr('disabled', true);
			});
		}
	};
});
