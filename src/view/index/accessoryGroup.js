/**
 * Created by Administrator on 2014/10/27.
 */
define([
    'common',
    'view/base'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function(){},
        events: {},
        afterRender: function (data) {
            return this;
        }
    });
    return View;
});