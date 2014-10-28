define([
    'app/index/skuNumber',
    'app/index/defaultList',
    'app/index/toolBar',
    'app/index/accessoryGroup',
    'app/index/goodsList',
    'app/index/attrPanel',
    'util'
], function (skuNumber,defaultList, toolBar,accessoryGroup, goodsList, attrPanel, util) {

    var phoneData = {};
    var SKU ;
    var modelData = {}





    hasParamSku (getAccGroup);

    function getAccGroup(sku) {
        var data ={};
        data.sku = sku;

        accessoryGroup.init(data).done(function(res){

            modelData.style = res.mainproduct.style;
            modelData.brand = res.mainproduct.brand;
            modelData.sku = res.mainproduct.sku;

            toolBar.init(modelData).done(function(res){

            });

        });

    }

    function renderMenu (){

    }

    function hasParamSku (cb){
        if ($.url.getParam('sku')) {

            //http://localhost:3000/src/v1/html/index.html?sku=944597
            SKU = $.url.getParam('sku');
            //通过sku拉取多配件数据  从这里进来就不需要检测效果
            cb(SKU);

        } else {

            if ($.url.getParam('d_brand') && $.url.getParam('d_model')) {

                //http://localhost:3000/src/v1/html/index.html?mobiletype=1&client=android&d_brand=YuLong&d_model=Coolpad8750

                phoneData.functionid = 'accessoryType';
                phoneData.client =  $.url.getParam('client');
                phoneData.d_brand = $.url.getParam('d_brand');
                phoneData.d_model = $.url.getParam('d_model');

                //todo 通过手机型号拉取sku
                skuNumber.init(phoneData).done(function(res){

                    if(res.skuId){
                        SKU = res.skuId;
                        cb(SKU);
                    }else{

                        //显示默认类目
                        defaultList.init().done(function(res){
                            toolBar.init().done(function(res){

                            });
                        }).fail(function (error) {
                            alert('在index中的报错');
                        });

                    }
                });

                //todo 判断 回来的数据skuid属性是否为空

            } else {
                alert('缺少参数：d_brand,d_model');
                return;
            }
        }
    }







    routie({
        "": function () {
            document.title = '配件中心';
            console.log();


            //初始化品牌列表

        }

    })

});