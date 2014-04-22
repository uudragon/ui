'use strict';

angular.module('authApp')

.controller('MainCtrl', function ($scope, $routeSegment, loader, UUDBasicService) {

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	var success = function ($scope, successMsg, warningMsg, callback) {
		return function(data, status) {
			if( data.result ){
				$scope.alertMsg = successMsg;
				$scope.alertLevel = 'success';

				// fire callback
				if (angular.isFunction(callback)) {
					callback();
				}
			} else {
				$scope.alertLevel = 'warning';
				$scope.alertMsg = warningMsg + ' ';
				$scope.alertMsg += data.message ? data.message : '';
			}
		}
	}

	var error = function($scope, errorMsg) {
		return function(msg) {
			$scope.alertLevel = 'danger';
			$scope.alertMsg = errorMsg;
			if (msg) {
				$scope.alertMsg += ' ' + msg;
			}
		}
	}

	$scope.reloadSearch = function() {
		// reset result
		$scope.result = {};
		$scope.page = 1;

		// init serchModel
		$scope.searchModel = $scope.searchModel || {};

		// reset pagination
		if ($scope.searchModel.pagination) {
			$scope.searchModel.pagination.toPage = 1;
		}

		this.search();
	}

	$scope.search = function() {
		UUDBasicService.search($scope, $scope.objType)
	}

	$scope.new = function(form) {
		$scope.modalType = "add";
		$scope.model = {};
		form.$setPristine();
		$scope.submitted = false;

		switch ($scope.objType) {
			case 'user':
				$scope.modalTitle = '添加用户';
				break;
			case 'role':
				$scope.modalTitle = '添加角色';
				break;
			case 'userGroup':
				$scope.modalTitle = '添加组';
				break;

			default: break;
		}

		if ($scope.objType === 'user' || $scope.objType === 'role') {
			UUDBasicService.getGroups($scope, $scope.objType);
		}
	}

	$scope.add = function(model, isValid) {
		$scope.submitted = true;
		$scope.alertMsg = "";
		if (isValid) {

			UUDBasicService.add(model, $scope.objType)
				.success(success($scope, '添加成功!', '添加失败!'))
				.error(error($scope, '网络出错, 添加失败! '))

			$('#uumodal').modal('hide');
		}
	}


	$scope.save = function(newModel, isValid) {

		$scope.submitted = true;
		var callback = function() {
			$scope.result.records.map(function(model, index) {
				if (model.id == newModel.id) {
					$scope.result.records[index] = newModel;
				}
			})
		}

		if (isValid) {
			UUDBasicService.update(newModel, $scope.objType)
				.success( success($scope, '更新成功！', '更新失败！', callback) )
				.error( error($scope, '网络出错, 更新失败!'))

			$('#uumodal').modal('hide')
		}
	}

	$scope.modify = function(model) {
		$scope.modalType = "edit";
		$scope.model = angular.copy(model);
		$scope.submitted = false;
		$scope.alertMsg = "";
		switch ($scope.objType) {
			case 'user':
				$scope.modalTitle = '编辑用户';
				break;
			case 'role':
				$scope.modalTitle = '编辑角色';
				break;
			case 'userGroup':
				$scope.modalTitle = '编辑组';
				break;

			default: break;
		}

		if ($scope.objType === 'user' || $scope.objType === 'role') {
			UUDBasicService.getGroups($scope, $scope.objType);
		}
	}


	$scope.delete = function(model, index) {
		$scope.alertMsg = "";

		UUDBasicService.delete(model.id, $scope.objType)
			.success(function(data) {
				if( data.result ){
					$scope.alertMsg = '删除成功!';
					$scope.alertLevel = 'success';
					$scope.result.records.splice(index, 1);
				} else {
					$scope.alertLevel = 'warning';
					$scope.alertMsg = '删除失败! ';
					$scope.alertMsg += data.message ? data.message : '';
				}

			})
			.error( error($scope, '网络出错, 删除失败! ') );
	}


})
	.controller('LoginCtrl', function ($scope, UUDBasicService) {

	})

	.controller('UserCtrl', function ($scope, UUDBasicService, $controller) {

		var type = 'user';
		$scope.objType = 'user';
		$controller('MainCtrl', {$scope: $scope});

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

	.controller('UgroupCtrl', function ($scope, $controller) {
		$scope.objType = 'userGroup';
		$controller('MainCtrl', {$scope: $scope});
	})

	.controller('RoleCtrl', function ($scope, UUDBasicService, $controller) {

		$scope.objType = 'role';
		$controller('MainCtrl', {$scope: $scope});

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

	.controller('RgroupCtrl', function ($scope, $controller) {

		$scope.objType = 'roleGroup';
		$controller('MainCtrl', {$scope: $scope});
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
					$scope.alertMsg = '删除成功！';
					$scope.alertLevel = 'success';
					zTree.removeNode(treeNode);
				})
				.error(function(data, status) {
					$scope.alertMsg = '删除失败！';
					$scope.alertLevel = 'error';
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

			$scope.submitted = false;
			$scope.priForm.$setPristine();

			$scope.model.isRoot = isRoot ? true : false;
			if (!isRoot) {
				$scope.$apply();
			}
			$('#uumodal').modal('show');
		}

		// 保存更新的节点
		$scope.save = function(model, isValid) {
			$scope.submitted = true;
			if (isValid) {
				var zTree = $.fn.zTree.getZTreeObj("priv-tree");

				current.name = model.name;
				current.link = model.link;
				current.other = model.other;
				zTree.updateNode(current);

				UUDBasicService.update(model, type)
					.success(function(data, status) {
						$scope.alertMsg = '更新成功！';
						$scope.alertLevel = 'success';
					})
					.error(function(data, status) {
						$scope.alertMsg = '更新失败！';
						$scope.alertLevel = 'error';
					})

				$('#uumodal').modal('hide');
			}
		}

		$scope.add = function(model, isValid) {
			$scope.submitted = true;
			if (isValid) {
				var zTree = $.fn.zTree.getZTreeObj("priv-tree");

				if (!model.isRoot) {
					model.pId = current.id;
				}

				UUDBasicService.add(model, type)
					// 添加成功后，后台返回节点
					.success(function(node, status) {

						if (node) {
							// 添加成功后
							if (model.isRoot) {
								zTree.addNodes(null, node);
							} else {
								zTree.addNodes(current, node);
							}
							$scope.alertMsg = '添加成功！';
							$scope.alertLevel = 'success';
						} else {
							// 添加节点失败
							$scope.alertMsg = '添加失败！';
							$scope.alertLevel = 'warning';
						}

					})
					// 后台添加节点失败
					.error(function(data, status) {
						// 添加伪数据
						$scope.alertMsg = '添加失败！';
						$scope.alertLevel = 'danger';
					})

				$('#uumodal').modal('hide');
			}
		}

		function beforeDrag(treeId, treeNode) {
			return false;
		}
	})
