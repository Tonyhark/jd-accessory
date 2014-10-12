define([
	'common',
	'view/base',
	'text!tpl/widget/confirm.mustache'
], function($, BaseView, tpl) {
	var View = $.util.inherit(BaseView);

	$.extend(View.prototype, {
		el: '#J_view_message',
		renderType: 'normal',
		tpl: tpl,

		events: {
			'click #J_button_confirm': 'confirm',
			'click #J_button_cancel': 'cancel'
		},
		afterRender: function(data) {

			//去掉确认框的移动事件
			$('.J_confirm').on('touchmove', function(event) {
				event.preventDefault();
			})
			var alertHeight = $('.J_confirm').offset().height;
			var offsetHeight = document.documentElement.clientHeight || document.body.clientHeight;
			$('.J_confirm').css({
				top: ((offsetHeight - alertHeight) / 2) + 'px'
			});
			//更改overlay的大小
			var offsetWidth = document.documentElement.clientWidth || document.body.clientWidth;
			if(offsetHeight < $('body').height()){
				offsetHeight = $('body').height();
			}
			$('.overlay').css({
				height: offsetHeight + 'px',
				width: offsetWidth + 'px'
			});
			//禁止滚动
			$('.overlay').on('touchmove', function(event) {
				event.preventDefault();
			});

		},
		confirm: function(event) {
			event.preventDefault();
			this.confirm_callback && this.confirm_callback();
		},
		cancel: function(event) {
			event.preventDefault();
			this.cancel_callback && this.cancel_callback();
			$(this.el).empty();
		},
		done: function() {
			$(this.el).empty();
		}
	});

	return View;
});