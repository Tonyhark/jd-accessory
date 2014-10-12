define([
    'common',
    'view/base',
    'text!tpl/widget/menu.mustache'
], function($, BaseView, tpl) {
    var Widget = $.util.inherit(BaseView);

    $.extend(Widget.prototype, {
        el: '#J_view_message',
        renderType: 'normal',
        tpl: tpl,

        events: {
            'click #J_button_cancel': 'cancel'
        },
        afterRender: function(data) {
            //禁止滚动
            $('.overlay').on('touchmove', function(event) {
                event.preventDefault();
                this.done();
            })
        },
        cancel: function(event) {
            this.done();
        },
        done: function() {
            $(this.el).empty();
        }
    });

    return Widget;
});
