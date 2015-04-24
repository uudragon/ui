'use strict';

angular.module('mainApp')
.factory('dialog', function () {

	var $modal;

	var _options = {
		title: '提示',
		text: '确定执行操作吗?',
		yes: 1,
		cancel: 1,
		type: 'primary',
		yesLabel: '确定',
		autohide: 1,
		onyes: function() {},
		oncancel: function() {},
		cancalLabel: '取消'
	};

	var template = '<div class="modal fade sub-modal ng-scope">' +
					  '<div class="modal-dialog">' +
						'<div class="modal-content">' +
						  '<div class="modal-header">' +
							'<button data-dismiss="modal" aria-hidden="true" class="close">×</button>' +
							'<h4 class="modal-title" ng-bind="modalTitle"></h4>' +
						  '</div>' +
						  '<div class="modal-body"></div>' +
						  '<div class="modal-footer">' +
						  '</div>' +
						'</div>' +
					  '</div>' +
					'</div>';

	var Dialog = function(options) {
		// 快捷方法
		Dialog.confirm(options);
	};

	// 常规confirm
	Dialog.confirm = function(options) {
		Dialog.buildModal($.extend({}, _options, options));
		$modal.modal('show');
	};

	// 提示
	Dialog.info = function(options) {
		var params = {
			type: 'info',
			cancel: 0
		};

		Dialog.confirm($.extend(params, options));
	};

	// 警告
	Dialog.alert = function(options) {
		var params = {
			title: '警告!',
			type: 'danger',
			cancel: 0
		};

		Dialog.confirm($.extend(params, options));
	};

	Dialog.buildModal = function(options) {
		var content = document.createElement('p');

		content.innerHTML = options.text;

		if (typeof options.contentType === 'string') {
			content.className = 'text-' + options.contentType;
		}

		// modal
		$modal = $(template);

		// modal title
		$modal.find('.modal-title').html(options.title);

		// modal body
		$modal.find('.modal-body').html(content);

		// yes button
		if (options.yes) {
			var btnYes = document.createElement('button');

			btnYes.className = 'btn uu-btn';
			btnYes.innerHTML = options.yesLabel;

			btnYes.onclick = function() {
				options.onyes($modal, btnYes);
				if (options.autohide) $modal.modal('hide');
			};

			if (typeof options.type === 'string') btnYes.className += ' btn-' + options.type;

			$modal.find('.modal-footer').append(btnYes);
		}

		if (options.cancel) {
			var btnCancel = document.createElement('button');

			btnCancel.setAttribute('data-dismiss', 'modal');

			btnCancel.className = 'btn uu-btn';
			btnCancel.innerHTML = options.cancalLabel;

			btnCancel.onclick = function() {
				options.oncancel();
			};

			$modal.find('.modal-footer').append(btnCancel);
		}

		$modal.one('shown.bs.modal', function () {
			$modal.find('.btn-primary:first').focus();
		});

		$modal.one('hidden.bs.modal', function () {
			$modal.remove();
		});

		$('body').append($modal);
	};

	return Dialog;
});
