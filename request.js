var http = require('http');

var options = {
    host:'app.yixun.com',
    method: 'GET',
    path:'/tjson.php?mod=tindex&act=getconf'
};
var body = '';
var req = http.request(options, function(res){
    console.log(options);
    console.log(res);
    res.on('data',function(data){
        body += data; 
    });
    res.on('end',function(){
        console.log("111:"+body);
    });
});
req.on('error', function(e) {
    console.log(e);
});
req.end();
