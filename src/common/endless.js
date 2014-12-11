/**
 * Created by Zhaoyue on 2014/12/9.
 */
define('common/endless',['zepto'],function($){

    var lastScrollY = window.pageYOffset,
        scrollY = window.pageYOffset,
        innerHeight,
        topViewPort,
        bottomViewPort;

    function Endless (options){
        var defaults = {
            itemClass: 'lazy-item',
            imgClass:'lazy-img',
            dataSrc: 'data-src',
            dataLazy: 'data-lazy',
            timeout: 100
        };
        this.settings = $.extend({},defaults,options);
        this.init();
    }
    Endless.prototype = {
        constructor: Endless,
        init: function(){
            this.handleScroll();
        },
        isVisble: function(node){
            var offTop = node.offsetTop,
                offsetHeight = node.offsetHeight;

            return offTop + offsetHeight > topViewPort && offTop < bottomViewPort;
        },
        handleDefer: function(){
            var list = document.querySelectorAll('['+ this.settings.dataLazy +'="true"]'),
                i,
                len = list.length;

            for(i = 0;i < len;i++){
                if(this.isVisble(list[i])){
                    var thisImg = list[i].querySelector('.'+this.settings.imgClass),
                        imgSrc = thisImg.getAttribute(this.settings.dataSrc);
                    list[i].setAttribute(this.settings.dataLazy,'false');

                    var handler = function(){
                        var node,src;
                        node = thisImg;
                        src = imgSrc;
                        return function(){
                            node.src = src;
                            //node.style.opacity = 1;
                        }
                    }()

                    var img = new Image();
                    img.onload = handler;
                    //img.onerror = handler;
                    img.src = imgSrc;
                }
            }
        },
        handleScroll: function(e, force){
            var that = this;
            //if scroll hasn't changed, do nothing;
            if (!force && lastScrollY == window.scrollY) {
                this.tId = window.setTimeout(function(){
                    that.handleScroll()
                }, that.settings.timeout);

                return;
            } else {
                lastScrollY = window.scrollY;
            }

            scrollY = window.scrollY;
            innerHeight = window.innerHeight;
            topViewPort = scrollY ;
            bottomViewPort = scrollY + innerHeight + 200;

            // 需要判断是否需要加载更多
            if (window.scrollY + innerHeight + 800 > document.body.offsetHeight) {

                //加载更多函数
                alert(1);

            }

            this.handleDefer();
            Tid = window.setTimeout(function(){
                that.handleScroll();
            }, this.settings.timeout);
        },
        stop:function(){
            clearTimeout(this.tId);
        }

    };

    return Endless;
})