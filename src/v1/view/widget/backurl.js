/**
 * Created by soulwu on 14-3-1.
 */
define([
	'common',
	'view/base',
	'text!tpl/widget/backurl.mustache'
], function($, BaseView, tpl) {
	var BackurlWidget = $.util.inherit(BaseView);

	$.extend(BackurlWidget.prototype, {
		el: '.J_backurl',

		tpl: tpl,

		events: {
			'click .J_go': 'goBack'
		},

		goBack: function(event) {
			event.preventDefault();
			var backurl = $.url.getParam('backurl') || this.$('.J_go').attr('data-default-backurl');
			if (backurl) {
				location.href = backurl;
			}
		}
	});

	return BackurlWidget;
});