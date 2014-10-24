define([
    'app/index/defaultList',
    'app/index/brandsList',
    'app/index/goodsList',
    'app/index/attrPanel',
    'util'
], function (defaultList, brandsList, goodsList, attrPanel, util) {

    var phoneData = {};

    if ($.url.getParam('sku')) {

        //http://localhost:3000/src/v1/html/index.html?sku=944597
        phoneData.sku = $.url.getParam('sku');
        //todo 通过sku拉取多配件数据  从这里进来就不需要检测效果


    } else {
        if ($.url.getParam('d_brand') && $.url.getParam('d_model')) {

            //http://localhost:3000/src/v1/html/index.html?mobiletype=1&client=android&d_brand=YuLong&d_model=Coolpad8750


            phoneData.d_brand = $.url.getParam('d_brand');
            phoneData.d_model = $.url.getParam('d_model');
            //todo 通过手机型号拉取sku

            //todo 判断 回来的数据skuid属性是否为空

        } else {
            alert('缺少参数：d_brand,d_model');
            return;
        }
    }





    var modelData = {}
    modelData.brandName = '苹果';
    modelData._ = 1411965756291;

    var sortingData = {};
    sortingData.pageNo = 0;
    sortingData.thirdTypeId = 3;
    sortingData.sku = 1023433;
    sortingData.brandId = '';
    sortingData.column = 0;
    sortingData.sp = 'asc';
    sortingData.condition = '';
    sortingData.priceCondition = '';

    routie({
        "": function () {

            document.title = '配件中心';

            defaultList.init().fail(function (error) {
                alert('在index中的报错');
            });
            brandsList.init(modelData);
            goodsList.init(sortingData);
            attrPanel.init();
            //初始化品牌列表

        }

    })

});