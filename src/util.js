define(function() {
	function formatNum(Source, Length) {
		var strTemp = "";
		for (i = 1; i <= Length - Source.length; i++) {
			strTemp += "0";
		}
		return strTemp + Source;
	}

	return {
		formatTime: function(time) {
			console.log(time);
			return new Date(parseInt(time, 10) * 1000).toString('yyyy-MM-dd hh:mm')
		},

		formatPrice: function(price) {
			return (parseInt(price, 10) / 100).toFixed(2)
		},
		// ,
		// getImage46: function(url){
		// 	return url.replace(/\/\d{1,3}/,'/46');
		// },
		// getImage64: function(url){
		// 	return url.replace(/\/\d{1,3}/,'/64');
		// },
		// getImage96: function(url){
		// 	return url.replace(/\/\d{1,3}/,'/96');
		// },
		// getImage132: function(url){
		// 	return url.replace(/\/\d{1,3}/,'/132');
		// }

		stringToHex: function(str) {
			var res = [];
			for (var i = 0; i < str.length; i++) {
				res.push(formatNum(str.charCodeAt(i).toString(16), 4));
			}
			return res.join('');
		},
		processNum: function(num) {
			num = parseInt(num);
			if (num < 1) {
				return '';
			} else {
				if (num < 100) {
					num = '+' + num;
				} else if (num < 1000) {
					num = 99 + '+';
				} else if (num < 10000) {
					num = parseInt(num / 1000) + 'k+';
				} else if (num < 100000) {
					num = parseInt(num / 10000) + 'w+';
				}
				return num;
			}
		},
		objToString: function(obj){
			var str = JSON.stringify(obj);
			//替换双引号为单引号，[]为url中的转义字符%5b 和 %5d
			str = str.replace(/\"/g,"\'").replace(/\[/g,"\%5b").replace(/\]/g,"\%5d");
			return str;
		},
		//字符串截取，英文字符两个算一个中文字符
		/*@ str 需要截取的字符串
		 *@ length 截取后的字符串长度
		 *@ postfix 后缀，例如。。。
		 */
		splicStr: function(str,length,postfix){
			var len = 0;
 			str = str.split("");
 			for (var i=0;i<str.length;i++) {
  				if (str[i].charCodeAt(0)<299) {
   					len++;
  				} else {
   					len+=2;
  				}
  				if(len/2 > length){
  					str = str.join("").substr(0,i);
  					str += postfix;
  					return str;
  				}
 			}
 			return str+postfix;
		}
	}
});