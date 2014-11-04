/**
 * Created by Administrator on 2014/10/13.
 */
/**
 * 手机型号列表
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/typeList',
    'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
    return {
        init: function(data) {
            dtd = $.util.Deferred();

            var model = new Model(),
                typeListView = new View({
                    model: model,
                    el: '#brands',
                    tpl: {
                        comment: cTpl
                    }
                });

            var orderid = $.url.getParam('orderid');

            model.brandsList(data).done(function(ret) {
                if (typeof ret == 'object') {

                    typeListView.render(ret);

                    return dtd.resolve(ret);
                } else {

                    var alert = new alertView();
                    alert.render({
                        'msg': ret.msg
                    });

                    return dtd.reject(ret);
                }
            }).fail(function(error) {
                alert('网络不稳定，休息一下，稍后试试~');
                return dtd.reject();
            });

            return dtd.promise();

        }
    }
});