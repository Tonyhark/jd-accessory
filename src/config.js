/**
 * Created by soulwu on 14-2-27.
 */
require.config({
    baseUrl: '/src/', ///active/peijian/
    urlArgs: 'v=20140521',
    //urlArgs: 'v='+(new Date()),
    paths: {
        'common': './common',
        'zepto': './common/zepto',
        'mustache': './common/mustache',
        'Deferred': './common/Deferred',
        'common/url': './common/url',
        'common/cookie': './common/cookie',
        'common/routie':'./common/routie',
        'common/store':'./common/store',
        'text': './text',
        'app' : 'app',
        'common/iscroll':'./common/iscroll',
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