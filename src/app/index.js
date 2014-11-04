define([
    'app/index/skuNumber',
    'app/index/defaultList',
    'app/index/toolBar',
    'app/index/accessoryGroup',
    'app/index/matchAnim',
    'util'
], function (skuNumber,defaultList, toolBar,accessoryGroup,matchAnim, util) {

    var phoneData = {};
    var SKU ;
    var modelData = {}
    var paramSku = $.url.getParam('sku') || undefined;


    matchAnim.init();//device-anim

    accGroupOrDefault ();

    function accGroupOrDefault (){
        if (paramSku) {

            //http://localhost:3000/src/html/index.html?sku=944597
            SKU = paramSku;
            //通过sku拉取多配件数据  从这里进来就不需要检测效果
            initAccGroup(SKU);

        } else {

            if ($.url.getParam('d_brand') && $.url.getParam('d_model')) {

                matchAnim.start();//开始loading动画

                //http://localhost:3000/src/html/index.html?mobiletype=1&client=android&d_brand=YuLong&d_model=Coolpad8750

                phoneData.functionid = 'accessoryType';
                phoneData.client =  $.url.getParam('client');
                phoneData.d_brand = $.url.getParam('d_brand');
                phoneData.d_model = $.url.getParam('d_model');

                // 通过手机型号拉取sku
                skuNumber.init(phoneData).done(function(res){

                    if(res.skuId){
                        matchAnim.stop(phoneData.d_model); //匹配完毕动画结束
                        SKU = res.skuId;
                        initAccGroup(SKU);
                    }else{
                        matchAnim.stop(); //匹配完毕动画结束
                        //显示默认类目
                        defaultList.init().done(function(res){
                            toolBar.init().done(function(res){

                            });
                        }).fail(function (error) {
                            alert('在index中的报错');
                        });

                    }
                });
            } else {
                alert('缺少参数：d_brand,d_model');
                return;
            }
        }
    }
    function initAccGroup(sku) {
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
    routie({
        "": function () {
            document.title = '配件中心';
            //初始化品牌列表
        }

    })




});