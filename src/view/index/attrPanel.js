/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'view/base'
], function($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function() {
            // 绑定triggerAttr方法内部的this指向view实例
            $(document).on('click','#J_AttrTrigger', $.util.bind(this.triggerAttr, this));



        },
        events: {
            'evt  #J_AttrBtn': 'handler',
            'click .attr-first-li': 'showAttrSecond'

        },
        handler: function(e){
            alert('click .brandLink');
        },

        triggerAttr: function(e){

            var that = this ;
            var data = {};
            data.thirdTypeId = '10',
                data.sku = '496292';

            this.model.attrPanel(data).done(function(res){
                console.log(res);
                that.attrJson = res;
                that.render(res)
            });
        },
        showAttrSecond: function(e){
            var $tar = $(e.currentTarget);
            var attrId = $tar.data('attr-id');
            $('.attr-second-wrap').find('[data-attr-id="'+attrId+'"]').show();
        }


    });

    return View;
});