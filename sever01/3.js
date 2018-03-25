
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    fs.readFile(__dirname + "/giaodien.html", "utf-8", function(err, content) {
        if(err) {
            console.log(err);
        } else {
            res.writeHead(200, {"content-type": "text/html"});
            res.write(content);
        }
    });
}).listen(4000);