var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET xem page. */
router.get('/xem', function(req, res, next) {
  contactModel.find({},function(err,data) {
    res.render('xem', { title: 'Xem dữ liệu', dulieu: data });
  });
});

/* GET xoa page. */
router.get('/xoa/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  contactModel.findByIdAndRemove(id).exec();
  res.redirect('/xem');
});

/* GET sua page. */
router.get('/sua/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  contactModel.find({_id:id},function(err,data) {
    res.render('sua', { title: 'Sửa dữ liệu', dulieu: data });
  });
});

router.post('/sua/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  contactModel.findById(id, function (err, dulieu) {
    if (err) return handleError(err);
    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  });
});

/* GET sua page. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Sửa dữ liệu'});
});

/* POST them page. */
router.post('/them', function(req, res, next) {
  var item = {
    "ten": req.body.ten,
    "tuoi": req.body.tuoi
  }
  var dulieu = new contactModel(item);
  dulieu.save();
  res.redirect('/xem');
});

module.exports = router;
