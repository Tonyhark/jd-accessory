define([
    'app/index/brandsList',
    'app/index/goodsList',
    'util'
], function(brandsList, goodsList,util) {
    var info = {};


    var modelData = {};
    modelData.callBack='jsonp1411965756126';
    modelData._=1411965756291;
    var sortingData ={};
    sortingData.pageNo = 1;
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

            goodsList.init(sortingData);
            //初始化品牌列表
            brandsList.init(modelData);

        }

    })

});