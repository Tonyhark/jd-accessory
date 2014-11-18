/**
 * Created by Administrator on 2014/10/10.
 */
/**
 * Created by Administrator on 2014/10/10.
 */
/**
 * 品牌列表
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/detail/goodsList',
    'view/detail/attrPanel',
    'text!tpl/detail/goods.mustache',
    'text!tpl/detail/attrPanel.mustache',
    'util',
    'view/widget/alert'
], function($, store, Model, View,attrView,cTpl,attrTpl,util, AlertView) {
    return {
        init: function(data,window) {

            var dtd = $.util.Deferred();

            var model = new Model(),
                goodsListView = new View({
                    model: model,
                    el: '#search-cntr',
                    tpl:  {
                        goods: cTpl
                    }
                }),
                attrPanelView = new attrView({
                    model: model,
                    el: '#J_AttrPane',
                    tpl:{
                        attrPanel: attrTpl
                    }
                });
            goodsListView.afterRender = function(data){
                var column = this.reqData.column;
                this.pageTotal = data.allPageNo;
                this.pageNo = data.currentPageNo;
//                console.log({'请求数据':this.reqData});
//                console.log('总页数：' + this.pageTotal);
                if (column == 0) {
                    $('.pd-item').parent().each(function (i, ele) {
                        if (i < 3) {
                            $(ele).addClass('show-salenum-icon').removeClass('show-cmt-icon');

                        }else{
                            return false;
                        }
                    });
                }else if(column == 2){
                    $('.pd-item').parent().each(function (i, ele) {
                        if (i < 3) {
                            $(ele).addClass('show-cmt-icon').removeClass('show-salenum-icon');
                        }else{
                            return false;
                        }
                    });
                }
                clearTimeout(Tid);
                handleScroll(null, true);
                return this;
            };
            var Tid,
                fetching = false,
                page = 1,
                lastScrollY = window.pageYOffset,

            //window cache
                scrollY = window.pageYOffset,
                innerHeight,
                topViewPort,
                bottomViewPort;

            goodsListView.reqData = data;

            model.goodsList(data).done(function(ret) {

                if (ret.resultQuery) {

                    rendGoodsList(ret.resultQuery)
                    return dtd.resolve(ret);
                } else {
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                    return dtd.reject(ret);
                }
            }).fail(function(error) {
                (new AlertView()).render({
                    'msg': '网络不稳定，休息一下，稍后试试~'
                });
                return dtd.reject();
            });

            $(document).on('click', '#J_AttrBtn', handleFilter);
            $(document).on('click', '.sroting-btn', handleSort);
            $(document).on('click', '.tag-model',handleSelectModel);
            $(document).on('click', '.menu-item-acc', handleSelectAcc);
            $(document).on('click','.pd-item',function(e){
                var sku = $(this).attr('data-sku');
                ping.click({
                    "report_eventid":"Accessory_Productid",
                    "report_eventparam": sku
                });
            });


            function rendGoodsList(data){

                $.each(data.list,function(i,v){
                    data.list[i].price = util.formatPrice(v.price);
                    data.list[i].sales = util.formatSales(v.sales)
                });

                goodsListView.render(data,'#goods-list');
            }

            function handleSelectAcc(e){
                e.preventDefault();

                var $tar = $(e.currentTarget),
                    thirdTypeId = $tar.attr('data-acc-id'),
                    sku = goodsListView.reqData.sku,
                    data,attrReqData;
                //判断是否已宣选中
                if($tar.hasClass('cur')){
                    return false;
                }
                if($tar.hasClass('menu-item-acc-all')){
                    goIndex(sku)
                    return;
                }
                data = $.extend(goodsListView.reqData,{
                    thirdTypeId: thirdTypeId,
                    pageNo:1,
                    condition : '',
                    priceCondition : ''
                });
                attrReqData = {
                    sku:sku,
                    thirdTypeId: thirdTypeId
                };
                if (spinner) {
                    spinner.start();
                }
                goodsListView.model.goodsList(data).done(function (res) {
                    rendGoodsList(res.resultQuery);
                    goodsListView.model.attrPanel(attrReqData).done(function(res){
                        $('.menu-item-acc').filter('.cur').removeClass('cur');
                        $tar.addClass('cur');
                        $('#menu-trigger-acc').attr('data-acc',res.thirdTypeId);
                        $('#menu-trigger-acc').trigger('close').find('span').html(res.thirdTypeName);

                        attrPanelView.render(res);

                    });
                }).fail(function(err){
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });

                ping.click({
                    "report_eventid":"Accessory_Category",
                    "report_eventparam": thirdTypeId
                });
            }

            function handleSelectModel(e){
                e.preventDefault();

                var $tar = $(e.currentTarget),
                    $li = $tar.parents('.item-brand'),
                    sku = $tar.attr('data-sku'),
                    phoneModel = $tar.text(),
                    thirdTypeId = goodsListView.reqData.thirdTypeId,
                    selLabel = $li.find('.select-sub'),
                    data,attrReqData;
                if($tar.hasClass('cur')){
                    return false;
                }
                data = $.extend(goodsListView.reqData,{
                    sku:sku,
                    pageNo: 1,
                    condition : '',
                    priceCondition : ''
                });

                attrReqData = {
                    sku:sku,
                    thirdTypeId: thirdTypeId
                }
                if (spinner) {
                    spinner.start();
                }
                goodsListView.model.goodsList(data).done(function (res) {
                    rendGoodsList(res.resultQuery);
                    goodsListView.model.attrPanel(attrReqData).done(function(res){

                        $tar.addClass('cur');
                        $li.removeClass('cur').addClass('item-selected').attr('data-sku',sku).siblings().attr('data-sku','').removeClass('item-selected');
                        $('.menu-trigger-model').attr('data-sku',sku)
                        selLabel.html($tar.html());
                        $('#menu-trigger-model').trigger('close').attr('data-sku',sku).find('span').html(phoneModel);

                        attrPanelView.render(res);

                    });
                }).fail(function(err){
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });
            }

            function handleSort(e){
                var $target = $(e.currentTarget);
                if($target.hasClass('sorting-current')){
                    return false;
                }

                if (spinner) {
                    spinner.start();
                }
                var that = this,
                    columeValue = $target.attr('data-column'),
                    data = $.extend(goodsListView.reqData, {
                        column: columeValue,
                        pageNo: 1  //页数归零
                    });
                goodsListView.fill = '';

                goodsListView.model.goodsList(data).done(function (res) {

                    rendGoodsList(res.resultQuery);
                    $target.addClass('sorting-current').siblings().removeClass('sorting-current');
                    //handleDefer();
                }).fail(function(err){
                    if (spinner) {
                        spinner.stop();
                    }
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });

                switch (columeValue){
                    case 0:
                        ping.click({
                            "report_eventid":"AccessoryDetail_SortbyAmount"
                        });
                        break;
                    case 2:
                        ping.click({
                            "report_eventid":"AccessoryDetail_SortbyEvaluate"
                        });
                        break;
                    case 1:
                        ping.click({
                            "report_eventid":"AccessoryDetail_SortbyPrice"
                        });
                        break;
                    case 3:
                        ping.click({
                            "report_eventid":"AccessoryDetail_SortbyNew"
                        });
                        break;
                    default :
                        break;

                }

                return false;
            }

            function handleFilter(e){
                if (spinner) {
                    spinner.start();
                }
                var $tar = $(e.currentTarget);
                var that = this;
                var condition = [];
                var priceCondition = '';
                var data = goodsListView.reqData;
                goodsListView.fill = '';
                $('.attr-first-li').each(function (i, ele) {
                    var $ele = $(ele),
                        attrName = $ele.attr('data-attr-name'),
                        attrId = $ele.attr('data-attr-id'),
                        optionId = $ele.attr('data-option-id'),
                        optionName;
                    if (optionId) {
                        if (attrName != '价格') { //价格除外
                            var condiStr = attrId + ':' + optionId;
                            condition.push(condiStr);
                        } else {
                            optionName = $.trim($ele.attr('data-option-name'));
                            if (optionName.indexOf('以上') != -1){
                                optionName = optionName.replace('以上','max');
                            }
                            priceCondition = optionName;
                        }
                    }
                });

                condition = condition.join(';');

                $.extend(data, {
                    condition: condition,
                    priceCondition: priceCondition,
                    pageNo: 1
                });

                goodsListView.model.goodsList(data).done(function (res) {
                    rendGoodsList(res.resultQuery);
                    $('#J_AttrPane').trigger('close');
                    if (condition != '' || priceCondition != '') {
                        $('#J_AttrTrigger').addClass('cur');
                    } else {
                        $('#J_AttrTrigger').removeClass('cur');
                    }
                }).fail(function(err){
                    $('#J_AttrPane').trigger('close');
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });

                ping.click({
                    "report_eventid":"Accessory_Filter"
                });

                return false;
            }

            function isVisible(node) {

                var scrollTop = window.scrollY,
                    offTop = node.offsetTop,
                    offsetHeight = node.offsetHeight,
                    innerHeight = window.innerHeight,
                    topViewPort = scrollTop,
                    bottomViewPort = scrollTop + innerHeight;

                if(offTop + offsetHeight > topViewPort && offTop < bottomViewPort) {

                    return true;
                } else {
                    return false;
                }
            }

            function fetchAcc(){
                if (fetching) {
                    return;
                } else {
                    fetching = true;
                }
                // 判断有没有下一页
                goodsListView.reqData.pageNo+=1;
                goodsListView.fill = 'after';

                model.goodsList(data).done(function(ret) {

                    if (typeof ret == 'object') {


                        rendGoodsList(ret.resultQuery);

                        fetching = false;
                    } else {
                        var alert = new alertView();
                        alert.render({
                            'msg': ret.msg
                        });
                    }
                }).fail(function(err){
                    (new AlertView()).render({
                        'msg': '网络不稳定，休息一下，稍后试试~'
                    });
                });

            }

            function handleDefer() {
                //console.time('defer');

                var $list = $('.pd-item-li[data-lazy="true"]');

                $list.each(function(i,ele){

                    if (isVisible(ele)) {
                        var thisImg = $(ele).find('img')[0];
                        var imgSrc = thisImg.getAttribute('data-src');
                        $(ele).attr('data-lazy','false');

                        //create a closure for for simple preload stuff
                        var handler = function () {
                            var node, src;
                            node = thisImg;
                            src = imgSrc;

                            return function () {
                                node.src = src;
                                node.style.opacity = 1;
                                //loaded[deferSrc] = true;
                            }
                        }();

                        var img = new Image();
                        img.onload = handler;
                        img.src = imgSrc;
                    }
                });
                //console.timeEnd('defer');
            }

            function handleScroll(e, force) {
                //if scroll hasn't changed, do nothing;
                if (!force && lastScrollY == window.scrollY) {
                    Tid = window.setTimeout(handleScroll, 100);

                    return;
                } else {
                    lastScrollY = window.scrollY;
                }

                scrollY = window.scrollY;
                innerHeight = window.innerHeight;
                topViewPort = scrollY - 1000;
                bottomViewPort = scrollY + innerHeight + 1000;

                if (window.scrollY + innerHeight + 600 > document.body.offsetHeight) {
                    if(goodsListView.reqData.pageNo < goodsListView.pageTotal){
                        fetchAcc();
                    }
                }

                handleDefer();
                Tid = window.setTimeout(handleScroll, 100);
            }

            Tid = window.setTimeout(handleScroll, 100);

            function goIndex(sku) {

                var baseUrl = location.href;
                baseUrl = baseUrl.substring(0, baseUrl.indexOf('?'));
                if (sku) {
                    baseUrl = baseUrl.replace('detail', 'pjzx');
                    baseUrl += '?sku=' + sku;
                }

                location = baseUrl;
            }

            return dtd.promise();

        }
    }
});