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
    'view/widget/alert'
], function ($, store, Model, View, cTpl, alertView) {
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

            model.accessoryGroup(data).done(function (res) {

                if (typeof res == 'object') {
                    console.log(res);

                    var accData = {};
                    accData.accessoryList = [];

                    $.each(res.accessoryList, function (i, v) {
                        var accId = v.thirdTypeId;
                        //筛出需要的5种配件
                        if (accId == 3 || accId == 4 || accId == 13 || accId == 10 || accId == 6) {
                            //每种配件最多4个
                            if (v.accessoryList.length > 4) {
                                v.accessoryList = v.accessoryList.slice(0, 4);
                            }
                            accData.accessoryList.push(v);
                        }
                    });

                    accGrouptView.render(accData);
                    console.log(accData)
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
                return dtd.reject();
            });


            return dtd.promise();

        }
    }
});