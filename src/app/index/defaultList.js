/**
 * Created by Administrator on 2014/10/22.
 */
define([
    'common',
    'common/store',
    'model/accessorie',
    'view/index/defaultList',
    'text!tpl/index/defaultList.mustache',
    'view/widget/alert'
], function ($, store, Model, View, cTpl, alertView) {
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
                handleScroll(null, true)
                return this;
            };
            defaultListView.page = 1;

            var fetching = false,
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
                console.log(res);

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

            function stringifyBody(page,catelogyId) {

                var cataeId = catelogyId? catelogyId : cateOneId;

                var body = '{"pagesize":"20","page":"'+page+'","catelogyId":"'+cataeId+'","isLoadPromotion":true,"isLoadAverageScore":true}';
                reqData.body =body;
                console.log(reqData)
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
                var $imgs = $('.pd-img');

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
                    window.setTimeout(handleScroll, 120);

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
                        case cateTwoId:
                            console.log (nowCateId)
                            if(page < pageTotal){
                                fetchDefaultList();
                            }else{
                                //没有更多了
                            }
                    }
                }

                handleDefer();
                window.setTimeout(handleScroll, 120);
            }

            window.setTimeout(handleScroll, 120);

            return dtd.promise();

        }
    }
});