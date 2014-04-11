'use strict';

angular.module('authApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {
	// UUDBasicService.loadBasicInfo($scope);
	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.reloadSearch = function(scope, type) {
		// reset result
		scope.result = {};
		scope.page = 1;

		// init serchModel
		scope.searchModel = scope.searchModel || {};

		// reset pagination
		if (scope.searchModel.pagination) {
			scope.searchModel.pagination.toPage = 1;
		}

		this.search(scope, type);
	}

	$scope.search = function(scope, type) {
		UUDBasicService.search(scope, type)
	}

	$scope.new = function(scope, title, type) {
		scope.modalTitle = title;
		scope.modalType = "add";
		scope.model = {};

		if (type) {
			UUDBasicService.getGroups(scope, type);
		}
	}

	$scope.add = function(scope, model, type) {
		UUDBasicService.add(model, type);

		if (scope.searchModel) {
			this.reloadSearch(scope, type);
		}

		$('#uumodal').modal('hide');
	}

	$scope.delete = function(scope, id, index, type) {
		UUDBasicService.delete(id, type);
		scope.result.records.splice(index, 1);
	}

	$scope.modify = function(scope, model, title, type) {
		scope.modalTitle = title;
		scope.modalType = "edit";
		scope.model = angular.copy(model);

		if (type) {
			UUDBasicService.getGroups(scope, type);
		}
	}

	$scope.save = function(scope, newModel, type) {

		UUDBasicService.update(newModel, type)
		scope.result.records.map(function(model, index) {
			if (model.id == newModel.id) {
				scope.result.records[index] = newModel;
			}
		})
		$('#uumodal').modal('hide')
	}

})
	.controller('LoginCtrl', function ($scope, UUDBasicService) {

	})

	.controller('UserCtrl', function ($scope) {

		var type = 'user';

		$scope.reloadSearch = function() {
			$scope.$parent.reloadSearch($scope, type);
		}

		$scope.search = function() {
			$scope.$parent.search($scope, type)
		}

		$scope.new = function() {
			$scope.$parent.new($scope, "添加用户", type);
		}

		$scope.add = function(user) {
			$scope.$parent.add($scope, user, type);
		}

		$scope.delete = function(user, index) {
			$scope.$parent.delete($scope, user.id, index, type);
		}

		$scope.modify = function(user) {
			$scope.$parent.modify($scope, user, "编辑用户", type);
		}

		$scope.save = function(iuser) {
			$scope.$parent.save($scope, iuser, type);
		}

	})

	.controller('UgroupCtrl', function ($scope, UUDBasicService) {

		var type = 'userGroup';

		$scope.reloadSearch = function() {
			$scope.$parent.reloadSearch($scope, type);
		}

		$scope.search = function() {
			$scope.$parent.search($scope, type)
		}

		$scope.new = function() {
			$scope.$parent.new($scope, "添加组");
		}

		$scope.add = function(user) {
			$scope.$parent.add($scope, user, type);
		}

		$scope.delete = function(user, index) {
			$scope.$parent.delete($scope, user.id, index, type);
		}

		$scope.modify = function(user) {
			$scope.$parent.modify($scope, user, "编辑组");
		}

		$scope.save = function(iuser) {
			$scope.$parent.save($scope, iuser, type);
		}
	})

	.controller('RoleCtrl', function ($scope, UUDBasicService) {

		var type = 'role';

		$scope.reloadSearch = function() {
			$scope.$parent.reloadSearch($scope, type);
		}

		$scope.search = function() {
			$scope.$parent.search($scope, type)
		}

		$scope.new = function() {
			$scope.$parent.new($scope, "添加角色", type);
		}

		$scope.add = function(user) {
			$scope.$parent.add($scope, user, type);
		}

		$scope.delete = function(user, index) {
			$scope.$parent.delete($scope, user.id, index, type);
		}

		$scope.modify = function(user) {
			$scope.$parent.modify($scope, user, "编辑角色", type);
		}

		$scope.save = function(iuser) {
			$scope.$parent.save($scope, iuser, type);
		}
	})

	.controller('RgroupCtrl', function ($scope, UUDBasicService) {

		var type = 'roleGroup';

		$scope.reloadSearch = function() {
			$scope.$parent.reloadSearch($scope, type);
		}

		$scope.search = function() {
			$scope.$parent.search($scope, type)
		}

		$scope.new = function() {
			$scope.$parent.new($scope, "添加组");
		}

		$scope.add = function(user) {
			$scope.$parent.add($scope, user, type);
		}

		$scope.delete = function(user, index) {
			$scope.$parent.delete($scope, user.id, index, type);
		}

		$scope.modify = function(user) {
			$scope.$parent.modify($scope, user, "编辑组");
		}

		$scope.save = function(iuser) {
			$scope.$parent.save($scope, iuser, type);
		}
	})

	.controller('PrivilegeCtrl', function ($scope, UUDBasicService) {

		//	baisc settings
		var setting = {
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},
			edit: {
				enable: true,
				showRemoveBtn: true,
				showRenameBtn: true,
				removeTitle: '删除节点',
				renameTitle: '更新节点'
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				onRemove: onRemove,
				beforeEditName: beforeEditName
			}
		};

		var current;
		var type = 'previlege';

		UUDBasicService.getPrevilegeJSON(setting);

		function beforeEditName(treeId, treeNode) {
			current = treeNode;
			$scope.model = {
				id: current.id,
				pid: current.pid,
				name: current.name,
				url: current.url,
				other: current.other
			}
			$scope.modalTitle = '编辑节点';
			$scope.modalType = 'add';
			$scope.$apply();
			$('#uumodal').modal('show');
			return false;
		}

		function onRemove(e, treeId, treeNode) {
			console.log(treeNode);

			UUDBasicService.delete(treeNode.id, type);
		}


		function addHoverDom(treeId, treeNode) {
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;

			var parentNode = $("#" + treeNode.tId + "_span");
			var newNode = $("<span class='button add' id='addBtn_" + treeNode.tId
							+ "' title='add node' onfocus='this.blur();'></span>");

			parentNode.after(newNode);
			newNode.bind("click", function(){
				current = treeNode;
				addNote();
				return false;
			});
		};

		function addNote() {
			console.log('ok');
			$scope.model = {}
			$scope.modalTitle = '新增节点';
			$scope.modalType = 'add';
			$scope.$apply();
			$('#uumodal').modal('show');
		}

		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};

		$scope.save = function(model) {
			// current.name = model.name;
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			current.name = model.name;
			current.url = model.url;
			current.other = model.other;
			zTree.updateNode(current);

			UUDBasicService.updatePrevilege(zTree, model);
			$('#uumodal').modal('hide');
		}

		$scope.add = function(model) {
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			UUDBasicService.add(model, type);

			var newCount = 1;

			zTree.addNodes(current, {
				id: 100 + ++newCount,
				pId: current.id,
				name: model.name,
				url: model.url,
				other: model.other
			});

			$('#uumodal').modal('hide');
		}

		function beforeDrag(treeId, treeNode) {
			console.log('beforeDrag');
		}


	})
