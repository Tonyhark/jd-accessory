/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/detail/attrPanel',
    //todo 设置筛选项模板 'text!tpl/index/attrOptions.mustache',
    'view/widget/alert'
], function($, store, Model, View, alertView) { //cTpl,
    return {
        init: function(data) {
            var dtd = $.util.Deferred();
            var model = new Model(),
                attrPanelView = new View({
                    model: model,
                    el: '#J_AttrPane'
                });

            model.attrPanel(data).done(function(res){
                console.log(res);
                attrPanelView.render(res);
                return dtd.resolve(res);
            }).fail(function(err){
                return dtd.reject();
            });

            return dtd.promise();
        }
    }
});