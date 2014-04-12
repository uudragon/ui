'use strict';

angular.module('authApp')
.filter('gender', function () {
	return function (gender) {
		return gender == 1 ? "男" : "女";
	}
})
.filter('valid', function () {
	return function (valid) {
		return valid == 1 ? "有效" : "无效";
	}
})
.filter('filterRole', function () {
	return function (roles, userRoles) {

		if (!roles) return;
		var result = [];

		for (var i = 0; i < roles.length; i++) {
			var selected = false;
			for (var j in userRoles) {
				if (roles[i].id === userRoles[j].id) {
					selected = true;
				}
			}
			if (!selected) {
				result.push(roles[i]);
			}
		}
		return result;
	}
})
.filter('filterPrivilege', function () {
	return function (privileges, allPrivileges) {
		if (!privileges) return;

		function isChild(nodeA, nodeB) {
			if (nodeA.pId == nodeB.id && getNodeById(nodeB.id, privileges)) {
				return true;
			} else {
				while(nodeA.pId) {
					var nodeA = getNodeById(nodeA.pId, allPrivileges);
					if (nodeA) {
						return isChild(nodeA, nodeB);
					}
				}
			}

			return false;
		}

		function getNodeById(id, scope) {
			for (var i in scope) {
				if (scope[i].id == id) {
					return scope[i];
				}
			}

			return false;
		}

		var result = [];

		for (var i = 0; i < privileges.length; i++) {
			var isChildNode = false;
			for (var j in privileges) {
				if (isChild(privileges[i], privileges[j])) {
					isChildNode = true;
					break;
				}
			}
			if (!isChildNode) {
				result.push(privileges[i]);
			}
		}
		return result;
	}
})
