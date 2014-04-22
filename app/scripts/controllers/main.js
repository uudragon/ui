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
		scope.submitted = false;
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
			$scope.submitted = false;
			$scope.model = {};
			$scope.$parent.new($scope, "添加用户", type);
		}

		$scope.add = function(user, isValid) {
			$scope.submitted = true;
			if (!isValid) return;
			$scope.$parent.add($scope, user, type);
		}

		$scope.delete = function(user, index) {
			$scope.$parent.delete($scope, user.id, index, type);
		}

		$scope.modify = function(user) {
			$scope.submitted = false;
			// $scope.model = user;
			$scope.$parent.modify($scope, user, "编辑用户", type);
		}

		$scope.save = function(iuser, isValid) {
			$scope.submitted = true;
			if (!isValid) return;
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

		$scope.editPrivilege = function(role) {
			var setting = {
				view: {
					selectedMulti: false
				},
				check: {
					enable: true,
					chkboxType: { "Y" : "", "N" : "" }
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
				}
			};

			$scope.privilegeModalTitle = "修改角色";
			$scope.currentModel = role;
			UUDBasicService.getPrivileges($scope, role);
			UUDBasicService.getAllPrivileges($scope, setting);
		}

		$scope.savePrivilege = function() {
			var result = [];
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");
			var checkedNodes = zTree.getCheckedNodes();

			for (var i in checkedNodes) {
				result.push(checkedNodes[i].id);
			}

			var model = {
				id: $scope.currentModel.id,
				privileges: result.join(',')
			}

			UUDBasicService.update(model, 'privileges')

			$('#rolePrivilege').modal('hide');

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
		var type = 'privilege';

		UUDBasicService.buildPrivilegeTree(setting);

		function beforeEditName(treeId, treeNode) {
			current = treeNode;
			$scope.model = {
				id: current.id,
				pId: current.pId,
				name: current.name,
				link: current.link,
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
				link: treeNode.link,
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


		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
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

		// 保存更新的节点
		$scope.save = function(model) {
			// current.name = model.name;
			var zTree = $.fn.zTree.getZTreeObj("priv-tree");

			current.name = model.name;
			current.link = model.link;
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
						link: model.link,
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
			return false;
			console.log('beforeDrag');
		}
	})
