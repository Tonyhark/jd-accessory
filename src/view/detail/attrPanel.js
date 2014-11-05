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
            $(document).on('click', '.overlay',$.util.bind(this.closeAttr, this));
            $('#J_AttrPane').bind('close', $.util.bind(this.closeAttr,this))

        },
        events: {
            'click .attr-first-li': 'showAttrSecond',
            'click .attr-sec-li': 'selectOption'
        },

        triggerAttr: function(e){
            $('.overlay').show();
            $('.filter').addClass('active');
        },
        showAttrSecond: function(e){
            var $tar = $(e.currentTarget);
            var attrId = $tar.data('attr-id');
            $('.filter-sub').addClass('active');
            $('.attr-second-wrap').find('[data-attr-id="'+attrId+'"]').addClass('cur');
        },
        closeAttr: function(){
            $('.overlay').hide();
            $('.filter,.filter-sub').removeClass('active');
        },
        closeSubAttr: function(li){
            $('.filter-sub').removeClass('active');
            li.parent().removeClass('cur')
        },
        selectOption: function(e){
            var $tar = $(e.currentTarget);
            var attrId = $tar.parent().data('attr-id');
            var obj = {
                'data-option-id': $tar.data('option-id'),
                'data-option-name': $tar.text()
            };
            $tar.addClass('cur').siblings().removeClass('cur');
            $('.attr-first-li[data-attr-id="' + attrId+'"]')
                .attr(obj)
                .find('.select-sub')
                .text(obj['data-option-name']);

            this.closeSubAttr($tar);


        }


    });

    return View;
});