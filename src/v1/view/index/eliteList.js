/**
 * Created by Administrator on 2014/10/20.
 */
define([
    'common',
    'view/base',
    'common/iscroll'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        events: {

        },

        afterRender: function (data) {

            return this;
        }




    });

    return View;
});