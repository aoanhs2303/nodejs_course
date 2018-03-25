var http = require("http");
var router = require('./app.js');

http.createServer(router.load_router).listen(3000);