define([
	'common',
	'view/base',
	'text!tpl/widget/alert.mustache'
], function($, BaseView, tpl) {
	var Widget = $.util.inherit(BaseView);

	$.extend(Widget.prototype, {
		el: '#J_view_message',
		renderType: 'normal',
		tpl: tpl,

		events: {
			'click #J_button_ok': 'ok'
		},
		afterRender: function(data) {
			
			//去掉确认框的移动事件
			$('.J_alert').on('touchmove', function(event) {
				event.preventDefault();
			})
			//处理提示框高度
			var alertHeight = $('.J_alert').offset().height;
			var offsetHeight = document.documentElement.clientHeight || document.body.clientHeight;

			$('.J_alert').css({top:((offsetHeight-alertHeight)/2 )+'px'});
			//alert-overlay
			var offsetWidth = document.documentElement.clientWidth || document.body.clientWidth;
			if(offsetHeight < $('body').height()){
				offsetHeight = $('body').height();
			}
			$('.alert-overlay').css({height:offsetHeight+'px',width:offsetWidth+'px'});
			//禁止滚动
			$('.alert-overlay').on('touchmove', function(event) {
				event.preventDefault();
			});
		},
		ok: function(event) {
			event.preventDefault();
			this.callback && this.callback();
			$(this.el).empty();
		}
	});

	return Widget;
});