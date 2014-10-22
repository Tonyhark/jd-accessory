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

        //获取品牌
        brandsList: function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/initBrandName.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);

        },
        typeList : function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/styleByByBrandName.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        accessoresList: function(data, options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessoriesEntrance/initAccessoresType.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        goodsList: function(data,options){
            options = options || {};
            options.url = urlConfig.apiUrl + '/accessorie/page.jsonp';
            options.data= data;

            return Model.superClass.prototype.fetch.call(this, options);
        },

        //获取精品配件
        defaultList: function(data,options){
            options = options || {};
            //todo 修改路径
            options.url = 'http://gw.m.360buy.com/client.action';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);
        },
        // 获取筛选
        attrPanel: function(data,options){
            options = options || {};
            //路径 http://rs.jd.com/accessorie/center.json?sku=496292&thirdTypeId=10
            options.url = urlConfig.apiUrl + '/accessorie/center.jsonp';
            options.data= data;
            return Model.superClass.prototype.fetch.call(this, options);

        },




        //掌上京东展示配送员基本信息
        deliveryInfo: function(data, options) {
            // this.retJSON = {
            //     "code": 0,
            //     "msg": "调用成功",
            //     "msgCode": "0",
            //     "data": {
            //         "smallStaffPhoto": "http://img30.360buyimg.com/basic/g14/M0A/0E/06/rBEhV1Lgn4IIAAAAAAASkhyzehkAAIQ6wAwRqUAABKq415.jpg",
            //         "bigStaffPhoto": "http://img30.360buyimg.com/basic/g15/M02/06/19/rBEhWFMFxg0IAAAAAAE2IaisryYAAIyOgP5Z_cAATY5803.png",
            //         "staffName": "陈全峰2",
            //         "siteName": "中关村自提点1",
            //         "staffStar": "3",
            //         "phone": "13244445555",
            //         "signatures": "个性签名121个性签名121个性签名121",
            //         "jdUserName": "jdAccount",
            //         "star": false
            //     }
            // }
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/deliveryInfo/';

            options.urlREST = [data.erp, data.sid, data.userPin];

            return Model.superClass.prototype.fetch.call(this, options);
        },
        /**
         * 掌上京东展示配送员配送属性信息
         * @param  {[type]} data    [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        getStaffHonor: function(data, options) {
            // this.retJSON = {
            //     "code": 0,
            //     "msg": "调用成功",
            //     "msgCode": "0",
            //     "data": {
            //         "deliveryTime": "114",
            //         "deliveryAmount": "123",
            //         "deliveryAmount4User": "1",
            //         "deliveryRoad": "19999999",
            //         "deliveryRound": "0.01121"
            //     }
            // };
            //this.retJSON = null;
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/getStaffHonor/';
            options.urlREST = [data.erp, data.userPin, data.sid];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        /**
         * 获得印象标签
         * @param  {[type]} data    [description]
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        getLabelList: function(data, options) {
            // this.retJSON = {
            //     "code": 0,
            //     "msg": "调用成功",
            //     "msgCode": "0",
            //     "data": [{
            //         "ilid": null,
            //         "impressionName": "男神",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "随和",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "准点",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "利索",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "幽默",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "王者范",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "健康黑",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "大叔",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "爱护包裹",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }, {
            //         "ilid": null,
            //         "impressionName": "能吃苦",
            //         "hitsCount": "0",
            //         "lableType": null,
            //         "hit": false
            //     }]
            // };
            //this.retJSON = null;
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/getLabelList/';
            options.urlREST = [data.erp, data.userPin, data.sid];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        /**
         * 查询7个饮料列表
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        getGiftList: function(data, options) {
            // this.retJSON = {
            //     "code": 0,
            //     "msg": "调用成功",
            //     "msgCode": "0",
            //     "data": {
            //         "giftCount": 0,
            //         "beansCount": 0,
            //         "giftInfo": [{
            //             "giftId": 31,
            //             "giftName": "window",
            //             "giftIndex": 1,
            //             "image": "3567/03f70f93-7bc2-4a01-83bc-005de5a02ff1.jpg",
            //             "price": 1
            //         }, {
            //             "giftId": 58,
            //             "giftName": "包包",
            //             "giftIndex": 2,
            //             "image": "3863/e3107744-a40b-493e-85e1-f35151489057.jpg",
            //             "price": 0
            //         }, {
            //             "giftId": 35,
            //             "giftName": "保险",
            //             "giftIndex": 4,
            //             "image": "3254/2901ebc6-8e56-45f8-98aa-91b2f3a2b93e.jpg",
            //             "price": 6
            //         }, {
            //             "giftId": 27,
            //             "giftName": "电脑包包",
            //             "giftIndex": 16,
            //             "image": "3863/e3107744-a40b-493e-85e1-f35151489057.jpg",
            //             "price": 10
            //         }, {
            //             "giftId": 54,
            //             "giftName": "电脑包",
            //             "giftIndex": 23,
            //             "image": "2536/e0749b55-2e9e-4ff0-9b29-a9017da949c5.jpg",
            //             "price": 17
            //         }, {
            //             "giftId": 30,
            //             "giftName": "被子",
            //             "giftIndex": 26,
            //             "image": "1039/f0e47f23-050b-4fb5-97d0-b33a39da0fc5.jpg",
            //             "price": 2
            //         }, {
            //             "giftId": 45,
            //             "giftName": "皮带皮带",
            //             "giftIndex": 29,
            //             "image": "4694/96e456bc-c8b5-4838-968e-1780cd5545a9.jpg",
            //             "price": 0
            //         }]
            //     }
            // };
            //this.retJSON = null;
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/getGiftList/';
            options.urlREST = [data.erp, data.sid, data.userPin];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        getGiftHistoryList: function(data, options) {
            //  this.retJSON = {
            //     "code": 0,
            //     "msg": "调用成功",
            //     "msgCode": "0",
            //     "data": [{
            //         "jdUserName": "闲人小刚",
            //         "jdUserImage": "http://jss.jd.com/outLinkServicePoint/52b6f56a-c155-4203-8ebf-a91ca280805b.jpg",
            //         "giftSumPrice": 0,
            //         "giftSumCount": 1,
            //         "historyDate": "2014-08-11"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }, {
            //         "jdUserName": "jdsuhaox",
            //         "jdUserImage": null,
            //         "giftSumPrice": 0,
            //         "giftSumCount": 5,
            //         "historyDate": "2014-08-06"
            //     }]
            // };
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/getGiftHistoryList/';
            ///getGiftHistoryList/{erp}/{listSize}/{pageSize}
            options.urlREST = [data.erp, data.start, 10, data.sid, data.userPin];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        /**
         * 标签点击接口
         * @param {[type]} REST    [description]
         * @param {[type]} options [description]
         */
        setSigleLabel: function(data, options) {
            // this.retJSON = {
            // 	"code": 0,
            // 	"msg": "调用成功",
            // 	"msgCode": "0",
            // 	"data": 'test'
            // };
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/setSigleLabel/';
            options.urlREST = [data.erp, data.userPin, data.labelName, data.labelId, data.clickFlag, data.sid];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        /**
         * 保存赠送记录
         * @param {[type]} REST    [description]
         * @param {[type]} options [description]
         */
        setGiftRecord: function(data, options) {
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/setGiftRecord/';
            options.urlREST = [data.erp, data.beanCount, data.userPin, data.giftName, data.giftId, data.orderid, data.sid];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        comment: function(options) {
            this.retJSON = {
                "code": 0,
                "msg": "调用成功",
                "msgCode": "0",
                "data": {
                    'order_id': 123456
                }
            }
            options = options || {};
            options.url = urlConfig.apiUrl + '/delivery/newOrderInfo/';
            options.urlREST = [$.cookie.get('username')];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        submitComment: function(data, options) {
            /*
            this.retJSON = {
                "code":"0",
                "resultValue":{
                    "success":true,
                    "result":{}
                }
            }
            */
            options = options || {};
            var keypre = data.parentid + 'X' + data.id;
            options.url = urlConfig.apiUrl + '/delivery/gwRequestUrl/';


            //var value = util.objToString(obj);

            var value = '{"bizType":"1","surveyJson":"{\\"id\\":\\"' + data.parentid + '\\",\\"listAnswer\\":\\"[{\\\\\\"key\\\\\\":\\\\\\"' + (keypre + 'X' + data.subid[0][0]) + '\\\\\\",\\\\\\"value\\\\\\":\\\\\\"' + (data.subid[0][1]) + '\\\\\\"},{\\\\\\"key\\\\\\":\\\\\\"' + (keypre + 'X' + data.subid[1][0]) + '\\\\\\",\\\\\\"value\\\\\\":\\\\\\"' + (data.subid[1][1]) + '\\\\\\"},{\\\\\\"key\\\\\\":\\\\\\"' + (keypre + 'X' + data.subid[2][0]) + '\\\\\\",\\\\\\"value\\\\\\":\\\\\\"' + (data.subid[2][1]) + '\\\\\\"}]\\"}","orderId":"' + $.url.getParam('orderid') + '"}';

            data.url = "http://gw.m.360buy.com/client.action?functionId=tradeComment&did=3&body=" + encodeURIComponent(value);
            options.urlREST = [$.url.getParam('sid'), util.stringToHex($.url.getParam('userPin')), util.stringToHex((data.url))];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        orderInfo: function(data, options) {
            /*
			this.retJSON = {
			    "code": "0",
			    "orderInfo": {
			        "address": "北京石景山区石景山城区杨庄北区西现代城26-5-1201",
			        "balance": "0.00",
			        "cancleOrder": "false",
			        "carrier": "京东快递",
			        "confirmGoods": "false",
			        "confirmOrder": "false",
			        "customerName": "高田林",
			        "discount": "0.00",
			        "invoiceType": "不开发票",
			        "mobile": "18600695458 ",
			        "onlinePay": "false",
			        "orderId": "557901167",
			        "orderStatus": "完成",
			        "paymentType": "上门自提",
			        "pickSiteAddress": "北京市海淀区杏石口路65号益园文创基地C区11号楼1层侧门 010-82408293",
			        "price": "66.80",
			        "sendTime": "配送时间：仅白天送货（8:00至18:00）",
			        "sendTip": "送货日期：工作日、双休日与假日均可送货",
			        "shouldPay": "66.80",
			        "subOrder": "false",
			        "totalFee": "0.00",
			        "trueTotalFee": "0.00"
			    },
			    "wareInfoList": [
			        {
			            "adword": "（畅销书《雪豹训练手册》作者最新力作，苹果园，疯狂盒子社区，FCP中国用户组三大苹果社区鼎力推荐）",
			            "book": "false",
			            "canFreeRead": "false",
			            "endRemainTime": 0,
			            "imageurl": "http://img10.360buyimg.com/n5/g1/M01/06/1A/rBEGDlAg4d4IAAAAAAEBKlRrQoYAABVcACcrtoAAQFC941.jpg",
			            "num": 1,
			            "promotion": "false",
			            "startRemainTime": 0,
			            "wareId": "11051486",
			            "wname": "I'm a Mac雄狮训练手册"
			        },
			        {
			            "adword": "（畅销书《雪豹训练手册》作者最新力作，苹果园，疯狂盒子社区，FCP中国用户组三大苹果社区鼎力推荐）",
			            "book": "false",
			            "canFreeRead": "false",
			            "endRemainTime": 0,
			            "imageurl": "http://img10.360buyimg.com/n4/g13/M08/04/0F/rBEhVFIAcNgIAAAAAAXy_qZwmyEAABxMwJHKMUABfMW470.jpg",
			            "num": 1,
			            "promotion": "false",
			            "startRemainTime": 0,
			            "wareId": "11051486",
			            "wname": "I'm a Mac雄狮训练手册"
			        },
			        {
			            "adword": "（畅销书《雪豹训练手册》作者最新力作，苹果园，疯狂盒子社区，FCP中国用户组三大苹果社区鼎力推荐）",
			            "book": "false",
			            "canFreeRead": "false",
			            "endRemainTime": 0,
			            "imageurl": "http://img13.360buyimg.com/vclist/jfs/t190/139/965526973/6487/9cc7cc85/539fb4bbN5e364243.jpg",
			            "num": 1,
			            "promotion": "false",
			            "startRemainTime": 0,
			            "wareId": "11051486",
			            "wname": "I'm a Mac雄狮训练手册"
			        },
			        {
			            "adword": "（畅销书《雪豹训练手册》作者最新力作，苹果园，疯狂盒子社区，FCP中国用户组三大苹果社区鼎力推荐）",
			            "book": "false",
			            "canFreeRead": "false",
			            "endRemainTime": 0,
			            "imageurl": "http://img12.360buyimg.com/vclist/jfs/t145/353/847226411/5190/f6921bfb/539ab8d0Nc3cfba88.jpg",
			            "num": 1,
			            "promotion": "false",
			            "startRemainTime": 0,
			            "wareId": "11051486",
			            "wname": "I'm a Mac雄狮训练手册"
        }

			    ]
			}
			*/
            options = options || {};
            //options.url = "http://delivery.jd.com/delivery/gwRequestUrl/";
            options.url = urlConfig.apiUrl + '/delivery/gwRequestUrl/';
            var obj = {
                "pin": $.url.getParam('userPin'),
                "orderId": $.url.getParam('orderid'),
                "isPublish": true
            };
            //var value = util.objToString(obj);

            var value = encodeURIComponent(JSON.stringify(obj));
            data.url = "http://gw.m.360buy.com/client.action?functionId=newOrderInfo&did=1&clientVersion=3.8.0&client=apple&body=" + value;
            options.urlREST = [data.sid, data.userPin, util.stringToHex(data.url)];
            return Model.superClass.prototype.fetch.call(this, options);
        },
        serviceContent: function(data, options) {
            /*
			this.retJSON = {
			    "code": "0",
			    "resultValue": {
			    	"flag":"1",
			    	"gson":{
			    		"id":"549656",
			    		"name":"配送员服务评价",
			    		"code":"549656",
			    		"pid":"0",
			    		"listGroup":[{
			    			"id":"69",
			    			"name":"配送员服务评价题组",
			    			"code":"69",
			    			"pid":"549656",
			    			"listGroup":[{
			    				"id":"1827",
			    				"name":"商品包装满意度",
			    				"code":"1827",
			    				"pid":"69",
			    				"listGroup":[{
			    					"id":"A1",
			    					"name":"非常满意",
			    					"code":"1827A1",
			    					"pid":"1827",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A2",
			    					"name":"满意",
			    					"code":"1827A2",
			    					"pid":"1827",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A3",
			    					"name":"一般",
			    					"code":"1827A3",
			    					"pid":"1827",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A4",
			    					"name":"不满意",
			    					"code":"1827A4",
			    					"pid":"1827",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A5",
			    					"name":"非常不满意",
			    					"code":"1827A5",
			    					"pid":"1827",
			    					"listGroup":[]
			    				}]
			    			},
			    			{
			    				"id":"1828",
			    				"name":"送货速度满意度",
			    				"code":"1828",
			    				"pid":"69",
			    				"listGroup":[{
			    					"id":"A1",
			    					"name":"非常满意",
			    					"code":"1828A1",
			    					"pid":"1828",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A2",
			    					"name":"满意",
			    					"code":"1828A2",
			    					"pid":"1828",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A3",
			    					"name":"一般",
			    					"code":"1828A3",
			    					"pid":"1828",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A4",
			    					"name":"不满意",
			    					"code":"1828A4",
			    					"pid":"1828",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A5",
			    					"name":"非常不满意",
			    					"code":"1828A5",
			    					"pid":"1828",
			    					"listGroup":[]
			    				}]
			    			},
			    			{
			    				"id":"1829",
			    				"name":"配送人员的服务满意度",
			    				"code":"1829",
			    				"pid":"69",
			    				"listGroup":[{
			    					"id":"A1",
			    					"name":"非常满意",
			    					"code":"1829A1",
			    					"pid":"1829",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A2",
			    					"name":"满意",
			    					"code":"1829A2",
			    					"pid":"1829","listGroup":[]
			    				},
			    				{
			    					"id":"A3",
			    					"name":"一般",
			    					"code":"1829A3",
			    					"pid":"1829",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A4",
			    					"name":"不满意",
			    					"code":"1829A4",
			    					"pid":"1829",
			    					"listGroup":[]
			    				},
			    				{
			    					"id":"A5",
			    					"name":"非常不满意",
			    					"code":"1829A5",
			    					"pid":"1829",
			    					"listGroup":[]
			    				}]
			    			}]
			    		}]
			    	}
			    }
			}
			*/
            this.retJSON = null;
            options = options || {};
            //options.url = "http://192.168.198.167:8013/delivery/gwRequestUrl/";
            options.url = urlConfig.apiUrl + '/delivery/gwRequestUrl/';
            var obj = {
                "orderType": "0",
                "bizType": "0",
                "payId": "1"
            };

            // var value = util.objToString(obj);
            var value = encodeURIComponent(JSON.stringify(obj));

            data.url = "http://gw.m.360buy.com/client.action?functionId=tradeComment&did=2&body=" + value;
            options.urlREST = [data.sid, data.userPin, util.stringToHex(data.url)];
            return Model.superClass.prototype.fetch.call(this, options);
        }
    });

    return Model;
});