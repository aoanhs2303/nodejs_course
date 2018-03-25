var express = require('express');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage, fileFilter:checkFileUpload });
// Check chỉ cho up ảnh
function checkFileUpload (req, file, cb) {
  if(!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
    cb(new Error('I don\'t have a clue!'));
  } else {
    cb(null, true);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* SUBMIT form. */
// router.post('/', function(req, res, next) {
//   var title = req.body.tdsp;
//   res.send("Đã nhận được dữ liệu: " + title);
// });

router.post('/', upload.single('anhsp'), function(req, res, next) {
  var title = req.body.tdsp;
  res.send("Đã nhận được dữ liệu: " + title);
});

module.exports = router;
