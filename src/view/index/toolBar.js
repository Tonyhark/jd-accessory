/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base'
], function($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        events: {
            'click .menu-trigger': 'handleMenu',
            'click .item-brand-trigger': 'getModelList'
        },
        handleMenu: function(e){
            var $tar = $(e.currentTarget),
                listId = $tar.attr('rel'),
                curMenuList = $('#'+listId),
                $menuWrap = $('.menu-pop');

            if($tar.hasClass('cur')){
                $tar.removeClass('cur');
                $menuWrap.hide();
                curMenuList.hide();
            }else{
                $menuWrap.show();
                $tar.addClass('cur').siblings().removeClass('cur');
                curMenuList.show().siblings('.menu-list').hide();
                //arrow

                var itemW = $tar.width(),
                    offestLeft = $tar.offset().left,
                    pos = offestLeft + parseInt(itemW/2);
                $('.icon-arrow').css('left', pos);
            }
        },
        getModelList: function(e){

            var $tar = $(e.currentTarget),
                $subListWrap = $tar.siblings('.sub-list'),
                openedLiClass = 'cur',
                selectedLiClass = 'item-selected',
                reqData = {},
                $li = $tar.parent(),
                selectedSku = $li.attr('data-sku');

            $li.siblings('li').removeClass(openedLiClass)
            if($li.hasClass(openedLiClass)){
                $li.removeClass(openedLiClass)

            }else{

                    var brandName = $tar.attr('data-brand');
                    var $temp = $('<div/>');
                    reqData.brandName = brandName;
                    this.model.typeList(reqData).done(function(res){

                        $.each(res.styleByBrandName, function(i,v){
                            $('<a/>').html(v.style).attr({
                                'href': 'index.html?sku='+ v.sku,
                                'data-sku': v.sku,
                                'class': 'tag-model'
                            }).appendTo($temp);
                        });
                        if(selectedSku){
                            $temp.find('[data-sku="'+ selectedSku +'"]').addClass('cur');
                        }
                        $subListWrap.html($temp.html());
                        $li.addClass(openedLiClass);

                    });
            }
        },

        afterRender: function(data){
            //判断是否需要显示配件菜单
            if(data.showAccMenu){
                $('.menu .fittings').show();
            }

            if(data.phone.brand&&data.phone.sku){

                var brandName = data.phone.brand,
                    sku = data.phone.sku,
                    style = data.phone.style;

                //初始化品牌列表项
                this.$('li[data-brand="'+ brandName +'"]')
                    .attr('data-sku',sku)
                    .addClass('item-selected')
                    .find('.select-sub').text(style);

                //详细页中需要设置配件选中id和名称
                if(data.acc){
                    $('#menu-trigger-acc').attr('data-acc',data.acc.accId).find('span').text(data.acc.accName);
                    $('#menu-list-acc').find('[data-acc-id="'+ data.acc.accId +'"]').addClass('cur');
                }
            }

            $('#J_Menu').show();
        }

    });

    return View;
});