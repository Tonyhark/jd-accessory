/**
 * Created by Administrator on 2014/10/27.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/widget/alert'
], function ($, store, Model, alertView) {
    return {
        init: function (data) {
            var dtd = $.util.Deferred();

            var model = new Model();
            model.skuNumber(data).done(function (res) {

                if(res.code == 0){
                    return dtd.resolve(res);
                }else{

                    return dtd.reject(res);
                }

            }).fail(function (error) {
               return dtd.reject();
            });

            return dtd.promise();

        }
    }
});