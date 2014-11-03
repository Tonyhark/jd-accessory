/**
 * Created by Administrator on 2014/10/13.
 */
define(['common', 'util', 'common/iscroll'], function ($, util, iscroll) {
    $(function () {

        var count;
        // lte ie8  只能用绑在window上，其他浏览器可以绑在document上
        $(window).scroll(function (e) {
            var output = document.getElementById('output');
            count = $(window).scrollTop();
            var node = document.createElement('div');
            node.innerHTML = count;
            output.appendChild(node);

            count > 100 ? $('.top-bar').addClass('top-bar-fixed') : $('.top-bar').removeClass('top-bar-fixed')


        });

        var printDiv = document.createElement('div'),
        body  = document.getElementsByTagName('body')[0];
        body.appendChild(printDiv);

        printDiv.style.position = 'fixed';
        printDiv.style.backgroundColor = '#999';
        printDiv.style.bottom=0;

        document.getElementsByTagName('body')[0].addEventListener('touchstart', touchHandler, false);
        document.addEventListener('touchmove', touchHandler, false);
        document.addEventListener('touchend', touchHandler, false);
        function touchHandler(e) {

            var t = e.type;
            switch (t) {
                case 'touchstart':

                    printDiv.innerHTML = 'touchstart';

                case 'touchmove':
                    //printDiv.innerHTML = 'touchmove';

                case 'touchend':
                   // printDiv.innerHTML = 'touchend';


            }
        }

    })

});
