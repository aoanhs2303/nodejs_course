var http = require("http");
http.createServer(function(req, res) {
    res.writeHead(200, {"content-type":"text/html"});
    res.write("<a>Server ket noi thanh cong</a>");
    res.write("<p>p Tag</p>");
    res.end();
}).listen(1234)