'use strict';

angular.module('mainApp')
.controller('ParamsCtrl', ['$scope', '$controller', function ($scope, $controller) {

}])
/**
 * Sub-Controller
 * ---------------------------------------------------------------------------------
 */

.controller('ParamsManager', ['$scope', '$controller', function ($scope, $controller) {


	// inherit functions from parent
	$controller('ProductCtrl', {$scope: $scope});

}])
.controller('System', ['$scope', '$controller', '$filter', '$http', function ($scope, $controller, $filter, $http) {

	var $sytsemContactForm = $('#system-contact');

	// 修改联系信息
	$scope.editContactInfo = function(form) {
		$scope.resetForm(form);
		$scope.contactCloned = angular.copy($scope.contact);
		$sytsemContactForm.modal('show');
	};

	// 保存联系信息
	$scope.saveContactInfo = function(form) {
		$scope.isContactEditable = false;

		if (!$scope.validateForm(form, $sytsemContactForm)) return;
		$scope.processing(form, $sytsemContactForm);

		$http.post(config.basews + 'communication/', $scope.contact)
			.success($scope.onFine({
				form: form,
				$form: $sytsemContactForm,
				action: function() {
					$scope.contact = $scope.contactCloned;
				}
			}))
			.error($scope.onError({
				form: form,
				$form: $sytsemContactForm
			}));
	};

}]);
