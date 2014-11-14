/**
 * Created by Administrator on 2014/10/22.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/defaultList',
    'text!tpl/index/defaultList.mustache',
    'view/widget/alert',
    'app/index/accessoryGroup'
], function ($, store, Model, View, cTpl, alertView,initAccGroup) {
    return {
        init: function (data) {

            var dtd = $.util.Deferred();

            var model = new Model(),
                defaultListView = new View({
                    model: model,
                    el: '#J_DefaultList',
                    tpl:  {
                        defaultList: cTpl
                    }
                });
            defaultListView.afterRender = function(data){
                $('#J_DefaultList').show();
                clearTimeout(Tid);
                handleScroll(null, true);
                return this;
            };
            defaultListView.page = 1;

            var Tid,
                fetching = false,
                page = 1,
                pageTotal = 5,
                cateOneId = '868',
                cateTwoId = '11302',
                nowCateId = cateOneId,
                lastScrollY = window.pageYOffset,
            //window cache
                scrollY = window.pageYOffset,
                innerHeight,
                topViewPort,
                bottomViewPort;

            var reqData = {
                functionid:'searchCatelogy',
                //手机饰品 11302
                body: {
                    pagesize: '20',
                    page: '1',
                    catelogyId:'868',
                    isLoadPromotion:true,
                    isLoadAverageScore: true
                }
            };

            //'{"pagesize":"20","page":"1","catelogyId":"868","isLoadPromotion":true,"isLoadAverageScore":true}'

            model.defaultList(stringifyBody(page,nowCateId)).done(function(res){
                //console.log(res);

                if(res.code==0){
                    defaultListView.render(res)
                }else{
                    var alert = new alertView();
                    alert.render({
                        'msg': res.errmsg
                    });
                }

                return dtd.resolve(res);
            }).fail(function(error){
                alert('网络不稳定，休息一下，稍后试试~');

                return dtd.reject();
            });

            $(document).on('click.g','.tag-model',function(e){
                e.preventDefault();
                if (spinner) {
                    spinner.start();
                }
                var $tar = $(this),
                    sku = $tar.attr('data-sku'),
                    data = {},
                    phoneData ={};
                data.sku = $tar.attr('data-sku');
                //关闭原有的timeout 和事件


                //初始化accGroup
                initAccGroup.init(data).done(function(res){

                    clearTimeout(Tid);
                    $(document).off('click.g','.tag-model')
                    initAccGroup.setPhoneMenuCur($tar,sku);
                    $('#menu-trigger-acc').show();
                    $('#J_DefaultList').remove();

                }).fail(function(error){
                    $('#menu-trigger-model').trigger('close');

                    (new alertView()).render({
                        'msg': '程序猿开小差啦，换一个试试~'
                    });
                });
            });



            function stringifyBody(page,catelogyId) {

                var cataeId = catelogyId? catelogyId : cateOneId;

                var body = '{"pagesize":"20","page":"'+page+'","catelogyId":"'+cataeId+'","isLoadPromotion":true,"isLoadAverageScore":true}';
                reqData.body =body;
                //console.log({'默认配件请求数据':reqData})
                return reqData;
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

            function fetchDefaultList(){
                if (fetching) {
                    return;
                } else {
                    fetching = true;
                }

                page+=1;
                defaultListView.fill = 'after';

                model.defaultList(stringifyBody(page,nowCateId)).done(function(res) {

                    if(res.code == 0){
                        defaultListView.render(res);

                        fetching = false;
                    }else {
                        var alert = new alertView();
                        alert.render({
                            'msg': res.msg
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

                if (!force && lastScrollY == window.scrollY) {

                    Tid = window.setTimeout(handleScroll, 120);
                    return;
                } else {

                    lastScrollY = window.scrollY;
                }

                scrollY = window.scrollY;
                innerHeight = window.innerHeight;
                topViewPort = scrollY - 1000;
                bottomViewPort = scrollY + innerHeight + 1000;

                if (window.scrollY + innerHeight + 800 > document.body.offsetHeight) {
                    switch (nowCateId){
                        case  cateOneId:
                            if(page < pageTotal){
                                fetchDefaultList();
                            }else{
                                page = 0; //下次拉取会+1
                                nowCateId = cateTwoId;
                            }
                            break;
                        case cateTwoId:
                            if(page < pageTotal){
                                fetchDefaultList();
                            }else{
                                //没有更多了
                            }
                            break;
                        default:
                            break;
                    }
                }

                handleDefer();
                Tid =window.setTimeout(handleScroll, 120);
            }

            //Tid = window.setTimeout(handleScroll, 120); 写在afterRender里

            $(document).on('click','.pd-item',function(e){
                var sku = $(this).attr('data-sku');
                ping.click({
                    "report_eventid":"Accessory_Productid",
                    "report_eventparam": sku
                });
            });

            return dtd.promise();

        }
    }
});