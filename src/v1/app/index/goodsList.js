/**
 * Created by Administrator on 2014/10/10.
 */
/**
 * Created by Administrator on 2014/10/10.
 */
/**
 * 品牌列表
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/goodsList',
    'text!tpl/index/goods.mustache',
    'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
    return {
        init: function(data) {
            dtd = $.util.Deferred();

            var model = new Model(),
                goodsListView = new View({
                    model: model,
                    el: '#search-cntr',
                    tpl:  {
                        goods: cTpl
                    }
//                    ,
//                    fill:'after'
//                    ,
//                    renderType: 'normal'
                });

            var orderid = $.url.getParam('orderid');

            model.goodsList(data).done(function(ret) {


                if (typeof ret == 'object') {

                    console.log({'response' :ret.resultQuery})
                    goodsListView.render(ret.resultQuery);

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