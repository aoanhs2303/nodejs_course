var express = require('express');
var router = express.Router();


router.get('/nhanvat.chn', function(req, res, next) {
  res.send('day la trang fashion > nhanvat');
});
router.get('/phongcanh.chn', function(req, res, next) {
  res.send('day la trang fashion > phongcanh');
});
router.get('/nhaydam.chn', function(req, res, next) {
  res.send('day la trang fashion > nhaydam');
});

module.exports = router;
