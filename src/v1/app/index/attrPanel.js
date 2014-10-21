/**
 * Created by Administrator on 2014/10/21.
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


            var model = new Model(),
                attrPanelView = new View({
                    model: model,
                    el: '#J_AttrPane'
//                    ,
//                    tpl:  {
//                        goods: cTpl
//                    }
//                    ,
//                    fill:'after'
//                    ,
//                    renderType: 'normal'
                });



            var orderid = $.url.getParam('orderid');

            $('#J_AttrTrigger').click(function(){
                 var data = {};
                data.thirdTypeId = '10',
                data.sku = '496292';

                model.attrPanel(data).done(function(res){

                    console.log(res);

                    var attrList = res.propList;

                    attrPanelView.render(res)


                });




            });







        }
    }
});