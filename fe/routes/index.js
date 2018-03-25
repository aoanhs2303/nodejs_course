var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET about page. */
router.get('/about.html', function(req, res, next) {
  res.render('about', { title: 'Trang About' });
});

/* GET about page. */
router.get('/post.html', function(req, res, next) {
  res.render('blog', { title: 'Trang Blog' });
});

/* GET tham so page. */
router.get('/sp/:id', function(req, res, next) {
  res.send('San pham: ' + req.params.id);
});


module.exports = router;
