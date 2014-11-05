/**
 * Created by Administrator on 2014/10/10.
 */
define([
    'common',
    'view/base',
    'view/detail/attrPanel'
], function ($, BaseView,AttrPanelView) {
    var View = $.util.inherit(BaseView);
    $.extend(View.prototype, {
        initialize: function(config){

//            $(window).scroll(function(e){
//                console.log(e);
//            });

            $(document).on('click','#J_AttrBtn', $.util.bind(this.handleFilter,this));

            $(document).on('click','.tag-model',$.util.bind(this.handleSelectModel,this))

            $(document).on('click','.menu-item-acc',$.util.bind(this.handleSelectAcc,this))

        },
        events: {
            'click #refresh': 'handleLoadMore',
            'touchstart .sroting-btn': 'handleSort'
        },

        render:function(data,locator){
            console.log(data);
            View.superClass.prototype.render.call(this, data,locator);
        },

        handleLoadMore: function (e) {
            spinner.start();
            var that = this;
            that.fill = 'after';
            that.reqData.pageNo += 1;

            this.model.goodsList(that.reqData).done(function (res) {


                    that.render(res.resultQuery);
                    // 判断更多
                    if(!that.reqData.pageNo < res.resultQuery.allPageNo){
                        that.$('#refresh').hide();
                    }

            });
            return false;
        },
        afterRender: function (data) {
            var column = this.reqData.column;
            this.pageTotal = data.allPageNo;
            this.pageNo = data.currentPageNo;
            console.log(this.reqData);
            if(column==0||column==2){

                $('.pd-item').parent().each(function(i,ele){
                    if(i<3){
                       $(ele).addClass('show-icon');
                    }
                });
            }

            return this;
        },
        handleSort: function (e) {
            if (spinner) {
                spinner.start();
            }
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
            return false;
        },
        handleFilter:function(e){
            spinner.start();
            var $tar = $(e.currentTarget);
            var that= this;
            var condition= [];
            var priceCondition = '';
            var data = this.reqData;
            that.fill = '';
            $('.attr-first-li').each(function(i,ele){
                var $ele = $(ele),
                    attrId = $ele.attr('data-attr-id'),
                    optionId = $ele.attr('data-option-id'),
                    optionName = $.trim($ele.attr('data-option-name'));
                    if(optionId){
                        if(attrId!=954){ //价格除外
                            var condiStr = attrId+':'+ optionId;
                            condition.push(condiStr);
                        }else{
                            priceCondition = optionName
                        }
                    }
            });
            condition = condition.join(';');

            $.extend(data,{
                condition: condition,
                priceCondition: priceCondition
            });

            this.model.goodsList(data).done(function (res) {
                that.render(res.resultQuery,'#goods-list');
                $('#J_AttrPane').trigger('close');
                if(condition !='' || priceCondition !=''){
                    $('#J_AttrTrigger').addClass('cur');
                }else{
                    $('#J_AttrTrigger').removeClass('cur');
                }
            });
            return false;
        },
        handleSelectModel: function(e){
            e.preventDefault();
            var $tar = $(e.currentTarget),
                sku = $tar.attr('data-sku'),
                thirdTypeId = $('#menu-trigger-acc').attr('data-acc');

            this.goUrl(sku,thirdTypeId);
        },
        handleSelectAcc: function(e){
            e.preventDefault();
            var $tar = $(e.currentTarget),
            thirdTypeId = $tar.attr('data-acc-id'),
            sku = $('#menu-trigger-model').attr('data-sku');

            this.goUrl(sku,thirdTypeId);
        },
        goUrl: function(sku,thirdTypeId){

            var baseUrl = location.href;
            baseUrl = baseUrl.substring(0,baseUrl.indexOf('?')) ;
            if(thirdTypeId){
                baseUrl += '?sku='+ sku + '&thirdTypeId='+ thirdTypeId;
            }else{
                baseUrl = baseUrl.replace('detail.html','index.html');
                baseUrl += '?sku='+ sku;
            }

            location =  baseUrl;

        }
    });

    return View;
});