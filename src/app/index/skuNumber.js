/**
 * Created by Administrator on 2014/10/27.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    //'view/index/skuNumber',
    //'text!tpl/index/skuNumber.mustache',
    'view/widget/alert'
], function ($, store, Model, alertView) {
    return {
        init: function (data) {
            var dtd = $.util.Deferred();

            var model = new Model();

            model.skuNumber(data).done(function (res) {

                var skuId ;

                if(res.code == 0){

                    return dtd.resolve(res);
                }else{
                    var alert = new alertView();
                    alert.render({
                        'msg': res.errmsg
                    });
                    return dtd.reject(res);
                }

            }).fail(function (error) {
                alert('网络不稳定，休息一下，稍后试试~');
                return dtd.reject();
            });

            return dtd.promise();

        }
    }
});