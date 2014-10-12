/**
 * Created by soulwu on 14-3-1.
 */
define([
	'common',
	'view/base',
	'text!tpl/widget/welcome.mustache'
], function($, BaseView, tpl) {
	var BackurlWidget = $.util.inherit(BaseView);

	$.extend(BackurlWidget.prototype, {
		el: '.J_welcome',

		tpl: tpl,

		events: {
			'click .J_go': 'go'
		},

		go: function(event) {
			$(".J_welcome").animate({
				translate3d: '0,-'+ $('.J_welcome').offset().height +'px,0'
			}, 500, 'ease-out',function(){
				$('.J_welcome').hide();
			})
		}
	});

	return BackurlWidget;
});