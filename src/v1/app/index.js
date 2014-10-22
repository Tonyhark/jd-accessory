define([
    'app/index/defaultList',
    'app/index/brandsList',
    'app/index/goodsList',
    'app/index/attrPanel',
    'util'
], function(defaultList,brandsList, goodsList,attrPanel,util) {
    var info = {};
    if ($.url.getParam('d_brand')) {
        var d_brand = $.url.getParam('d_brand');
    } else {
        alert('缺少必须参数');
        return;
    }

    if ($.url.getParam('d_model')) {
        var d_model = util.stringToHex($.url.getParam('d_model'));
    } else {
        alert('缺少必须参数');
        return;
    }

    var phoneData = {};
    phoneData.d_brand = d_brand;
    phoneData.d_model = d_model;


    var modelData = {}
    modelData.brandName='苹果';
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

            defaultList.init().fail(function(error){
                alert('在index中的报错');
            });
            brandsList.init(modelData);
            goodsList.init(sortingData);
            attrPanel.init();
            //初始化品牌列表

        }

    })

});