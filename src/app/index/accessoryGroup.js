/**
 * Created by Administrator on 2014/10/27.
 */
/*分组配件*/
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/accessoryGroup',
    'text!tpl/index/accGroup.mustache',
    'view/widget/alert',
    'util'
], function ($, store, Model, View, cTpl, alertView,util) {
    return {
        init: function (data) {
            var dtd = $.util.Deferred();

            var model = new Model(),
                accGrouptView = new View({
                    model: model,
                    el: '#J_AccGroup',
                    tpl:  {
                        accGroup: cTpl
                    }
                });

            var mapObj = function(obj){
                console.log(obj);
                var resultObj = {};
                resultObj.accessoryList = [];

                $.each(obj.accessoryList, function (i, v) {
                    var accId = v.thirdTypeId;
                    //筛出需要的5种配件
                    if (accId == 3 || accId == 4 || accId == 13 || accId == 10 || accId == 6) {
                        //每种配件最多4个
                        if (v.accessoryList.length > 4) {
                            v.accessoryList = v.accessoryList.slice(0, 4);
                        }
                        v.mainSku = obj.mainproduct.sku;

                        $.each(v.accessoryList,function(index,acc){
                            v.accessoryList[index].price = util.formatPrice(acc.price);
                        });


                        resultObj.accessoryList.push(v);
                    }
                });

                return resultObj;
            };

            var renderAccGroup = function(data){
                model.accessoryGroup(data).done(function (res) {

                    if (typeof res == 'object') {

                        var accData = mapObj(res);
                        accGrouptView.render(accData);

                        return dtd.resolve(res);
                    } else {

                        var alert = new alertView();
                        alert.render({
                            'msg': res.msg
                        });

                        return dtd.reject(res);
                    }
                }).fail(function (error) {
                    alert('网络不稳定，休息一下，稍后试试~');
                    if (spinner) {
                        spinner.stop();
                    }
                    return dtd.reject();
                });

                return dtd.promise();
            };

            renderAccGroup(data);

            // 点击手机型号事件
            $(document).on('click','.tag-model',function(e){
                e.preventDefault();
                if (spinner) {
                    spinner.start();
                }
                var $tar = $(this),
                    $li = $tar.parents('.item-brand'),
                    selLabel = $li.find('.select-sub'),
                    sku = $tar.attr('data-sku'),
                    model = $tar.html();
                var data = {};

                data.sku = sku;
                renderAccGroup(data).done(function(res){
                    $tar.addClass('cur');
                    $li.removeClass('cur').addClass('item-selected').attr('data-sku',sku).siblings().attr('data-sku','').removeClass('item-selected');
                    $('.menu-trigger').attr('data-sku',sku)
                    selLabel.html($tar.html());

                    $('#menu-trigger-model').trigger('close').find('span').html(model);

                });


            });

            $(document).on('click','.pd-more-link',function(e){
                ping.click({
                    "report_eventid":"Accessory_Category",
                    "report_eventparam": '查看更多'
                });
            });
            $(document).on('click','.pd-item',function(e){
                var sku = $(this).attr('data-sku');
                ping.click({
                    "report_eventid":"Accessory_Productid",
                    "report_eventparam": sku
                });
            });

            return dtd.promise();

        }
    }
});