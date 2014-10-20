/**
 * Created by Administrator on 2014/10/20.
 */
define(['common', 'util', 'common/iscroll'], function ($, util, iscroll) {

    //document.addEventListener('DOMContentLoaded',function(){

        var list = document.querySelector('#list'),
            header = document.querySelector('#header'),
            startY ,
            actived;

        var handleTouch = function(e){

            var moveTo;

            switch (e.type){
                case 'touchstart':
                    startY = e.touches[0].screenY;
                    console.log('start');
                    actived = false;
                    break;
                case 'touchmove':
                    console.log(actived)
                    if(!actived){

                        moveTo = e.touches[0].screenY - startY;
                        if(moveTo>0){
                            console.log('down');
                            header.style.display = "block";
                            actived = true;
                        }else if(moveTo < 0){
                            console.log('up');
                            header.style.display = "none";
                            actived = true;
                        }
                    }


                    break;
                case 'touchend':
                    break;

            }
        };

        list.addEventListener('touchstart',handleTouch,false);
        list.addEventListener('touchmove',handleTouch,false);
        list.addEventListener('touchend',handleTouch,false);


    //},false);
});