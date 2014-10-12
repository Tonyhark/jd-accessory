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

            console.log(that.model.options)


            //var sortingData =that.getData();
            //sortingData.column += 1;
            //var pageNo = sortingData.list.


            this.model.goodsList(sortingData).done(function (res) {


                that.render(res.resultQuery)
            });
        },
        afterRender: function (data) {

            return this;
        },
        setData: function (ele) {
            var data = {};


            data.pageNo = 0;
            data.thirdTypeId = 3;
            data.sku = 1023433;
            data.brandId = '';
            data.column = this.$('.sorting-current');
            data.sp = 'asc';
            data.condition = '';
            data.priceCondition = '';
            this.reqData = data;
        },
        sortHandler: function (e) {
            var $target = $(e.currentTarget),
                that = this,
                columeValue = $target.attr('data-column'),
                data;
            data = that.reqData;

             console.log(data);
            $.extend(data,{
                column: columeValue
            });



            this.model.goodsList(data).done(function (res) {

                that.render(res.resultQuery);
                $target.addClass('sorting-current').siblings().removeClass('sorting-current');
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