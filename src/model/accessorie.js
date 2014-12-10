/**
 * Created by soulwu on 14-3-1.
 */
define([
    'common',
    'model/base',
    'config/url',
    'util'
], function($, BaseModel, urlConfig, util) {
    var Model = $.util.inherit(BaseModel);

    $.extend(Model.prototype, {
        initialize: function(options) {
            this.id = options.id || null;
        },

        //拉取获取手机品牌
        brandsList: function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/initBrandName.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);

        },
        // 拉取品牌下的手机型号
        typeList : function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/styleByByBrandName.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        //拉取配件种类
        accessoresList: function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/initAccessoresType.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        //拉取配件商品
        goodsList: function(data,options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessorie/page.jsonp';
            options.data= data;

            return Model.superClass.prototype.fetch.call(this, options);
        },

        // 拉取筛选
        attrPanel: function(data,options){
            options = options || {};
            //路径 http://rs.jd.com/accessorie/center.json?sku=496292&thirdTypeId=10
            options.url = urlConfig.apiUrl + '/accessorie/center.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);

        },
        //获取创意配件 手机饰品 这里通过参数拉取2种3级类目
        defaultList: function(data,options){
            options = options || {};

            options.url = urlConfig.transitApiUrl + '/h5api.jsp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        // 根据sku拉取所有配件分组数据
        accessoryGroup: function(data,options){
            options = options || {};

            options.url = urlConfig.apiUrl + '/accessorie/service.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        // 根据手机型号 拉取sku
        skuNumber: function(data,options){
            options = options || {};

            options.url = urlConfig.transitApiUrl + '/h5api.jsp';
            //options.url = 'http://172.22.144.53:1604/h5api.jsp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        }
    });

    return Model;
});