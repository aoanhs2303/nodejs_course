var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/chi-tiet/*.:idsp', function (req, res, next) {
  var idsp = req.params.idsp;
  if (!req.session.spdaxem) {
    req.session.spdaxem = [];
  }
  if (req.session.spdaxem.indexOf(idsp) == -1) {
    req.session.spdaxem.push(idsp);
  }

  res.render('chitiet', {
    idsp: req.params.idsp
  });
});
router.get('/ds', function (req, res, next) {
  res.render('ds', {
    danhsach: req.session.spdaxem
  });
});

module.exports = router;