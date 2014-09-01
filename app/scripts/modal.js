+function($){
	var Modal = function(element, options) {
		this.$element = $(element);
		this.options = options;
		this.isShown = null;
		this.$body = $('body');
	};

	Modal.prototype.show = function(_relateTarget) {
		var self = this;
		if (this.isShown) return;

		this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

		this.$body.addClass('modal-open');

		self.isShown = true;

		this.backdrop(function() {

			self.$element
				.show()
				.scrollTop(0);

			self.$element
				.addClass('in')
				.attr('aria-hidden', false)

			var e = $.Event('shown.bs.modal', {
				_relateTarget: _relateTarget
			})


			self.$element.trigger('focus').trigger(e)

		});
	};

	Modal.prototype.hide = function(first_argument) {
		if (!this.isShown) return;
		this.isShown = false;

		this.$body.removeClass('modal-open');
		this.$element.removeClass('in')
			.attr('aria-hidden', true)
			.off('click.dismiss.bs.modal');

		this.$element
			.hide();
		if (this.$backdrop) {
			this.$backdrop.remove()
			this.$backdrop = null;
		}
	};

	Modal.prototype.toggle = function(_relateTarget) {
		this.isShown ? this.hide() : this.show(_relateTarget);
	};

	Modal.prototype.removeModal = function(_relateTarget) {
		if (this.$backdrop) {
			this.$backdrop.remove()
			this.$backdrop = null;
		}
	};

	Modal.prototype.backdrop = function(callback) {
		var animate = 'fade';

		if (this.isShown) {
			this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body);
			this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
				if (e.target !== e.currentTarget) return;
				this.hide();
			}, this));

			this.$backdrop.addClass('in');
		} else if (this.$backdrop){

		}
		if (callback) callback();
	};

	var Plugin = function(option) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('bs.modal');

			if (!data) $this.data('bs.modal', (data = new Modal(this, {})))

			data[option]();
		});
	};

	$(document).on('click.bs.modal', '[data-toggle="modal"]', function() {
		var
			$this = $(this),
			$target = $($this.attr('data-target'))


		Plugin.call($target, 'toggle');
	});
}(jQuery);
