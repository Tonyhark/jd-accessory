/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/attrPanel',
    //todo 设置筛选项模板 'text!tpl/index/attrOptions.mustache',
    'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
    return {
        init: function(data) {


            var model = new Model(),
                attrPanelView = new View({
                    model: model,
                    el: '#J_AttrPane'
                });

        }
    }
});