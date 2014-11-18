define([
    'app/index/skuNumber',
    'app/index/defaultList',
    'app/index/toolBar',
    'app/index/accessoryGroup',
    'app/index/matchAnim',
    'util',
    'view/widget/alert',
    'common/store'
], function (skuNumber, defaultList, toolBar, accessoryGroup, matchAnim, util,AlertView, Store) {

    FastClick.attach(document.body);
    var phoneData = {};
    var SKU;
    var skuCacheKey = 'skuCache';
    var modelData = {};
    //没有传递sku参数，判断是否有sku缓存，避免重新触发检测动画效果
    //var paramSku = $.url.getParam('sku') || Store.get(skuCacheKey);
    var paramSku = $.url.getParam('sku') || undefined;

    matchAnim.init();//device-anim

    accGroupOrDefault();

    function accGroupOrDefault() {
        if (paramSku) {
            //http://localhost:3000/src/html/pjzx.html?sku=944597
            SKU = paramSku;
            //通过sku拉取多配件数据  从这里进来就不需要检测效果
            initAccGroup(SKU);

        } else {

            if ($.url.getParam('d_brand') && $.url.getParam('d_model')) {
                if (spinner) {
                    spinner.stop();
                }
                matchAnim.start();//开始loading动画
                //http://localhost:3000/src/html/pjzx.html?mobiletype=1&client=android&d_brand=YuLong&d_model=Coolpad8750

                phoneData.functionid = 'accessoryType';
                phoneData.client = $.url.getParam('client');
                phoneData.d_brand = $.url.getParam('d_brand');
                phoneData.d_model = $.url.getParam('d_model');

                // 通过手机型号拉取sku
                skuNumber.init(phoneData).done(function (res) {

                    if (res.skuId) {
                        SKU = res.skuId;
                        Store.set(skuCacheKey,SKU);
                        matchAnim.stop(phoneData.d_model); //匹配完毕动画结束
                        initAccGroup(SKU);

                    } else {
                        matchAnim.stop(); //匹配完毕动画结束
                        //显示默认类目
                        defaultList.init().done(function (res) {
                            toolBar.init().done(function (res) {
                            });
                        }).fail(function (error) {
                            alert('');
                            (new AlertView()).render({
                                'msg': '程序员开小差了，稍后试试~'
                            });
                        });
                    }
                }).fail(function (error) {
                    matchAnim.stop();
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });
            } else {

                matchAnim.stop(); //匹配完毕动画结束
                //显示默认类目
                defaultList.init().done(function (res) {
                    toolBar.init().done(function (res) {

                    });
                }).fail(function (error) {
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });

                return;
            }
        }
    }

    function initAccGroup(sku) {
        var data = {};
        data.sku = sku;

        accessoryGroup.init(data).done(function (res) {

            modelData.style = res.mainproduct.style? res.mainproduct.style: res.mainproduct.name;
            modelData.brand = res.mainproduct.brand;
            modelData.sku = res.mainproduct.sku;

            toolBar.init(modelData);
        }).fail(function (err) {   //当前sku无法取回数据，则显示默认页面
            defaultList.init().done(function (res) {
                toolBar.init().done(function (res) {

                });
            }).fail(function (error) {
                (new AlertView()).render({
                    msg: '程序员太累了，去呼噜了，请稍后再试~'
                })

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