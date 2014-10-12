/**
 * 服务评价
 */
define([
	'common',
	'common/store',
	'model/accessorie',
	'view/index/comment',
	'text!tpl/index/comment.mustache',
	'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
	return {
		init: function(data) {
			var model = new Model(),
				commentview = new View({
					model: model,
					el: '#J_tpl_comment',
					tpl: {
						comment: cTpl
					}
				});

			var orderid = $.url.getParam('orderid');

			model.serviceContent(data).done(function(ret) {
				var content = ret.data;
				//因为返回的json数据不标准，所以转换成标准json
				content = content.replace(/"{/g, '{').replace(/"}/g, '}');
				var value = JSON.parse(content);
				if (value.code == 0) {
					value.evaluate = {};
					value.ppid = value.resultValue.gson.id;
					value.evaluate = value.resultValue.gson.listGroup[0].listGroup;
					//store.set('courier_commentinfo_'+orderid, JSON.stringify(value));
					commentview.render(value);
				} else {
					var alert = new alertView();
					alert.render({
						'msg': ret.msg
					});

				}
			}).fail(function(error) {
				alert('网络不稳定，休息一下，稍后试试~');
			});

		}
	}
});