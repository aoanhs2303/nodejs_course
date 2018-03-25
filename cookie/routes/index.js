import { log } from 'util';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/suadaunanh/:sdt', function(req, res, next) {
  res.cookie('dt', req.params.sdt);
  res.send("Số điện thoại là: " + req.params.sdt);
});

router.get('/banhran', function(req, res, next) {
  res.send("Số điện thoại là: " + req.cookies.dt);
});

router.get('/xoacookie', function(req, res, next) {
  res.clearCookie('dt');
  res.send("Đã xóa");
});

router.get('/taosession', function(req, res, next) {
  req.session.monan = "Bún bò";
  res.send("Đã tạo rồi");
});

router.get('/laysession', function(req, res, next) {
  res.send("Session là: " + req.session.monan);
});

router.get('/xoasession', function(req, res, next) {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.send("Đã xóa");
});

module.exports = router;
