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
    //'text!tpl/index/comment.mustache',
    'view/widget/alert'
], function ($, store, Model, View, alertView) { // cTpl,
    return {
        init: function (modelData) {
            var dtd = $.util.Deferred();

            var model = new Model(),
                toolBarView = new View({
                    model: model,
                    el: '#J_Menu'
//                    ,
//                    tpl: {
//                        comment: cTpl
//                    }
                }),
                menuListData = {
                    initBrandName: null,
                    styleByBrandName: null
                };

            if(modelData != undefined){
                menuListData.phone = modelData;
                menuListData.showAccList = true;
            }else{
                menuListData.phone = {
                    style: "选择手机"
                };
                menuListData.showAccList = false;
            }

            var reqData = {}
            reqData._ = 1411965756291;

            model.brandsList(reqData).done(function (ret) {


                if (typeof ret == 'object') {

                    menuListData.initBrandName = ret.initBrandName;

                    model.accessoresList(reqData).done(function (ret) {

                        menuListData.initAccessoresType = ret.initAccessoresType;
                        console.log(menuListData);
                        toolBarView.render(menuListData);

                    });


//                    model.typeList(data).done(function (ret) {
//                        menuListData.styleByBrandName = ret.styleByBrandName
//                    })
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
                alert('网络不稳定，休息一下，稍后试试~');
                return dtd.reject();
            });


            return dtd.promise();

        }
    }
});