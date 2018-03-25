var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET news page. */
router.get('/tin-tuc', function(req, res, next) {
  res.render('tin', { title: 'Tin tức' });
});

/* GET sản phẩm page. */
router.get('/san-pham', function(req, res, next) {
  res.render('sanpham', { title: 'Sản phẩm' });
});

/* co the truyen mang. */
router.get('/fedu', function(req, res, next) {
  dulieu = {
    danhsachsv: ['viet', 'nga', 'nhat', 'luc']
  };
  res.render('fedu', { danhsach: dulieu });
});

module.exports = router;
