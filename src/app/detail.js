/**
 * Created by Administrator on 2014/10/21.
 */
define([
    'common',
    'util',
    'app/index/toolBar',
    'app/detail/goodsList',
    'app/detail/attrPanel'

], function($,util,toolBar, goodsList,attrPanel) {

    //http://localhost:3000/src/html/detail.html?sku=944597&thirdTypeId=3

    var attrData = {},
     modelData = {},
        sku = $.url.getParam('sku'),
        thirdTypeId =  $.url.getParam('thirdTypeId');
    attrData.sku = sku;
    attrData.thirdTypeId = thirdTypeId;

    modelData.brandName='苹果';
    modelData._=1411965756291;

    var sortingData ={};
    sortingData.pageNo = 0;
    sortingData.thirdTypeId= thirdTypeId;
    sortingData.sku= sku;
    sortingData.brandId='';
    sortingData.column=0;
    sortingData.sp='asc';
    sortingData.condition='';
    sortingData.priceCondition='';


    routie({
        "": function() {

            document.title = '配件中心';
//            var modelData ={};
//            modelData.style = res.mainproduct.style;
//            modelData.brand = res.mainproduct.brand;
//            modelData.sku = res.mainproduct.sku;

            toolBar.init();
            attrPanel.init(attrData);
            goodsList.init(sortingData).done(function(res){

            });
            //初始化品牌列表
        }
    })
});