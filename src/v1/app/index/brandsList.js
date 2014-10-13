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
    'view/index/brandsList',
    'text!tpl/index/comment.mustache',
    'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
    return {
        init: function(data) {
            dtd = $.util.Deferred();

            var model = new Model(),
                brandsListView = new View({
                    model: model,
                    el: '#J_Filter',
                    tpl: {
                        comment: cTpl
                    }
                }),
                filterData = {
                    initBrandName: null,
                    styleByBrandName: null,
                    initAccessoresType: null
                };


            //var orderid = $.url.getParam('orderid');

            model.brandsList(data).done(function(ret) {


                if (typeof ret == 'object') {
                    filterData.initBrandName = ret.initBrandName;
                    //data['callBack'] = 'jsonp1411965756127';
                    model.typeList(data).done(function(ret){
                        //data['callBack'] = 'jsonp1411965756128';
                        filterData.styleByBrandName = ret.styleByBrandName
                        model.accessoresList(data).done(function(ret){

                            filterData.initAccessoresType = ret.initAccessoresType;
                            brandsListView.render(filterData);

                        });

                    })



                    return dtd.resolve(ret);
                }
//                else {
//
//                    var alert = new alertView();
//                    alert.render({
//                        'msg': ret.msg
//                    });
//
//                    return dtd.reject(ret);
//                }
            }).fail(function(error) {
                alert('网络不稳定，休息一下，稍后试试~');
                return dtd.reject();
            });




            return dtd.promise();

        }
    }
});