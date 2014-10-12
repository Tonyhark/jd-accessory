/**
 * Created by soulwu on 14-3-1.
 */
define( [
		'zepto',
		'mustache',
		'Deferred',
		'common/url',
		'common/cookie',
		'common/routie'
	],
	function( $, mustache, Deferred, url, cookie, routie) {
		$.mustache = mustache;

		$.util = {
			inherit: function( child, parent ) {
				if ( typeof parent != 'function' ) {
					parent = child;
					child = function() {
						if ( child.prototype.constructor != child ) {
							child.prototype.constructor.apply( this, arguments );
						} else {
							parent.apply( this, arguments );
						}
					};
				}

				function Ctor() {
					this.constructor = child;
				}

				Ctor.prototype = parent.prototype;
				child.prototype = new Ctor();
				child.__super__ = parent.prototype;
				child.superClass = parent;
				return child;
			},

			uniqueId: ( function() {
				var idCounter = 0;
				return function( prefix ) {
					var id = ++idCounter + '';
					return prefix ? prefix + id : id;
				};
			} )(),

			bind: function( fn, me ) {
				return function() {
					return fn.apply( me, arguments );
				};
			}
		};

		$.util.Deferred = Deferred.Deferred;
		$.util.Deferred.when = Deferred.when;

		var origAjax = $.ajax;
		$.ajax = function( options ) {
			var createWrapper, deferred;
			deferred = Deferred.Deferred();
			createWrapper = function( wrapped, finisher ) {
				return function() {
					var args;
					args = 1 <= arguments.length ? __slice.call( arguments, 0 ) : [];
					if ( typeof wrapped === "function" ) wrapped.apply( null, args );
					return finisher.apply( null, args );
				};
			};
			options.success = createWrapper( options.success, deferred.resolve );
			options.error = createWrapper( options.error, deferred.reject );
			origAjax( options );
			return deferred.promise();
		};

		$.url = url;
		$.cookie = cookie;

		Date.prototype.toString = function() {
			var args = {
					"d": 'getDate',
					"h": 'getHours',
					"m": 'getMinutes',
					"s": 'getSeconds'
				},
				rDate = /(yy|M|d|h|m|s)\1?/g,
				toString = Date.prototype.toString;

			return function( format ) {
				var me = this;

				if ( !format )
					return toString.call( me );

				return format.replace( rDate, function replace( key, reg ) {
					var l = key != reg,
						t;
					switch ( reg ) {
						case 'yy':
							t = me.getFullYear();
							return l && t || ( t % 100 );
						case 'M':
							t = me.getMonth() + 1;
							break;
						default:
							t = me[ args[ reg ] ]();
					}
					return l && t <= 9 && ( "0" + t ) || t;
				} );
			};
		}();

		$.xsr = function() {
			var headers = {
				//withCredentials : true
			};
			var timeout = 10000;
			switch ( arguments.length ) {
				case 1:
					//一个参数的时候
					var mixedRequest = arguments[ 0 ];
					if ( typeof mixedRequest == 'string' ) {
						$.get( mixedRequest );
					} else if ( typeof mixedRequest == 'object' ) {
						$.ajax( {
							url: mixedRequest.url,
							type: mixedRequest.method,
							timeout: mixedRequest.timeout || timeout,
							dataType: mixedRequest.dataType || 'json',
							success: mixedRequest.success,
							error: mixedRequest.error
						} );
					} else {
						//
					}
					break;
				case 2:
					//两个参数的时候
					var mixedRequest = arguments[ 0 ],
						callback = arguments[ 1 ];
					if ( typeof mixedRequest == 'string' && typeof callback == 'function' ) {
						$.ajax( {
							url: mixedRequest,
							type: 'get',
							timeout: timeout,
							dataType: 'json',
							success: callback,
							error: function( xhr, type, error ) {
								callback( {
									errno: type.toUpperCase()
								} );
							}
						} );
					} else if ( typeof mixedRequest == 'object' && typeof callback == 'function' ) {
						switch ( mixedRequest.way ) {
							case 'jsonp':
								$.ajax( {
									type: 'get',
									dataType: 'jsonp',
									url: mixedRequest.url,
									headers: headers,
									timeout: timeout,
									success: callback,
									error: function( xhr, type, error ) {
										callback( {
											errno: type.toUpperCase()
										} );
									}
								} );
								break;
							case 'iframePost':
								$.iframePost.apply( this, arguments );
								break;
							case 'script':
								var scriptDom = document.createElement( 'script' );
								document.body.appendChild( scriptDom );
								var timeout = setTimeout( function() {
									document.body.removeChild( scriptDom );
								}, 5000 );
								scriptDom.onload = function() {
									clearTimeout( timeout );
									try {
										callback();
									} catch ( e ) {

									} finally {
										document.body.removeChild( scriptDom );
									}
								}
								scriptDom.src = mixedRequest.url;
								break;
							default:
								if ( mixedRequest.urlEncodeCharset ) {
									headers[ 'urlEncodeCharset' ] = mixedRequest.urlEncodeCharset;
								}
								if ( mixedRequest.method == 'get' ) {
									$.ajax( {
										type: 'get',
										url: mixedRequest.url,
										headers: headers,
										timeout: timeout,
										dataType: 'json',
										success: callback,
										error: function( xhr, type, error ) {
											callback( {
												errno: type.toUpperCase()
											} );
										},
										withCredentials: mixedRequest.cookie == false ? false : true
									} );
								} else {
									$.ajax( {
										url: mixedRequest.url,
										type: 'post',
										data: mixedRequest.postData,
										headers: headers,
										timeout: timeout,
										dataType: 'json',
										success: callback,
										error: function( xhr, type, error ) {
											callback( {
												errno: type.toUpperCase()
											} );
										},
										withCredentials: mixedRequest.cookie == false ? false : true
									} );
								}
						}

					} else {
						//$.iframePost.apply(this, arguments);
					}
					break;
				default:
					//三个参数的时候
					$.iframePost.apply( this, arguments );
					/*
			
			*/
			}
		}
		return $;
	} );