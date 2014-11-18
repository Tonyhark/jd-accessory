/**
 * Created by Zhaoyue on 2014/11/3.
 */
define(['common'],function($){

    return {
        animEle: $('.device-anim'),
        init: function(){
            this.animEle.css('height', parseInt($(window)*0.72));
        },
        start :function(){
            $('.content').hide();
            this.animEle.show();
        },
        stop: function(modelName){
            var that = this;
            var delay =  1500;
            var txt;
            $('.content').show();
            txt = modelName ?  modelName : '没有检测到您的机型呢';
            $('.loader-txt').text(txt);
            var t = setTimeout(function(){

                that.animEle.addClass('back');

            },delay);
        }
    }
});