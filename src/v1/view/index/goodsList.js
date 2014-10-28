/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base',
    'common/iscroll'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        events: {
            'click .goods-item': 'handler',
            'click #refresh': 'refreshHandler',
            'click .sroting-btn': 'sortHandler'
        },
        handler: function (e) {
            console.log($(e.currentTarget).attr('class'));
        },
        refreshHandler: function (e) {
            var that = this;
            that.fill = 'after';
            that.reqData.pageNo += 1;

            this.model.goodsList(that.reqData).done(function (res) {

                if(res.resultQuery.list.length > 0){
                    that.render(res.resultQuery);

                    // 判断更多
                    if(!that.reqData.pageNo < res.resultQuery.allPageNo){
                        that.$('#refresh').hide();
                    }

                }

            });
        },
        afterRender: function (data) {

            return this;
        },
        sortHandler: function (e) {
            var $target = $(e.currentTarget),
                that = this,
                columeValue = $target.attr('data-column'),
                data = that.reqData;
            that.fill = '';

            $.extend(data,{
                column: columeValue,
                pageNo: 0  //页数归零
            });


            this.model.goodsList(data).done(function (res) {

                that.render(res.resultQuery,'#goods-list');
                $target.addClass('sorting-current').siblings().removeClass('sorting-current');
                // 判断更多
                if(!data.pageNo < res.resultQuery.allPageNo){
                    that.$('#refresh').hide();
                }else{
                    that.$('#refresh').show();
                }
            });

        },
        reqData: {
            pageNo: 0,
            thirdTypeId: 3,
            sku: 1023433,
            brandId: '',
            column: 0,
            sp: 'asc',
            condition: '',
            priceCondition: ''
        }





    });

    return View;
});