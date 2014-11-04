/**
 * Created by Administrator on 2014/10/13.
 */
define([
    'common',
    'view/base'
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