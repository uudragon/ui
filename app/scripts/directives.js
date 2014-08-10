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
		scope: {
			records: '=',
			perPage: '=',
			maxPages: '=',
			action: '&',
			current: '=page',
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


				start = betwwen(start, 1, totalPages - pages + 1);

				// update the model passed in
				$scope.model = {
					'toPage': $scope.current,
					'perPage': perPage
				};

				$scope.pages = [];

				for (var i = start; i < start + pages; i++) {
					$scope.pages.push(i);
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
			};

			$scope.to = function(page) {
				$scope.current = page;
				updatePagination();
			};

			$scope.next = function() {
				var totalPages = Math.ceil($scope.records / perPage);
				$scope.current++;
				if ($scope.current > totalPages) {
					$scope.current = totalPages;
				}
				updatePagination();
			};

			// when current page changed, call function
			$scope.$watch('current', function(current, prev, scope) {
				if(current && current !== prev) {
					scope.action();
				}
			});

			function betwwen(val, min, max) {
				if (val < min) return min;
				if (val > max) return max;
				return val;
			}
		},
		template: '<div class="pagination-wraper">' +
						'<ul class="pagination">' +
							'<li><a href="" ng-click="prev()" class="prev">&laquo;</a></li>' +
							'<li ng-repeat="page in pages" ng-class="{active : current == page}">' +
								'<a href="" ng-click="to(page)">{{page}}</a>' +
							'</li>' +
							'<li><a href="" ng-click="next()" class="next">&raquo;</a></li>' +
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

.directive('uuAuthFilter', function(Auth) {
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
})

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
			elem.tooltip();
		}
	};
})

.directive('uuPieChart', function() {
	return {
		scope: {
			data: '='
		},
		restrict: 'A',
		link: function($scope, elem, attrs, ctrl) {
			var w = 300;
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
			// var paths = arc_group.append('svg:circle')
			// .attr('fill', '#EFEFEF')
			// .attr('r', r);

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
					paths = arc_group.selectAll('path').data(filteredPieData);
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
						return d.value;
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
				var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
				return function(t) {
					var b = i(t);
					return arc(b);
				};
			}

			function removePieTween(d, i) {
				s0 = 2 * Math.PI;
				e0 = 2 * Math.PI;
				var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
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

.directive('uuLineChart', function() {
	return {
		scope: {
			data: '='
		},
		link: function($scope, elem, attrs) {
			var data = $scope.data,
			w = 320,
			h = 200,
			margin = 20,
			y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]),
			x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin]);
			var vis = d3.select(elem[0])
			.append('svg:svg')
			.attr('width', w)
			.attr('height', h);

			var g = vis.append('svg:g')
			.attr('transform', 'translate(0, 200)');

			var line = d3.svg.line()
			.x(function(d,i) { return x(i); })
			.y(function(d) { return -1 * y(d); });

			g.append('svg:path')
			.attr('class', 'line-path')
			.attr('d', line(data));

			g.append('svg:line')
			.attr('x1', x(0))
			.attr('y1', -1 * y(0))
			.attr('x2', x(w))
			.attr('y2', -1 * y(0));

			g.append('svg:line')
			.attr('x1', x(0))
			.attr('y1', -1 * y(0))
			.attr('x2', x(0))
			.attr('y2', -1 * y(d3.max(data)));

			g.selectAll('.xLabel')
			.data(x.ticks(5))
			.enter().append('svg:text')
			.attr('class', 'xLabel')
			.text(String)
			.attr('x', function(d) { return x(d) })
			.attr('y', 0)
			.attr('text-anchor', 'middle');

			g.selectAll('.yLabel')
			.data(y.ticks(4))
			.enter().append('svg:text')
			.attr('class', 'yLabel')
			.text(String)
			.attr('x', 0)
			.attr('y', function(d) { return -1 * y(d) })
			.attr('text-anchor', 'right')
			.attr('dy', 4);

			g.selectAll('.xTicks')
			.data(x.ticks(5))
			.enter().append('svg:line')
			.attr('class', 'xTicks')
			.attr('x1', function(d) { return x(d); })
			.attr('y1', -1 * y(0))
			.attr('x2', function(d) { return x(d); })
			.attr('y2', -1 * y(-0.3));
			 
			g.selectAll('.yTicks')
			.data(y.ticks(4))
			.enter().append('svg:line')
			.attr('class', 'yTicks')
			.attr('y1', function(d) { return -1 * y(d); })
			.attr('x1', x(-0.3))
			.attr('y2', function(d) { return -1 * y(d); })
			.attr('x2', x(0));
		}
	};
})
