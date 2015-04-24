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

.directive('uuPrint', function() {
	return {
		transclude: true,
		scope: {
			uuPrint: '@'
		},
		controller: ['$scope', function($scope) {
			var panes = $scope.panes = [];

			$scope.print = function() {
				// var printWin = window.open('', 'print window', 'width=920px,height=auto,left=40,top=40,toolbar=0,status=0');
				// console.log($scope.uuPrint);
				// var data = $($scope.uuPrint).html();
				// console.log(data);
				// // var dupDoc = $(document.all[0].cloneNode(true));
				// printWin.document.write('<html><head><title>优优龙</title>');
				// printWin.document.write('<link rel="stylesheet" href="styles/main.css">');
				// printWin.document.write('</head><body >');
				// printWin.document.write(data);
				// printWin.document.write('</body></html>');
				// printWin.document.close(); // necessary for IE >= 10
				// printWin.focus(); // necessary for IE >= 10

				// printWin.print();
				// printWin.close();

				// dupDoc.find('.sort').removeClass('sort');
				// dupDoc.find('.col-xs-10').removeClass('col-xs-10');
				// dupDoc.find('.left-sidebar').remove();
				// dupDoc.find('.pg-info').remove();
				// dupDoc.find('.pagination-wraper').remove();
				// dupDoc.find('.action-bar').remove();
				// dupDoc.find('.article-header-filter').remove();
				// dupDoc.find('.btn-print').remove();

				// var printable = $(document).find('.printable');
				// dupDoc.find('body').html(printable.html());
				// printWin.document.write(dupDoc.html());
				// printWin.print();
			};
		}],
		template: '<a href="" ng-click="print()" class="jsglyph"><span class="glyphicon glyphicon-print"></span></a>'
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
		controller: ['$scope', function($scope) {
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
		}],
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
			element.attr && element.attr('title', '');
		},
		template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
	};
})

