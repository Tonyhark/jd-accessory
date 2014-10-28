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
            'click .item-brand-trigger': 'getModelList',
            'click .tag-model': 'handleClickTag'
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
                isSelected = $li.hasClass(selectedLiClass);

            $li.siblings('li').removeClass(openedLiClass)
            if($li.hasClass(openedLiClass)){
                $li.removeClass(openedLiClass)

            }else{
                if(!isSelected){
                    var brandName = $tar.attr('data-brand');
                    var $temp = $('<div/>');
                    reqData.brandName = brandName;
                    this.model.typeList(reqData).done(function(res){

                        $.each(res.styleByBrandName, function(i,v){
                            $('<span/>').html(v.style).attr({
                                'data-sku': v.sku,
                                'class': 'tag-model'
                            }).appendTo($temp);
                        });
                        $subListWrap.html($temp.html());
                        $li.addClass(openedLiClass);
                    });
                }else{
                    $li.addClass(openedLiClass);
                }
            }

        },
        handleClickTag: function(e){
            var $tar = $(e.currentTarget),
                sku = $tar.attr('data-sku'),
                reqData = {},
                isSelected = $tar.hasClass('cur');
            if(!isSelected){
                reqData.sku = sku
                this.model.accessoryGroup(reqData);
            }
        },
        afterRender: function(data){
            console.log(data);
            if(data.showAccList){
                $('.menu .fittings').show();
            }
            if(data.phone.brand&&data.phone.sku){
                var brandName = data.phone.brand,
                    sku = data.phone.sku;
                this.$('li[data-brand="'+ brandName +'"]').addClass('item-selected');
                this.$('span[data-sku="'+ brandName +'"]').addClass('style');
            }
        }
    });

    return View;
});