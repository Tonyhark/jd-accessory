/**
 * Created by Administrator on 2014/10/22.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/defaultList',
    //todo 设置筛选项模板 'text!tpl/index/attrOptions.mustache',
    'view/widget/alert'
], function ($, store, Model, View, cTpl, alertView) {
    return {
        init: function (data) {

            var dtd = $.util.Deferred();

            var model = new Model(),
                defaultListView = new View({
                    model: model,
                    el: '#J_DefaultList'
//                    tpl:  {
//                        goods: cTpl
//                    }
                });

            var reqData = {
                functionId:'searchCatelogy',
                partner:'apple',
                area:'1_2800_2849_0',
                body:'{"pagesize":"20","page":"1","catelogyId":"655","isLoadPromotion":true,"isLoadAverageScore":true}'
            };

            model.defaultList(reqData,{dataType: 'json'}).done(function(res){
                console.log(res);
                return dtd.resolve(ret);
            }).fail(function(error){
                alert('网络不稳定，休息一下，稍后试试~');

                return dtd.reject();
            });

            return dtd.promise();

        }
    }
});