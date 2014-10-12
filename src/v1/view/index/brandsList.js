/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base',
    'common/iscroll'
], function($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        events: {
            'click .brandLink': 'handler'
        },
        handler: function(e){
            alert('click .brandLink');
        }


    });

    return View;
});