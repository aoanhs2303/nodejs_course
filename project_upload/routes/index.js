var express = require('express');
var multer  = require('multer')
var router = express.Router();
const mongoose = require('mongoose');
var uploadModel = require('../model/uploadsp'); //Link dến bảng uploadsp
mongoose.connect('mongodb://localhost/sanpham');
var images = [];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/anhsanpham')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +  file.originalname)
  }
})

var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST home page. */
router.post('/uploadfile', upload.any(), function(req, res, next) {
  images.push(req.files[0].path);
  res.status(200).send(req.files);
});
/* POST home page. */
router.post('/upsanpham', function(req, res, next) {
  var ten = req.body.ten;
  var gia = req.body.gia;
  var item = {
    "ten":ten,
    "gia":gia,
    "hinhanh":images
  }
  var dulieu = uploadModel(item);
  dulieu.save();
  res.render('thanhcong');
});
/* GET xemsp page. */
router.get('/xemsp', function(req, res, next) {
  uploadModel.find({},function(err,data) {
    console.log(data);
    res.render('xemsp', {dulieu: data});
  })
  
});
module.exports = router;
