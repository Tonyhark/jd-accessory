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
            'click .goods-item': 'handler'
        },
        handler: function(e){
            alert('click .goodsItem');
        },
        afterRender:function(data){
            console.log(this.model);
            return this;
        }


    });

    return View;
});