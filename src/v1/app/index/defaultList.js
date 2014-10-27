/**
 * Created by Administrator on 2014/10/22.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/defaultList',
    'text!tpl/index/defaultList.mustache',
    'view/widget/alert'
], function ($, store, Model, View, cTpl, alertView) {
    return {
        init: function (data) {

            var dtd = $.util.Deferred();

            var model = new Model(),
                defaultListView = new View({
                    model: model,
                    el: '#J_DefaultList',
                    tpl:  {
                        defaultList: cTpl
                    }
                });

            var reqData = {
                functionid:'searchCatelogy',
                //手机饰品 11302
                body:'{"pagesize":"20","page":"1","catelogyId":"868","isLoadPromotion":true,"isLoadAverageScore":true}'
            };

            model.defaultList(reqData).done(function(res){
                console.log(res);

                if(res.code==0){
                    defaultListView.render(res)
                }else{
                    var alert = new alertView();
                    alert.render({
                        'msg': res.errmsg
                    });
                }


                return dtd.resolve(res);
            }).fail(function(error){
                alert('网络不稳定，休息一下，稍后试试~');

                return dtd.reject();
            });

            return dtd.promise();

        }
    }
});