/**
 * Created by soulwu on 14-2-27.
 */
require.config({
	baseUrl: '/html/courier/dist/v1/',
	urlArgs: 'v=20140521',
//	urlArgs: 'v='+(new Date()),
	paths: {
		'common': '../common',
		'zepto': './common/zepto',
		'mustache': './common/mustache',
		'Deferred': './common/Deferred',
		'common/url': './common/url',
		'common/cookie': './common/cookie',
		'common/routie':'./common/routie',
		'common/iscroll':'./common/iscroll',
		'text': '../text',
		'app' : 'app',
		'common/ping':'./common/ping',
		'common/md5':'./common/md5'
	},
	shim: {
		'zepto': {
			exports: '$'
		},
		'mustache': {
			exports: 'mustache'
		}
	}
});