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
							'<li class="pagination-info"><a>第<span class="pagination-badge" ng-bind="totalPages"></span>页 / 共<span class="pagination-badge" ng-bind="records"></span>条</a></li>' +
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
				if (!value || /^\s*\d{11}\s*$/.test(value)) {
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

.directive('uuIsbn', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, elem, attrs, ctrl) {
			var validate = function(value) {
				if (!value || /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/.test(value)) {
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

.directive('uuCitySelect', function() {
	return {
		restrict: 'C',
		scope: {
			ngProvinceModel: '=',
			ngAddrModel: '=',
			ngRequired: '=',
			ngCityModel: '='
		},
		link: function($scope, elem, attrs, ctrl) {
			var $province = elem.find('.prov');

			$scope.provinces = [{name:'北京市', city: [{name:'北京市'}]}, {name:'天津市', city: [{name:'天津市'}]}, {name:'上海市', city: [{name:'上海市'}]}, {name:'重庆市', city: [{name:'重庆市'}]}, {name: '河北省', city: [{name: '石家庄市'}, {name: '唐山市'}, {name: '秦皇岛市'}, {name: '邯郸市'}, {name: '邢台市'}, {name: '保定市'}, {name: '张家口市'}, {name: '承德市'}, {name: '沧州市'}, {name: '廊坊市'}, {name: '衡水市'}]}, {name: '山西省', city: [{name: '太原市'}, {name: '大同市'}, {name: '阳泉市'}, {name: '长治市'}, {name: '晋城市'}, {name: '朔州市'}, {name: '忻州市'}, {name: '吕梁市'}, {name: '晋中市'}, {name: '临汾市'}, {name: '运城市'}, {name: '内蒙古'}, {name: '呼和浩特市'}, {name: '包头市'}, {name: '乌海市'}, {name: '赤峰市'}, {name: '呼伦贝尔市'}, {name: '兴安盟'}, {name: '通辽市'}, {name: '锡林郭勒盟'}, {name: '乌兰察布市'}, {name: '鄂尔多斯市 '}, {name: '巴彦淖尔盟'}, {name: '阿拉善盟'}]}, {name: '辽宁省', city: [{name: '沈阳市'}, {name: '大连市'}, {name: '鞍山市'}, {name: '抚顺市'}, {name: '本溪市'}, {name: '丹东市'}, {name: '锦州市'}, {name: '营口市'}, {name: '阜新市'}, {name: '辽阳市'}, {name: '盘锦市'}, {name: '铁岭市'}, {name: '朝阳市'}, {name: '葫芦岛市'}]}, {name: '吉林省', city: [{name: '长春市'}, {name: '吉林市'}, {name: '四平市'}, {name: '辽源市'}, {name: '通化市'}, {name: '白山市'}, {name: '松原市'}, {name: '白城市'}, {name: '延边朝鲜族自治州'}]}, {name: '黑龙江省', city: [{name: '哈尔滨市'}, {name: '齐齐哈尔市'}, {name: '鸡西市'}, {name: '鹤岗市'}, {name: '双鸭山市'}, {name: '大庆市'}, {name: '伊春市'}, {name: '佳木斯市'}, {name: '七台河市'}, {name: '牡丹江市'}, {name: '黑河市'}, {name: '绥化市'}, {name: '大兴安岭地区'}]}, {name: '江苏省', city: [{name: '南京市'}, {name: '无锡市'}, {name: '徐州市'}, {name: '常州市'}, {name: '苏州市'}, {name: '南通市'}, {name: '连云港市'}, {name: '淮安市'}, {name: '盐城市'}, {name: '扬州市'}, {name: '镇江市'}, {name: '泰州市'}, {name: '宿迁市'}]}, {name: '浙江省', city: [{name: '杭州市'}, {name: '宁波市'}, {name: '温州市'}, {name: '嘉兴市'}, {name: '湖州市'}, {name: '绍兴市'}, {name: '金华市'}, {name: '衢州市'}, {name: '舟山市'}, {name: '台州市'}, {name: '丽水市'}]}, {name: '安徽省', city: [{name: '合肥市'}, {name: '芜湖市'}, {name: '蚌埠市'}, {name: '淮南市'}, {name: '马鞍山市'}, {name: '淮北市'}, {name: '铜陵市'}, {name: '安庆市'}, {name: '黄山市'}, {name: '滁州市'}, {name: '阜阳市'}, {name: '宿州市'}, {name: '六安市'}, {name: '宣城市'}, {name: '毫州市'}, {name: '池州市'}]}, {name: '福建省', city: [{name: '福州市'}, {name: '厦门市'}, {name: '宁德市'}, {name: '莆田市'}, {name: '泉州市'}, {name: '漳州市'}, {name: '龙岩市'}, {name: '三明市'}, {name: '南平市'}]}, {name: '江西省', city: [{name: '南昌市'}, {name: '景德镇市'}, {name: '萍乡市'}, {name: '九江市'}, {name: '新余市'}, {name: '鹰潭市'}, {name: '赣州市'}, {name: '宜春市'}, {name: '上饶市'}, {name: '吉安市'}, {name: '抚州市'}]}, {name: '山东省', city: [{name: '济南市'}, {name: '青岛市'}, {name: '淄博市'}, {name: '枣庄市'}, {name: '东营市'}, {name: '烟台市'}, {name: '潍坊市'}, {name: '济宁市'}, {name: '泰安市'}, {name: '威海市'}, {name: '日照市'}, {name: '莱芜市'}, {name: '临沂市'}, {name: '德州市'}, {name: '聊城市'}, {name: '滨州市'}, {name: '菏泽市'}]}, {name: '河南省', city: [{name: '郑州市'}, {name: '开封市'}, {name: '洛阳市'}, {name: '平顶山市'}, {name: '安阳市'}, {name: '鹤壁市'}, {name: '新乡市'}, {name: '焦作市'}, {name: '濮阳市'}, {name: '许昌市'}, {name: '漯河市'}, {name: '三门峡市'}, {name: '南阳市'}, {name: '商丘市'}, {name: '信阳市'}, {name: '周口市'}, {name: '驻马店地区'}, {name: '济源市'}]}, {name: '湖北省', city: [{name: '武汉市'}, {name: '黄石市'}, {name: '十堰市'}, {name: '宜昌市'}, {name: '襄阳市'}, {name: '鄂州市'}, {name: '荆门市'}, {name: '孝感市'}, {name: '荆州市'}, {name: '黄冈市'}, {name: '咸宁市'}, {name: '随州市'}, {name: '恩施土家族苗族自治州'}, {name: '仙桃市'}, {name: '潜江市'}, {name: '天门市'}, {name: '神农架林区'}]}, {name: '湖南省', city: [{name: '长沙市'}, {name: '株洲市'}, {name: '湘潭市'}, {name: '衡阳市'}, {name: '邵阳市'}, {name: '岳阳市'}, {name: '常德市'}, {name: '张家界市'}, {name: '益阳市'}, {name: '郴州市'}, {name: '永州市'}, {name: '怀化市'}, {name: '娄底地区'}, {name: '湘西土家族苗族自治州'}]}, {name: '广东省', city: [{name: '广州市'}, {name: '韶关市'}, {name: '深圳市'}, {name: '珠海市'}, {name: '汕头市'}, {name: '佛山市'}, {name: '江门市'}, {name: '湛江市'}, {name: '茂名市'}, {name: '肇庆市'}, {name: '惠州市'}, {name: '梅州市'}, {name: '汕尾市'}, {name: '河源市'}, {name: '阳江市'}, {name: '清远市'}, {name: '东莞市'}, {name: '中山市'}, {name: '潮州市'}, {name: '揭阳市'}, {name: '云浮市'}]}, {name: '广西壮族自治区', city: [{name: '南宁市'}, {name: '柳州市'}, {name: '桂林市'}, {name: '梧州市'}, {name: '北海市'}, {name: '防城港市'}, {name: '钦州市'}, {name: '贵港市'}, {name: '玉林市'}, {name: '崇左市'}, {name: '来宾市'}, {name: '贺州市'}, {name: '百色市'}, {name: '河池市'}]}, {name: '海南省', city: [{name: '省直辖县'}, {name: '海口市'}, {name: '三亚市'}]}, {name: '四川省', city: [{name: '成都市'}, {name: '自贡市'}, {name: '攀枝花市'}, {name: '泸州市'}, {name: '德阳市'}, {name: '绵阳市'}, {name: '广元市'}, {name: '遂宁市'}, {name: '内江市'}, {name: '乐山市'}, {name: '南充市'}, {name: '宜宾市'}, {name: '广安市'}, {name: '达州市'}, {name: '雅安市'}, {name: '阿坝藏族羌族自治州'}, {name: '甘孜藏族自治州'}, {name: '凉山彝族自治州'}, {name: '巴中市'}, {name: '眉山市'}, {name: '资阳市'}, {name: '贵州'}, {name: '贵阳市'}, {name: '六盘水市'}, {name: '遵义市'}, {name: '铜仁市'}, {name: '黔西南布依族苗族自治州'}, {name: '毕节地区'}, {name: '安顺市'}, {name: '黔东南苗族侗族自治州'}, {name: '黔南布依族苗族自治州'}]}, {name: '云南省', city: [{name: '昆明市'}, {name: '曲靖市'}, {name: '玉溪市'}, {name: '昭通市'}, {name: '楚雄彝族自治州'}, {name: '红河哈尼族彝族自治州'}, {name: '文山壮族苗族自治州'}, {name: '普洱市'}, {name: '西双版纳傣族自治州'}, {name: '大理白族自治州'}, {name: '保山市'}, {name: '德宏傣族景颇族自治州'}, {name: '丽江市'}, {name: '怒江傈僳族自治州'}, {name: '迪庆藏族自治州'}, {name: '临沧市'}]}, {name: '西藏', city: [{name: '拉萨市'}, {name: '昌都地区'}, {name: '山南地区'}, {name: '日喀则地区'}, {name: '那曲地区'}, {name: '阿里地区'}, {name: '林芝地区'}]}, {name: '陕西省', city: [{name: '西安市'}, {name: '铜川市'}, {name: '宝鸡市'}, {name: '咸阳市'}, {name: '渭南市'}, {name: '延安市'}, {name: '汉中市'}, {name: '安康市'}, {name: '商洛市'}, {name: '榆林市'}]}, {name: '甘肃省', city: [{name: '兰州市'}, {name: '嘉峪关市'}, {name: '金昌市'}, {name: '白银市'}, {name: '天水市'}, {name: '酒泉市'}, {name: '张掖市'}, {name: '武威市'}, {name: '定西市'}, {name: '陇南市'}, {name: '平凉市'}, {name: '庆阳市'}, {name: '临夏自治州'}, {name: '甘南藏族自治州'}]}, {name: '青海省', city: [{name: '西宁市'}, {name: '海东地区'}, {name: '海北藏族自治州'}, {name: '黄南藏族自治州'}, {name: '海南藏族自治州'}, {name: '果洛藏族自治州'}, {name: '玉树藏族自治州'}, {name: '海西蒙古族藏族自治州'}]}, {name: '宁夏回族自治区', city: [{name: '银川市'}, {name: '石嘴山市'}, {name: '吴忠市'}, {name: '固原市'}, {name: '中卫市'}]}, {name: '新疆维吾尔自治区', city: [{name: '乌鲁木齐市'}, {name: '克拉玛依市'}, {name: '吐鲁番地区'}, {name: '哈密地区'}, {name: '昌吉自治州'}, {name: '博尔塔拉蒙古自治州'}, {name: '巴音郭楞蒙古自治州'}, {name: '阿克苏地区'}, {name: '克孜勒苏柯尔克孜自治州'}, {name: '喀什地区'}, {name: '和田地区'}, {name: '伊犁哈萨克自治州'}, {name: '塔城地区'}, {name: '阿勒泰地区'}, {name: '直辖县'}]}, {name: '台湾省', city: [{name: '台北市'}, {name: '高雄市'}, {name: '基隆市'}, {name: '台中市'}, {name: '台南市'}, {name: '新竹市'}, {name: '嘉义市'}, {name: '直辖县'}]}, {name: '香港特别行政区', city: [{name: '香港岛'}, {name: '九龙'}, {name: '新界'}]}, {name: '澳门特别行政区', city: [{name: '澳门半岛'}, {name: '澳门离岛'}, {name: '路氹城'}]}];

			function getProvinceID() {
				var index = -1;
				$scope.provinces.forEach(function(province, i) {
					if ($scope.ngProvinceModel === province.name) {
						index = i;
						return;
					}
				});
				return index;
			}

			$scope.reloadCity = function(a, b) {
				var provinceID = getProvinceID(),
					cityData = $scope.provinces[provinceID];

				console.log(provinceID);
				if(cityData && cityData.city) {
					$scope.cities = cityData.city;
					$scope.ngCityModel = cityData.city[0].name;
				}
			};
		},
		template: '<div>' +
					'<label class="form-addr-label">省</label>' +
					'<select ng-required="ngRequired" class="prov form-control input-sm" ng-change="reloadCity()" ng-options="p.name as p.name for p in provinces" ng-model="ngProvinceModel"></select>' +
					'<label ng-show="ngProvinceModel" class="form-addr-label">市</label>' +
					'<select ng-show="ngProvinceModel" ng-required="ngRequired" class="city form-control input-sm" ng-options="c.name as c.name for c in cities" ng-model="ngCityModel"></select>' +
					'<label class="form-addr-label">详细</label>' +
					'<input ng-required="ngRequired" class="form-control input-sm" ng-model="ngAddrModel">' +
				'</div>'
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

.directive('uuFormField', function() {
	return {
		scope: {
			isFiledEnable: '=uuFormField'
		},
		restrict: 'A',
		link: function($scope, elem) {
			$scope.$watch('isFiledEnable', function(val) {
				if (val) {
					elem.attr('disabled', false);
				} else {
					elem.attr('disabled', true);
				}
			});
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
				.attr({
					class: 'bar',
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
