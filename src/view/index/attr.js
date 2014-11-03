/**
 * Created by ZhaoYue on 2014/10/21.
 */
define([
    'common',
    'view/base'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        events: {
            /**
             *  todo 要解决筛选触发后渲染筛选面板的问题
             *  todo 一级菜单点击事件 拉取数据 渲染二级筛选，设置选中效果；确定按钮 拉取产品列表 (和产品列表是不同的view)
             *  todo 二级筛选点击事件 选中效果 确定按钮保存数据，设置对应的一级筛选的文字
             *  todo
             *  todo 要看下 易迅的view结构
             */
        },

        afterRender: function (data) {
            return this;
        }




    });

    return View;
});