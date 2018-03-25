var express = require('express');
var router = express.Router();


router.get('/mot.chn', function(req, res, next) {
  res.send('day la trang fashion > mot');
});
router.get('/lamdep.chn', function(req, res, next) {
  res.send('day la trang fashion > lamdep');
});
router.get('/starstyle.chn', function(req, res, next) {
  res.send('day la trang fashion > starstyle');
});

module.exports = router;
