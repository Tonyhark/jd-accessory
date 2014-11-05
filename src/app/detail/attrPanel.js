/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/detail/attrPanel',
    'text!tpl/detail/attrPanel.mustache',
    'view/widget/alert'
], function($, store, Model, View, cTpl,alertView) { //
    return {
        init: function(data) {
            var dtd = $.util.Deferred();
            var model = new Model(),
                attrPanelView = new View({
                    model: model,
                    el: '#J_AttrPane',
                    tpl:{
                        attrPanel: cTpl
                    }
                });

            model.attrPanel(data).done(function(res){
                attrPanelView.render(res);
                return dtd.resolve(res);
            }).fail(function(err){
                return dtd.reject();
            });

            return dtd.promise();
        }
    }
});