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
.directive('uutab', function() {
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
.directive('uupane', function() {
	return {
		require: '^uutab',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addPane(scope);
		},
		templateUrl: 'views/partial/directives/uupane.html'
	};
})

// generate input field in form
.directive('uuinput', function() {
	return {
		scope: {
			label: '@',
			name: '@',
			lCol: '@',
			rCol: '@',
			type: '@',
			model: '='
		},
		templateUrl: 'views/partial/directives/uuinput.html'
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
.directive('uustatic', function() {
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
			placeholder: '@',
			ngSubmit: '&',
			lCol: '@',
			rCol: '@',
			offset: '@',
			model: '='
		},
		templateUrl: 'views/partial/directives/uusimplesearch.html'
	}
})
