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

	.controller('UserCtrl', function ($scope, UUDBasicService) {

		var type = 'user';

		// $scope.$parent.reloadSearch($scope, type);

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

		$scope.editRole = function(user) {

			$scope.roleModalTitle = "修改角色";
			$scope.currentModel = user;

			UUDBasicService.getRoles($scope, user);
			UUDBasicService.getAllRoles($scope);
		}

		$scope.select = function(id, roles) {
			for (var i in roles) {
				if (roles[i].id == id) {
					roles[i].actived = true;
				} else {
					roles[i].actived = false;
				}
			}
		}

		$scope.saveRoles = function() {
			var roles = [];
			for (var i in $scope.roles) {
				roles.push($scope.roles[i].id);
			}
			var model = {
				id: $scope.currentModel.id,
				roles: roles.join(',')
			}

			UUDBasicService.update(model, 'roles')

			$('#rolemodal').modal('hide');
		}

		$scope.addRoleToUser = function(role) {
			var role = role || findSelectedRole($scope.allRoles);
			if (role) {
				$scope.roles.push(role);
			}
		}

		function findSelectedRole(roles) {
			for (var i in roles) {
				if (roles[i].actived) {
					return roles[i];
				}
			}
		}

		function removeRole(roles, role) {
			for (var i in roles) {
				if (roles[i].id == role.id) {
					roles.splice(i, 1);
				}
			}
		}

		$scope.removeRoleFromUser = function(role) {
			var role = role || findSelectedRole($scope.roles);

			if (role) {
				removeRole($scope.roles, role);
			}
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

	.controller('RoleCtrl', function ($scope, UUDBasicService, $filter) {

		var type = 'role';

		var setting = {
			view: {
				selectedMulti: false
			},
			edit: {
				enable: false,
				showRemoveBtn: false,
				showRenameBtn: false
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: 0
				}
			},
			callback: {
				onDblClick: onDblClick
			}
		};

		$scope.$parent.reloadSearch($scope, type);

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

		function onDblClick(event, treeId, treeNode) {
			$scope.privileges = $scope.privileges || [];

			removeNode(treeNode);

			$scope.privileges.push(treeNode);
			$scope.$apply();
		}

		function removeNode(treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");
			zTree.removeNode(treeNode);
		}

		$scope.editPrivilege = function(role) {
			$scope.privilegeModalTitle = "修改角色";
			$scope.currentModel = role;
			UUDBasicService.getPrivileges($scope, role);
			UUDBasicService.getAllPrivileges($scope, setting);
		}

		$scope.savePrivilege = function() {
			var result = [];
			var pris = $filter('filterPrivilege')($scope.privileges, $scope.allPrivileges);

			for (var i in pris) {
				result.push(pris[i].id);
			}

			var model = {
				id: $scope.currentModel.id,
				privileges: result.join(',')
			}

			UUDBasicService.update(model, 'privilege')

			$('#rolePrivilege').modal('hide');

		}

		$scope.removePrivilegeFromRole = function(privilege) {
			for (var i in $scope.privileges) {
				removeNode(privilege);
			}

			function removeNode(node) {
				if ($scope.privileges[i].id == node.id) {
					$scope.privileges.splice(i, 1);
				}
			}

			function getIndexById(id) {
				for (var i in $scope.privileges) {
					if ($scope.privileges[i].id == id ) {
						return i;
					}
				}
			}

			function isFamily(nodeA, nodeB) {
				if (nodeA.pId == nodeB.id) {
					return true;
				} else {
					while (nodeA.pId) {
						var nodeA = getNodeById(nodeA.pId);
						if (nodeA) {
							return isFamily(nodeA, nodeB)
						}
					}
				}
				return false;
			}

			function getNodeById(id) {
				for (var i in $scope.allPrivileges) {
					if ($scope.allPrivileges[i].id == id) {
						return $scope.allPrivileges[i];
					}
				}
				return false;
			}

			UUDBasicService.rebuildTree($scope.allPrivileges, $scope.privileges, setting);
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
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: 0
				}
			},
			callback: {
				beforeDrag: beforeDrag,
				beforeRemove: beforeRemove,
				beforeEditName: beforeEditName,
				beforeDrop: beforeDrop
			}
		};

		var current;
		var type = 'previlege';

		UUDBasicService.buildPrivilegeTree(setting);

		function beforeEditName(treeId, treeNode) {
			current = treeNode;
			$scope.model = {
				id: current.id,
				pId: current.pId,
				name: current.name,
				url: current.url,
				other: current.other
			}
			$scope.modalTitle = '编辑节点';
			$scope.modalType = 'edit';
			$scope.$apply();
			$('#uumodal').modal('show');
			return false;
		}

		function beforeRemove(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			UUDBasicService.delete(treeNode.id, type)
				.success(function(data, status) {
					// 后台成功删除节点后前端再删除节点
					zTree.removeNode(treeNode);
				})
				.error(function(data, status) {
					console.log('delete ' + type + ' error status:' + status);
					// 后台删除节点失败，测试起见，前端暂时删除节点
					zTree.removeNode(treeNode);
				})
			return false;
		}

		function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {

			var treeNode = treeNodes[0];
			var model = {
				name: treeNode.name,
				url: treeNode.url,
				other: treeNode.other
			}

			current = targetNode;

			if (!isCopy) {
				beforeRemove('', treeNodes[0])
			}

			console.log(moveType);

			$scope.add(model);

			return false;
		}

		function addHoverDom(treeId, treeNode) {
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;

			var parentNode = $("#" + treeNode.tId + "_span");
			var newNode = $("<span class='button add' id='addBtn_" + treeNode.tId
							+ "' title='add node' onfocus='this.blur();'></span>");

			parentNode.after(newNode);
			newNode.bind("click", function(){
				current = treeNode;
				$scope.createNode();
				return false;
			});
		};

		function removeNode(treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			zTree.removeNode(treeNode)
		}

		// 新增节点，初始化弹出层
		$scope.createNode = function(isRoot) {
			$scope.model = {}
			$scope.modalTitle = '新增节点';
			$scope.modalType = 'add';
			$scope.model.isRoot = isRoot ? true : false;
			if (!isRoot) {
				$scope.$apply();
			}
			$('#uumodal').modal('show');
		}

		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};

		// 保存更新的节点
		$scope.save = function(model) {
			// current.name = model.name;
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			current.name = model.name;
			current.url = model.url;
			current.other = model.other;
			zTree.updateNode(current);

			UUDBasicService.update(model, type)
				.success(function(data, status) {
					return true;
				})
				.error(function(data, status) {
					console.log('update ' + type + ' error status:' + status);
					return false;
				})

			$('#uumodal').modal('hide');

		}

		$scope.add = function(model) {
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			if (!model.isRoot) {
				model.pId = current.id;
			}

			UUDBasicService.add(model, type)
				// 添加成功后，后台返回节点
				.success(function(node, status) {
					if (model.isRoot) {
						zTree.addNodes(null, node);
					} else {
						zTree.addNodes(current, node);
					}
				})
				// 后台添加节点失败
				.error(function(data, status) {
					console.log('add Note Error');

					// 添加伪数据
					var node = {
						id: Math.floor(Math.random() * 10000),
						name: model.name,
						url: model.url,
						other: model.other
					};

					if (model.isRoot) {
						zTree.addNodes(null, node);
					} else {
						zTree.addNodes(current, node);
					}
				})

			$('#uumodal').modal('hide');
		}

		function beforeDrag(treeId, treeNode) {
			console.log('beforeDrag');
		}
	})
