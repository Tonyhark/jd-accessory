/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base',
    'view/widget/endless',
    'view/detail/attrPanel'
], function ($, BaseView, Endless, AttrPanelView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function (config) {

            var that = this;

            //$(document).on('click', '.tag-model', $.util.bind(this.handleSelectModel, this));

            //$(document).on('click', '.menu-item-acc', $.util.bind(this.handleSelectAcc, this));

        },
        events: {

        },

        render: function (data, locator) {
            console.log(data);
            View.superClass.prototype.render.call(this, data, locator);
        },

        handleSelectModel: function (e) {
//            e.preventDefault();
//            var $tar = $(e.currentTarget),
//                sku = $tar.attr('data-sku'),
//                thirdTypeId = $('#menu-trigger-acc').attr('data-acc');
//
//            this.goUrl(sku, thirdTypeId);
        },
        handleSelectAcc: function (e) {
            e.preventDefault();
            var $tar = $(e.currentTarget),
                thirdTypeId = $tar.attr('data-acc-id'),
                sku = $('#menu-trigger-model').attr('data-sku');

            this.goUrl(sku, thirdTypeId);
        },
        goUrl: function (sku, thirdTypeId) {

            var baseUrl = location.href;
            baseUrl = baseUrl.substring(0, baseUrl.indexOf('?'));
            if (thirdTypeId) {
                baseUrl += '?sku=' + sku + '&thirdTypeId=' + thirdTypeId;
            } else {
                baseUrl = baseUrl.replace('detail.html', 'index.html');
                baseUrl += '?sku=' + sku;
            }

            location = baseUrl;
        }


    });

    return View;
});