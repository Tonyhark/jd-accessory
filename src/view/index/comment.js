define([
	'common',
	'view/base',
    'common/iscroll'
], function($, BaseView) {
	var View = $.util.inherit(BaseView);
	$.extend(View.prototype, {
		events: {
			'click .J_comment_submit': 'submit',
			'click .J_comment_star': 'chooseStar'
		},
		submit: function() {
			var score = this.computeScore();
            var _THIS = this;
            var data = {};
            data.parentid = $('.seviceStar').eq(0).attr('data-ppid'); 
            data.id = $('.seviceStar').eq(0).attr('data-pid'); 
            data.subid = score;
            var param = JSON.stringify(score);
            if(ping){
                ping.click({"report_eventid":"Courier_Submit","report_eventparam":param});
            }
            _THIS.model.submitComment(data).done(function(ret) {
                var content = ret.data;
                content = content.replace(/"{/g, '{').replace(/\}"/g,'}');
                var value = JSON.parse(content);
                if (value.code == 0 && value.resultValue.success) {
                    $( '#J_tpl_comment' ).hide();
                    $( '#J_evaluated' ).show();
                    $('.J_comment_text').html("已评价");
                    /*缓存数据更新
                    var orderid = $.url.getParam('orderid');
                    var orderinfo;
                    try {
                        orderinfo = localStorage.getItem('courier_orderinfo_'+orderid);
                    } catch (e) {
                    //
                    }
                    var content = JSON.parse(orderinfo);
                    content.publishMap.isPublish = 1;
                    try {
                        orderinfo = localStorage.setItem('courier_orderinfo_'+orderid, JSON.stringify(content));
                    } catch (e) {
                    //
                    }*/
                } else {
                    alert("提交失败，请稍候重试");
                }
            }).fail(function(error) {
                alert('网络不稳定，休息一下，稍后试试~');
            });
        },

        chooseStar: function(el){
        	var _THIS = this;
        	var id = el.currentTarget.id.substr(1);
        	var parent = el.currentTarget.parentElement;
        	var star = parent.children;
        	for(var i = 0, len = star.length; i < len; i++){
        		if(star[i].id.substr(1) > id){
        			star[i].className = "J_comment_star";
        		}else{
        			star[i].className = "selected J_comment_star";
        		}

        	}
        },

        computeScore: function(){
        	var pnode = $('.c_sevice_star');
        	var len = pnode.length;
        	var totalscore = {};
        	for(var i = 0; i < len; i++){
        		var id = pnode[i].dataset.subid;
        		var childnode = pnode[i].children;
        		for(var j = 0, clen = childnode.length; j < clen; j++){
                    var score = [];
                    score[0] = id;
        			if( childnode[j].className.indexOf('selected') == -1){
                        score[1] = childnode[j-1].id;
        				break;
        			}else{
        				score[1] = childnode[j].id;
        			}
                    totalscore[i] = score;
        		}
        	}
        	return totalscore;
        }
	});

	return View;
});