/**
 * Created by soulwu on 14-2-28.
 */
define([
	'common',
	'tpl/tplhelper',
	'config/url'
], function($, helper, urlConfig) {
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
	var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'tpl', 'fill', 'renderType'];
	var BaseView = function(options, data) {
		this.cid = $.util.uniqueId('view');
		if (options) {
			for (var key in options) {
				if (options.hasOwnProperty(key) && viewOptions.indexOf(key) !== -1) {
					this[key] = options[key];
				}
			}
		}
		this.renderData = data;
		this._ensureElement();
		this.initialize.apply(this, arguments);
		this.delegateEvents();
	};

	$.extend(BaseView.prototype, {
		tagName: 'div',

		$: function(selector) {
			return this.$el.find(selector);
		},

		initialize: function() {},

		_ensureElement: function() {
			if (!this.el) {
				var attrs = $.extend({}, this.attributes);
				if (this.id) {
					attrs.id = this.id;
				}
				if (this.className) {
					attrs.className = this.className;
				}
				if (attrs['class']) {
					attrs.className = attrs['class'];
				}
				var el = $.extend(document.createElement(this.tagName), attrs);
				this.setElement(el, false);
			} else {
				this.setElement(this.el, false);
			}
		},

		setElement: function(element, delegate) {
			if (this.$el) {
				this.undelegateEvents();
			}
			this.$el = element instanceof $ ? element : $(element);
			this.el = this.$el[0];
			if (delegate !== false) {
				this.delegateEvents();
			}
			return this;
		},

		delegateEvents: function(events, keepOld) {
			if (!(events || (events = this.events))) {
				return this;
			}
			if (!keepOld) {
				this.undelegateEvents();
			}
			for (var key in events) {
				var method = events[key];
				if (typeof method !== 'function') {
					method = this[events[key]];
				}

				var match = key.match(delegateEventSplitter);
				var eventName = match[1],
					selector = match[2];

				eventName += '.delegateEvents' + this.cid;
				method = $.util.bind(method, this);
				this.$el.on(eventName, (selector ? selector : null), method);
			}
			return this;
		},

		undelegateEvents: function() {
			this.$el.off('.delegateEvents' + this.cid);
			return this;
		},

		render: function(data,html) {
			this.renderData = data;
			data.CONFIG = urlConfig;
			if ($.isFunction(this.beforeRender)) {
				this.beforeRender(data);
			}
			var view = $.extend({}, data, helper);

			if (this.renderType == 'normal') {
				//原来的，单模板方式
				var renderHtml = $.mustache.render(this.tpl, view);

				if (this.fill && this.fill == 'after') {
					this.$el.append(renderHtml);
				} else if (this.fill && this.fill == 'before') {
					this.$el.prepend(renderHtml);
				} else {
					this.$el.html(renderHtml);

				}
			} else {
				//使用textarea方式 ，推荐使用
				var templates = this.$el.find('.J_template');
				for (var i = 0, count = templates.length; i < count; i++) {
					var template = $(templates[i]);
					if (typeof(this.tpl) == 'object') {
						var renderHtml = $.mustache.render(template.text(), view, this.tpl);
					} else {
						var renderHtml = $.mustache.render(template.text(), view);
					}

					if (this.fill && this.fill == 'after') { //加到后面
						template.before(renderHtml);
					} else if (this.fill && this.fill == 'before') { //加到前面
						template.after(renderHtml);
					} else {
						template.after(renderHtml).remove();
					}
				}
			}
			//关掉loading
			if (spinner) {
				spinner.stop();
			}
			if ($.isFunction(this.afterRender)) {
				this.afterRender(data);
			}
			return this;
		}
	});

	return BaseView;
});