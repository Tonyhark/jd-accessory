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
    'view/index/toolBar',
    'view/widget/alert'
], function ($, store, Model, View, AlertView) { // cTpl,
    return {
        init: function (modelData,accData) {
            var dtd = $.util.Deferred();

            var model = new Model(),
                toolBarView = new View({
                    model: model,
                    el: '#J_Menu',
                    fill: 'after'
//                    ,
//                    tpl: {
//                        comment: cTpl
//                    }
                }),
                menuListData = {
                    initBrandName: null
                };

            if(modelData != undefined){
                menuListData.phone = modelData;
                menuListData.showAccMenu = true;
            }else{
                menuListData.phone = {
                    style: "选择手机"
                };
                menuListData.showAccMenu = false;
            }

            if(accData != undefined){
                menuListData.acc = accData;
            }

            var reqData = {}
            reqData._ = (new Date()).getTime() / 1000;

            model.brandsList(reqData).done(function (ret) {

                if (typeof ret == 'object') {

                    menuListData.initBrandName = ret.initBrandName;

                    model.accessoresList(reqData).done(function (ret) {

                        menuListData.initAccessoresType = ret.initAccessoresType;

                        toolBarView.render(menuListData);
                    });

                    return dtd.resolve(ret);
                }
                else {

                    var alert = new alertView();
                    alert.render({
                        'msg': ret.msg
                    });

                    return dtd.reject(ret);
                }
            }).fail(function (error) {
                (new AlertView()).render({
                    'msg': '网络不稳定，休息一下，稍后试试~'
                });
                return dtd.reject();
            });


            return dtd.promise();

        }
    }
});