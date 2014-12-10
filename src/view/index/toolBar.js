/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        $map: {
            $mask: this.$('.menu-overlay'),
            $dropDown: this.$('.menu-pop')
        },
        events: {
            'click .menu-trigger': 'handleMenu',
            'click .item-brand-trigger': 'getModelList',
            'close .menu-trigger': 'closeBrandList',
            'click .menu-overlay': 'closeBrandList'
        },
        handleMenu: function (e) {
            e.preventDefault();

            var $tar = $(e.currentTarget),
                listId = $tar.attr('rel'),
                curMenuList = $('#' + listId),
                $menuWrap = this.$map.$dropDown,
                $mask = this.$map.$mask;

            if ($tar.hasClass('cur')) {
                $tar.removeClass('cur');
                $menuWrap.hide();
                curMenuList.hide();
                $mask.hide();
            } else {
                $menuWrap.show();

                $mask.show();
                $tar.addClass('cur').siblings().removeClass('cur');
                curMenuList.show().siblings('.menu-list').hide();
                //arrow
                var itemW = $tar.width(),
                    offestLeft = $tar.offset().left,
                    pos = offestLeft + parseInt(itemW / 2);
                $('.icon-arrow').css('left', pos);
            }

            if (listId == "menu-list-acc") {
                ping.click({
                    "report_eventid": "Accessory_CategoryFilter"

                });
            } else if (listId == "menu-list-model") {
                ping.click({
                    "report_eventid": "Accessory_BrandFilter"
                });
            }
        },
        getModelList: function (e) {

            var $tar = $(e.currentTarget),
                $subListWrap = $tar.siblings('.sub-list'),
                openedLiClass = 'cur',
                reqData = {},
                $li = $tar.parent(),
                selectedSku = $li.attr('data-sku');

            $li.siblings('li').removeClass(openedLiClass)
            if ($li.hasClass(openedLiClass)) {
                $li.removeClass(openedLiClass)
            } else {
                $li.addClass(openedLiClass);
                $subListWrap.html($('<div/>', {class: 'loading-sublist'}).text('努力加载中...'));
                var brandName = $tar.attr('data-brand');
                var $temp = $('<div/>');
                reqData.brandName = encodeURI(brandName);
                this.model.typeList(reqData).done(function (res) {

                    $.each(res.styleByBrandName, function (i, v) {
                        $('<a/>').html(v.style).attr({
                            'href': 'pjzx.html?sku=' + v.sku,
                            'data-sku': v.sku,
                            'class': 'tag-model'
                        }).appendTo($temp);
                    });
                    if (selectedSku) {
                        $temp.find('[data-sku="' + selectedSku + '"]').addClass('cur');
                    }
                    $subListWrap.html($temp.html());
                });

                ping.click({
                    "report_eventid":"Accessory_Brand",
                    "report_eventparam": brandName
                });
            }


        },
        closeBrandList: function () {
            //$('.menu-list').hide();
            this.$map.$mask.hide();
            this.$map.$dropDown.hide();
            this.$('.menu-trigger').removeClass('cur');

        },
        afterRender: function (data) {
            //判断是否需要显示配件菜单
            if (data.showAccMenu) {
                $('.menu .fittings').show();
            }

            if (data.phone.brand && data.phone.sku) {

                var brandName = data.phone.brand,
                    sku = data.phone.sku,
                    style = data.phone.style;

                //初始化品牌列表项
                this.$('li[data-brand="' + brandName + '"]')
                    .attr('data-sku', sku)
                    .addClass('item-selected')
                    .find('.select-sub').text(style);
            }
            //详细页中需要设置配件选中id和名称
            if (data.acc) {
                $('#menu-trigger-acc').attr('data-acc', data.acc.accId).find('span').text(data.acc.accName);
                $('#menu-list-acc').find('[data-acc-id="' + data.acc.accId + '"]').addClass('cur');
            }

            $('#J_Menu').show();
        }

    });

    return View;
});