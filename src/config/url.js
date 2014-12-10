define(function() {
	var self = this;
	return (function() {
		
		//var mainDomain = 'http://192.168.198.167:8013';
		var mainDomain = 'http://rs.jd.com';
		//var baseUrl = mainDomain + '/html/courier/' + dir +'/v1/html' ;
		var apiUrl = mainDomain;
        
		var re = {
			//baseUrl: baseUrl,
			mainDomain: mainDomain,
			apiUrl: apiUrl,
            transitApiUrl:'http://h5.m.jd.com'

		};
		for (var p in location) {
			var v = location[p],
				k = p;
			if (typeof v == 'string') {
				re[p] = v;
			}
		}
		re.rule = {
			pic:{
                url:'http://img10.360buyimg.com/mobilecms/s290x290_'
            }
		};
		return re;
	}).call(self)
});