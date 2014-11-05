/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'util',
    'app/index/toolBar',
    'app/detail/goodsList',
    'app/detail/attrPanel'

], function ($, util, toolBar, goodsList, attrPanel) {

    //http://localhost:3000/src/html/detail.html?sku=944597&thirdTypeId=3

    var attrData = {},
        modelData = {},
        sku = $.url.getParam('sku'),
        thirdTypeId = $.url.getParam('thirdTypeId');
    attrData.sku = sku;
    attrData.thirdTypeId = thirdTypeId;

    modelData.brandName = '苹果';
    modelData._ = 1411965756291;

    var goodsData = {};
    goodsData.pageNo = 1;
    goodsData.thirdTypeId = thirdTypeId;
    goodsData.sku = sku;
    goodsData.brandId = '';
    goodsData.column = 0;
    goodsData.sp = 'asc';
    goodsData.condition = '';
    goodsData.priceCondition = '';


    routie({
        "": function () {

            document.title = '配件中心';
            var modelData = {},accData={};


            attrPanel.init(attrData).done(function (res) {
                modelData.style = res.productMap.style;
                modelData.brand = res.productMap.brand;
                modelData.sku = res.productMap.sku;

                accData.accId = res.thirdTypeId;
                accData.accName = res.thirdTypeName;
                toolBar.init(modelData,accData);

            });
            goodsList.init(goodsData).done(function (res) {

            });
            //初始化品牌列表
        }
    })
});