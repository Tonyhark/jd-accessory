/**
 * Created by soulwu on 14-3-1.
 */
define([
	'common'
], function($) {
	var ModelOptions = ['url'];
	var BaseModel = function(options) {
		this.cid = $.util.uniqueId('model');
		options = options || {};
		for (var key in options) {
			if (options.hasOwnProperty(key) && ModelOptions.indexOf(key) !== -1) {
				this[key] = options[key];
			}
		}

		this.initialize(options);
		this.retJSON = null;
	};

	$.extend(BaseModel.prototype, {
		initialize: function() {},

		fetch: function(options) {
			var _THIS = this;
			//如果是一个REST请求，则拼接URL
			if (options.urlREST && options.url) {
				options.url = options.url + options.urlREST.join('/');
			}
			var ajaxOptions = $.extend({
				'type': 'GET',
				'charset': 'utf8',
				'dataType': 'jsonp',
				'jsonp': 'callback', //如果是jsonp，需要带此参数
				'timeout': 1000 * 100
			}, options);

			if (this.retJSON) {
				//如果有测试数据，则直接返回数据。
				var dfr = $.util.Deferred();
				setTimeout(function() {
					dfr.resolve(_THIS.retJSON);
				}, 0);
				return dfr.promise();
			} else {
				return $.ajax(ajaxOptions).done(function(ret) {
					//console.log('-----');
					//console.log(ret);
					// alert(ajaxOptions.url +'\n'+JSON.stringify(ret));
					//_THIS.retJSON = ret;
				});

			}
			return this;
		}
	});

	return BaseModel;
});