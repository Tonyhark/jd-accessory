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
    'text!tpl/detail/goods.mustache',
    'view/widget/alert'
], function($, store, Model, View, cTpl, alertView) {
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
                });
            goodsListView.afterRender = function(data){
                var column = this.reqData.column;
                this.pageTotal = data.allPageNo;
                this.pageNo = data.currentPageNo;
                console.log(this.reqData);
                console.log(this.pageTotal);
                if (column == 0) {
                    $('.pd-item').parent().each(function (i, ele) {
                        if (i < 3) {
                            $(ele).addClass('show-sale-icon').removeClass('show-cmt-icon');
                        }
                    });
                }else if(column == 2){
                    $('.pd-item').parent().each(function (i, ele) {
                        if (i < 3) {
                            $(ele).addClass('show-cmt-icon').removeClass('show-sale-icon');
                        }
                    });
                }

                handleScroll(null, true);
                return this;
            };
            var fetching = false,
                page = 1,
                lastScrollY = window.pageYOffset,

            //window cache
                scrollY = window.pageYOffset,
                innerHeight,
                topViewPort,
                bottomViewPort;

            goodsListView.reqData = data;

            model.goodsList(data).done(function(ret) {

                if (typeof ret == 'object') {
                    goodsListView
                        .render(ret.resultQuery,'#goods-list');
                    return dtd.resolve(ret);
                } else {
                    var alert = new alertView();
                    alert.render({
                        'msg': ret.msg
                    });
                    return dtd.reject(ret);
                }
            }).fail(function(error) {
                alert('网络不稳定，休息一下，稍后试试~');
                return dtd.reject();
            });

            $(document).on('click', '#J_AttrBtn', handleFilter);
            $(document).on('click', '.sroting-btn', handleSort);



            function handleSort(e){
                if (spinner) {
                    spinner.start();
                }
                var $target = $(e.currentTarget),
                    that = this,
                    columeValue = $target.attr('data-column'),
                    data = $.extend(goodsListView.reqData, {
                        column: columeValue,
                        pageNo: 1  //页数归零
                    });
                goodsListView.fill = '';

                goodsListView.model.goodsList(data).done(function (res) {

                    goodsListView.render(res.resultQuery, '#goods-list');
                    $target.addClass('sorting-current').siblings().removeClass('sorting-current');
                    //handleDefer();
                });
                return false;
            }

            function handleFilter(e){
                spinner.start();
                var $tar = $(e.currentTarget);
                var that = this;
                var condition = [];
                var priceCondition = '';
                var data = goodsListView.reqData;
                goodsListView.fill = '';
                $('.attr-first-li').each(function (i, ele) {
                    var $ele = $(ele),
                        attrId = $ele.attr('data-attr-id'),
                        optionId = $ele.attr('data-option-id'),
                        optionName = $.trim($ele.attr('data-option-name'));
                    if (optionId) {
                        if (attrId != 954) { //价格除外
                            var condiStr = attrId + ':' + optionId;
                            condition.push(condiStr);
                        } else {
                            priceCondition = optionName
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
                    goodsListView.render(res.resultQuery, '#goods-list');
                    $('#J_AttrPane').trigger('close');
                    if (condition != '' || priceCondition != '') {
                        $('#J_AttrTrigger').addClass('cur');
                    } else {
                        $('#J_AttrTrigger').removeClass('cur');
                    }
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
                console.log(goodsListView.reqData.pageNo);
                console.log(goodsListView.pageTotal);

                goodsListView.reqData.pageNo+=1;
                goodsListView.fill = 'after';

                model.goodsList(data).done(function(ret) {

                    if (typeof ret == 'object') {
                        goodsListView.render(ret.resultQuery,'#goods-list');

                        fetching = false;
                    } else {
                        var alert = new alertView();
                        alert.render({
                            'msg': ret.msg
                        });
                    }
                }).fail(function(error) {
                    alert('网络不稳定，休息一下，稍后试试~');
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
                //console.log(i++);
                //if scroll hasn't changed, do nothing;

                console.log('lastScollY = ' + lastScrollY + 'nowScroll= '+ window.scrollY)

                if (!force && lastScrollY == window.scrollY) {
                    window.setTimeout(handleScroll, 100);

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
                window.setTimeout(handleScroll, 100);
            }

            window.setTimeout(handleScroll, 100);

            return dtd.promise();

        }
    }
});