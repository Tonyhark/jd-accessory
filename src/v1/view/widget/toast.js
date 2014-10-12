define([
    'common',
    'view/base',
    'text!tpl/widget/toast.mustache'
], function($, BaseView, tpl) {
    var Widget = $.util.inherit(BaseView);

    $.extend(Widget.prototype, {
        el: '#J_view_message',
        renderType: 'normal',
        tpl: tpl,
        afterRender: function(data) {
            var _THIS = this;
            var time = setTimeout(function() {
                _THIS.done();
            }, this.timeout || 2000);
          
            var offset = $('.J_toast').offset();
            var alertHeight = offset.height;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

            var alertWidth = offset.width;
            var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var width = '150';
            if (data.msg.length > 8) {
                width = '280';
            }
            $('.J_toast').css({
                'width': width + 'px',
                'top': ((clientHeight - alertHeight) / 2) + 'px',
                'left': ((clientWidth - width) / 2) + 'px'
            });
            $('.J_toast p').css({
                'font-size': '12px',
                'padding': '15px'
            });

            //禁止滚动
            $('.J_toast').on('touchmove', function(event) {
                event.preventDefault();
            })

            //更改overlay的大小
            $('.overlay').css({height:clientHeight+'px',width:clientWidth+'px'});
            //禁止滚动
            $('.overlay').on('touchmove', function(event) {
                event.preventDefault();
            });
        },
        done: function() {
            $(this.el).empty();
        }
    });

    return Widget;
});