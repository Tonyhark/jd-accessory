/**
 * Created by Administrator on 2014/10/27.
 */
define([
    'common',
    'view/base'
], function ($, BaseView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function(){

        },
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

            this.model.accessoryGroup(that.reqData).done(function (res) {

                console.log(res);

                if(res.resultQuery.list.length > 0){
                    that.render(res.resultQuery);



                }

            });
        },
        afterRender: function (data) {

            return this;
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