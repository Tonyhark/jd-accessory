/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base',
    'view/widget/endless',
    'view/detail/attrPanel'
], function ($, BaseView, Endless, AttrPanelView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function (config) {

            var that = this;
        }
//        render: function (data, locator) {
//            console.log({'返回数据':data});
//
//            View.superClass.prototype.render.call(this, data, locator);
//        }

    });

    return View;
});