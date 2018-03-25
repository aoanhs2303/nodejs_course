var fs = require('fs');

function docHtml(tenfile, res) {
    res.writeHead(200, {"content-type":"text/html; charset=utf-8"});
    fs.ReadStream(tenfile).pipe(res);
}

var load_router = function(req,res) {
    var path = req.url;
    switch(path) {
        case "/": 
            docHtml('giaodien1.html', res);
            break;
        case "/tintuc":
            docHtml('giaodien2.html', res);
            break;
        default: 
            res.writeHead(404);
            res.write("Khong tim thay noi dung");
    }
};

module.exports.load_router = load_router;