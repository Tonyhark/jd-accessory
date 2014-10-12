/**
 * Created by soulwu on 14-3-3.
 */
define([
	'util'
], function(util) {
	return {
		formatTime: function() {
			return function(text, render) {
				return util.formatTime(render(text));
			};
		},
		formatPrice: function() {
			return function(text, render) {
				return util.formatPrice(render(text));
			};
		},
		formatFloat:function(){
			return function(text, render) {
				return parseFloat(render(text)).toFixed(2);
			};
		}
	};
});