// confirm dialog, require plugin jquery.confirm
.directive('uuConfirm', ['dialog', function(dialog) {
	return {
		scope: {
			confirm: '&',
			cancel: '&',
			autoHide: '='
		},
		replace: true,
		link: function($scope, elem, attrs) {
			elem.on('click', function() {
				dialog.info({
					text: attrs.text,
					title: attrs.title,
					autohide: $scope.autoHide,
					cancel: 1,
					onyes: function(modal, btnYes) {
						if (!$scope.autoHide) {
							modal.modal('spinner');
							btnYes.setAttribute('disabled', true);

							$scope.confirm({
								onFine: function() {
									modal.modal('success');
									btnYes.removeAttribute('disabled');
								},
								onError: function() {
									modal.modal('fail');
									btnYes.removeAttribute('disabled');
								}
							});
						} else {
							$scope.confirm();
						}

					},
					oncancel: function(button) {
						$scope.cancel();
					}
				});
			});
		}
	};
}])

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
			perPage: '=',
			action: '&',
			current: '=page',
			model: '='
		},
		link: function($scope, $element, $attrs, model) {
			var maxPages = $attrs.maxPages || config.maxPages;
			var start = 1;

			$scope.prev = function() {
				$scope.to($scope.current - 1);
			};

			$scope.to = function(pageNo) {
				var lastPageNo = $scope.current;
				$scope.current = betwwen(pageNo, 1, $scope.totalPages);

				if ($scope.current !== lastPageNo) {
					updatePagination();
					$scope.action($scope.model);
				}
			};

			$scope.next = function() {
				// var totalPages = Math.ceil($scope.records / perPage);
				$scope.to($scope.current + 1);
			};

			// when current page changed, call function
			$scope.$watch('current', function(current, prev, scope) {
				if(current && current !== prev) {
					updatePagination();
				}
			});

			$scope.$watch('records', function(current, prev, scope) {
				updatePagination();
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
				$scope.model.pageNo = $scope.current;
				$scope.model.pageSize = $scope.perPage;
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
							'<li class="pagination-info"><a>第<span class="pagination-badge" ng-bind="totalPages"></span>页 / 共<span class="pagination-badge" ng-bind="totalPages"></span>页</a></li>' +
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
					startView: $.isNumeric(startView) ? startView : 3,
					minView: $.isNumeric(minView) ? minView : 2,
					endDate: $attrs.endDate || 0,
					todayHighlight: true,
					forceParse: true,
					autoclose: true,
					language: 'zh-CN'
				};

			var validate = function(value) {
				// valid
				if (!value || /^\s*\d{4}-\d{1,2}(?:-\d{1,2})?(?:\s\d{2}\:\d{2})?\s*$/.test(value)) {
					ctrl.$setValidity('date', true);
					return value;
				} else {
					ctrl.$setValidity('date', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
			$element.datetimepicker(settings)
				.on('changeDate', function(e) {
					$scope.ngModel = $element.val();
				});
		}
	};
})

.directive('uuAuthFilter', ['Auth', function(Auth) {
	return {
		restrict: 'A',
		link: function($scope, element, attrs) {
			var accessCode = attrs.uuAuthFilter;

			if (accessCode) {
				// Auth.getResource().indexOf(accessCode) === -1 && (element.remove());
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

.directive('ngMin', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			ngMin: '='
		},
		link: function ($scope, elem, attr, ctrl) {
			var validate = function(value) {
				if (!value || value > $scope.ngMin) {
					ctrl.$setValidity('ngMin', true);
					return value;
				} else {
					ctrl.$setValidity('ngMin', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('ngMax', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			ngMax: '='
		},
		link: function ($scope, elem, attr, ctrl) {
			var validate = function(value) {
				if (!value || value < $scope.ngMax) {
					ctrl.$setValidity('ngMax', true);
					return value;
				} else {
					ctrl.$setValidity('ngMax', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuEmail', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)) {
					ctrl.$setValidity('email', true);
					return value;
				} else {
					ctrl.$setValidity('email', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuAddress', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /(?=[\u4e00-\u9fa5])[\s\S]*/.test(value)) {
					ctrl.$setValidity('address', true);
					return value;
				} else {
					ctrl.$setValidity('address', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuName', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^[\u4e00-\u9fa5a-zA-Z \.]*$/.test(value)) {
					ctrl.$setValidity('name', true);
					return value;
				} else {
					ctrl.$setValidity('name', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuFloat', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^\s*[-+]?[0-9]*\.?[0-9]+\s*$/.test(value)) {
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

.directive('uuPhone', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
					ctrl.$setValidity('phone', true);
					return value;
				} else {
					ctrl.$setValidity('phone', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuTel', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
					ctrl.$setValidity('tel', true);
					return value;
				} else {
					ctrl.$setValidity('tel', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

.directive('uuIsbn', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/.test(value)) {
					ctrl.$setValidity('isbn', true);
					return value;
				} else {
					ctrl.$setValidity('isbn', false);
					return undefined;
				}
			};
			ctrl.$parsers.push(validate);
			ctrl.$formatters.push(validate);
		}
	};
})

// .directive('uuAddrSelector', ['cityProvincesData', function(uuAddrSelector) {
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			ngProvinceModel: '=',
// 			ngAddrModel: '=',
// 			ngRequired: '=',
// 			ngDisabled: '=',
// 			ngCityModel: '='
// 		},
// 		link: function($scope, elem, attrs, ctrl) {

// 			var $panel = $elem.find('.panels');
// 			console.log(uuAddrSelector);

// 			$scope.showPanels = function() {
// 				console.log('show panels');
// 			}
// 		},
// 		template: '<input ng-click="showPanels()">' +
// 			'<div class="panels">' +
// 			'</div>'
// 	}
// }])

.directive('uuCitySelect', ['cityData', function(cityData) {
	return {
		restrict: 'C',
		scope: {
			ngProvinceModel: '=',
			ngRequired: '=',
			ngDisabled: '=',
			ngCityModel: '=',
			ngAreaModel: '='
		},
		link: function($scope, elem, attrs, ctrl) {
			$scope.provinces = cityData;

			function getProvinceID() {
				var index = -1;
				$scope.provinces.forEach(function(province, i) {
					if ($scope.ngProvinceModel === province.p || $scope.ngProvinceModel === province.p + '省') {
						index = i;
						$scope.ngProvinceModel = province.p;
						return;
					}
				});
				return index;
			}

			function getCityID() {
				var index = -1;
				$scope.cities.forEach(function(city, i) {
					if ($scope.ngCityModel === city.n) {
						index = i;
						return;
					}
				});
				return index;
			}

			$scope.$watch('ngProvinceModel', function() {
				if ($scope.ngProvinceModel) $scope.reloadCity();
			});

			$scope.$watch('ngCityModel', function() {
				if ($scope.ngCityModel) $scope.reloadArea();
			});

			$scope.reloadCity = function() {
				var provinceID = getProvinceID(),
					cityData = $scope.provinces[provinceID];

				if (cityData && cityData.c) {
					$scope.cities = cityData.c;
					$scope.ngCityModel = cityData.c[0].n;
				} else {
					$scope.cities = [];
				}
			};

			$scope.reloadArea = function() {
				var cityID = getCityID(),
					cityData = $scope.cities[cityID];

				if (cityData && cityData.a) {
					$scope.areas = cityData.a;
					$scope.ngAreaModel = cityData.a[0].s;
				} else {
					$scope.areas = [];
					$scope.ngAreaModel = '';
				}
			};

		},
		template: '<div>' +
					'<label class="form-addr-label">省</label>' +
					'<select ng-disabled="ngDisabled" ng-required="ngRequired" class="prov form-control input-sm" ng-options="p.p as p.p for p in provinces" ng-model="ngProvinceModel"></select>' +
					'<label ng-show="ngProvinceModel" class="form-addr-label">市</label>' +
					'<select ng-disabled="ngDisabled" ng-show="ngProvinceModel" ng-required="ngRequired" class="city form-control input-sm" ng-options="c.n as c.n for c in cities" ng-model="ngCityModel"></select>' +
					'<label ng-show="areas.length" class="form-addr-label">区 / 县</label>' +
					'<select ng-disabled="ngDisabled" ng-show="areas.length" ng-required="ngRequired && areas.length" class="city form-control input-sm" ng-options="c.s as c.s for c in areas" ng-model="ngAreaModel"></select>' +
				'</div>'
	};
}])
.directive('uuTooltip', function() {
	return {
		restrict: 'A',
		link: function($scope, elem) {
			if (elem.tooltip) elem.tooltip();
		}
	};
})
.directive('uuTable', function() {
	return {
		restrict: 'A',
		scope: {
			uuTable: '='
		},
		link: function($scope, elem) {
			console.log($scope.uuTable);
			if ($scope.uuTable) {
				elem.show();
			} else {
				elem.hide().prepend('<div>no data</div>');
			}
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
			var isSortable = $scope.uuSort;

			if (isSortable) {
				 elem.on('click', function() {

					$scope.action({
						name: $scope.sortName,
						type: elem.hasClass('sort-asc') ? 'desc' : 'asc'
					});

					elem.siblings('.sort').removeClass('sort-desc').removeClass('sort-asc');

					if (elem.hasClass('sort-asc')) {
						elem.addClass('sort-desc').removeClass('sort-asc');
					} else {
						elem.removeClass('sort-desc').addClass('sort-asc');
					}
				});
			}
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
				navItems = elem.find('.nav-item'),
				toggleFn = function() {
					$(this).next().slideToggle('fast', function() {
						$(this).removeAttr('style').parent('li').toggleClass('open');
					}).parents('li').siblings().find('ul.nav').slideUp('fast', function() {
						$(this).removeAttr('style').parent('li').removeClass('open');
					});
				};

			menus.on('click', toggleFn);
			setions.on('click', toggleFn);
		}
	};
})

.directive('uuPlainDatetime', function() {
	return {
		scope: {
			ngModel: '='
		},
		restrict: 'E',
		// replace: true,
		link: function($scope, elem) {
			var
				d = new Date(),
				thisYear = d.getFullYear(),
				years = [thisYear, thisYear + 1],
				month = [],
				dates = [];

			console.log('here');
			console.log(years);

		},
		template: '<select ng-options="year for year in years"></select>' +
				  '<label>年</label>' +
				  '<select>' +
				  '</select>'
	};
})

.directive('uuPieChart', function() {
	return {
		scope: {
			data: '='
		},
		restrict: 'A',
		link: function($scope, elem, attrs, ctrl) {
			var w = 400;
			var h = 300;
			var r = 100;
			var ir = 45;
			var textOffset = 14;
			var tweenDuration = 500;
			var title = attrs.header || '';
			var data = $scope.data;

			if (!angular.isArray(data)) {
				return;
			}

			//OBJECTS TO BE POPULATED WITH DATA LATER
			var lines, valueLabels, nameLabels;
			var pieData = [];
			var oldPieData = [];
			var filteredPieData = [];

			//D3 helper function to populate pie slice parameters from array data
			var donut = d3.layout.pie().value(function(d){
				return d.value;
			});

			//D3 helper function to create colors from an ordinal scale
			var color = d3.scale.category20();

			//D3 helper function to draw arcs, populates parameter "d" in path object
			var arc = d3.svg.arc()
			.startAngle(function(d){ return d.startAngle; })
			.endAngle(function(d){ return d.endAngle; })
			.innerRadius(ir)
			.outerRadius(r);


			///////////////////////////////////////////////////////////
			// CREATE VIS & GROUPS ////////////////////////////////////
			///////////////////////////////////////////////////////////

			var vis = d3.select(elem[0]).append('svg:svg')
			.attr('width', w)
			.attr('height', h);

			//GROUP FOR ARCS/PATHS
			var arc_group = vis.append('svg:g')
			.attr('class', 'arc')
			.attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

			//GROUP FOR LABELS
			var label_group = vis.append('svg:g')
			.attr('class', 'label_group')
			.attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

			//GROUP FOR CENTER TEXT
			var center_group = vis.append('svg:g')
			.attr('class', 'center_group')
			.attr('transform', 'translate(' + (w/2) + ',' + (h/2) + ')');

			//GROUP FOR TITLE TEXT
			var title_group = vis.append('svg:g')
			.attr('class', 'title_group')
			.attr('transform', 'translate(' + (w/2) + ',' + 0 + ')');

			title_group.append('svg:text')
			.attr('class', 'title-label')
			.attr('dy', 12)
			.attr('text-anchor', 'middle') // text-align: right
			.text(title);

			//PLACEHOLDER GRAY CIRCLE
			// var paths = arc_group.append("svg:circle")
			// .attr("fill", "#EFEFEF")
			// .attr("r", r);

			///////////////////////////////////////////////////////////
			// CENTER TEXT ////////////////////////////////////////////
			///////////////////////////////////////////////////////////

			//WHITE CIRCLE BEHIND LABELS
			var whiteCircle = center_group.append('svg:circle')
			.attr('fill', 'white')
			.attr('r', ir);

			// 'TOTAL' LABEL
			var activeLabel = center_group.append('svg:text')
			.attr('class', 'label')
			.attr('dy', -12)
			.attr('text-anchor', 'middle'); // text-align: right

			//TOTAL TRAFFIC VALUE
			var activeValue = center_group.append('svg:text')
			.attr('class', 'total')
			.attr('dy', 10)
			.attr('text-anchor', 'middle'); // text-align: right


			///////////////////////////////////////////////////////////
			// STREAKER CONNECTION ////////////////////////////////////
			///////////////////////////////////////////////////////////

			// var updateInterval = window.setInterval(update, 1500);
			drawPie();
			// to run each time data is generated
			function drawPie() {

				var totalOctets = 0;

				oldPieData = filteredPieData;
				pieData = donut(data);
				filteredPieData = pieData.filter(filterData);

				function filterData(element, index, array) {
					element.name = data[index].name;
					element.value = data[index].value;
					totalOctets += element.value;
					return (element.value > 0);
				}

				if(filteredPieData.length > 0 ){
					//DRAW ARC PATHS
					var paths = arc_group.selectAll('path').data(filteredPieData);
					paths.enter().append('svg:path')
						.attr('stroke', 'white')
						.attr('stroke-width', 0.5)
						.attr('fill', function(d, i) { return color(i); })
						.on('mouseover', function(d, i) {
							activeLabel.text(d.name);
							activeValue.text(d.value);
							d3.select(this).style({opacity:'0.8'});
						})
						.on('mouseout', function(d, i) {
							activeLabel.text('');
							activeValue.text('');
							d3.select(this).style({opacity:'1'});
						})
						.transition()
						.duration(tweenDuration)
						.attrTween('d', pieTween);
					paths
						.transition()
						.duration(tweenDuration)
						.attrTween('d', pieTween);
					paths.exit()
						.transition()
						.duration(tweenDuration)
						.attrTween('d', removePieTween)
						.remove();

					//DRAW TICK MARK LINES FOR LABELS
					lines = label_group.selectAll('line').data(filteredPieData);
					lines.enter().append('svg:line')
						.attr('x1', 0)
						.attr('x2', 0)
						.attr('y1', -r-3)
						.attr('y2', -r-8)
						.attr('stroke', 'gray')
						.attr('transform', function(d) {
							return 'rotate(' + (d.startAngle+d.endAngle)/4 * (180/Math.PI) + ')';
						});
					lines.transition()
						.duration(tweenDuration)
						.attr('transform', function(d) {
							return 'rotate(' + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ')';
						});
					lines.exit().remove();

					//DRAW LABELS WITH PERCENTAGE VALUES
					valueLabels = label_group.selectAll('text.value').data(filteredPieData)
					.attr('dy', function(d){
						if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
							return 5;
						} else {
							return -7;
						}
					})
					.attr('text-anchor', function(d){
						if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
							return 'beginning';
						} else {
							return 'end';
						}
					})
					.text(function(d){
						return d.value;
					});

					valueLabels.enter().append('svg:text')
					.attr('class', 'value')
					.attr('transform', function(d) {
						return 'translate(' + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + ',' + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ')';
					})
					.attr('dy', function(d){
						if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
							return 5;
						} else {
							return -7;
						}
					})
					.attr('text-anchor', function(d){
						if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
							return 'beginning';
						} else {
							return 'end';
						}
					}).text(function(d){
						var percentage = (d.value/totalOctets)*100;
						return percentage.toFixed(1) + '%';
						// return d.value;
					});

					valueLabels.transition().duration(tweenDuration).attrTween('transform', textTween);

					valueLabels.exit().remove();


					//DRAW LABELS WITH ENTITY NAMES
					nameLabels = label_group.selectAll('text.units').data(filteredPieData)
					.attr('dy', function(d){
						if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
							return 17;
						} else {
							return 5;
						}
					})
					.attr('text-anchor', function(d){
						if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
							return 'beginning';
						} else {
							return 'end';
						}
					}).text(function(d){
						return d.name;
					});

					nameLabels.enter().append('svg:text')
					.attr('class', 'units')
					.attr('transform', function(d) {
						return 'translate(' + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + ',' + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ')';
					})
					.attr('dy', function(d){
						if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
							return 17;
						} else {
							return 5;
						}
					})
					.attr('text-anchor', function(d){
						if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
							return 'beginning';
						} else {
							return 'end';
						}
					}).text(function(d){
						return d.name;
					});

					nameLabels.transition().duration(tweenDuration).attrTween('transform', textTween);

					nameLabels.exit().remove();

				}
			}

			///////////////////////////////////////////////////////////
			// FUNCTIONS //////////////////////////////////////////////
			///////////////////////////////////////////////////////////

			// Interpolate the arcs in data space.
			function pieTween(d, i) {
				var s0;
				var e0;
				if(oldPieData[i]){
					s0 = oldPieData[i].startAngle;
					e0 = oldPieData[i].endAngle;
				} else if (!(oldPieData[i]) && oldPieData[i-1]) {
					s0 = oldPieData[i-1].endAngle;
					e0 = oldPieData[i-1].endAngle;
				} else if(!(oldPieData[i-1]) && oldPieData.length > 0){
					s0 = oldPieData[oldPieData.length-1].endAngle;
					e0 = oldPieData[oldPieData.length-1].endAngle;
				} else {
					s0 = 0;
					e0 = 0;
				}
				i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
				return function(t) {
					var b = i(t);
					return arc(b);
				};
			}

			function removePieTween(d, i) {
				var s0 = 2 * Math.PI;
				var e0 = 2 * Math.PI;
				i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
				return function(t) {
					var b = i(t);
					return arc(b);
				};
			}

			function textTween(d, i) {
				var a;
				if(oldPieData[i]){
					a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
				} else if (!(oldPieData[i]) && oldPieData[i-1]) {
					a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
				} else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
					a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
				} else {
					a = 0;
				}
				var b = (d.startAngle + d.endAngle - Math.PI)/2;

				var fn = d3.interpolateNumber(a, b);
				return function(t) {
					var val = fn(t);
					return 'translate(' + Math.cos(val) * (r+textOffset) + ',' + Math.sin(val) * (r+textOffset) + ')';
				};
			}
		}
	};
})

.directive('uuBarChart', function() {
	return {
		scope: {
			data: '='
		},
		link: function($scope, elem, attrs) {
			var
				margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = 400 - margin.left - margin.right,
				height = 280 - margin.top - margin.bottom,
				data= $scope.data;

			var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], 0.1);

			var y = d3.scale.linear()
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.ticks(10);

			var svg = d3.select(elem[0]).append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			x.domain(data.map(function(d) { return d.name; }));
			y.domain([0, d3.max(data, function(d) { return d.value; })]);

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis);

			svg.append('g')
				.attr('class', 'y axis')
				.call(yAxis)
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '.71em')
				.style('text-anchor', 'end')
				.text('value');

			svg.selectAll('.bar')
				.data(data)
				.enter().append('rect')
				.attr({
					y: height,
					height: 0
				})
				.transition()
				.attr('class', 'bar')
				.attr({
					x: function(d) { return x(d.name); },
					y: function(d) { return y(d.value); },
					width: x.rangeBand(),
					height: function(d) { return height - y(d.value); }
				});

			function type(d) {
			  d.value = +d.value;
			  return d;
			}
		}
	};
});
