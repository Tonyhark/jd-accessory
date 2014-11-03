/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'app/index/brandsList',
    'app/index/goodsList',
    'app/index/attrPane',
    'util'
], function(brandsList, goodsList,util) {
    var info = {};


    var modelData = {};
    modelData.brandName='苹果';
    //modelData.callBack='jsonp1411965756126';
    modelData._=1411965756291;

    var sortingData ={};
    sortingData.pageNo = 0;
    sortingData.thirdTypeId=3;
    sortingData.sku=1023433;
    sortingData.brandId='';
    sortingData.column=0;
    sortingData.sp='asc';
    sortingData.condition='';
    sortingData.priceCondition='';
    var init = {};
    routie({
        "": function() {

            document.title = '配件中心';
            brandsList.init(modelData);
            goodsList.init(sortingData);
            //初始化品牌列表
        }

    })

});