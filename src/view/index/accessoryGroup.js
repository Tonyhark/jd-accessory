/**
 * Created by Administrator on 2014/10/27.
 */
define([
    'common',
    'view/base'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function(config){
            $(document).on('click','.menu-item-acc',$.util.bind(this.handleSelectAcc,this))
        },
        events: {},
        afterRender: function (data) {
            return this;
        },
        handleSelectAcc: function(e){
            e.preventDefault();
            var $tar = $(e.currentTarget),
                thirdTypeId = $tar.attr('data-acc-id'),
                sku = $('#menu-trigger-model').attr('data-sku');
            ping.click({
                "report_eventid":"Accessory_Category",
                "report_eventparam": thirdTypeId
            });

            this.goUrl(sku,thirdTypeId);
        },
        goUrl: function(sku,thirdTypeId){

            var baseUrl = location.href;
            baseUrl = baseUrl.substring(0,baseUrl.indexOf('?')) ;
            if(thirdTypeId){
                baseUrl = baseUrl.replace('index.html','detail.html');
                baseUrl += '?sku='+ sku + '&thirdTypeId='+ thirdTypeId;
            }else{
                baseUrl += '?sku='+ sku;
            }

            location =  baseUrl;

        }
    });
    return View;
});