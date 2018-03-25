var mongoose = require('mongoose');
var Sanpham = new mongoose.Schema({
    ten: {type: String},
    gia: {type: Number},
    hinhanh: {type: Array}
},{collection:'uploadsp'});
module.exports = mongoose.model("uploadsp",Sanpham);