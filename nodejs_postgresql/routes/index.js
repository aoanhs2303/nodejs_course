var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodejsdemo',
  password: 'lucpro12',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  pool.query('SELECT * FROM contact', (err, res) => {
  })
});

/* GET them page. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu PostgreSQL' });
});
router.post('/them', function(req, res, next) {
  var ten = req.body.ten;
  var tuoi = req.body.tuoi;
  pool.query('INSERT INTO contact (ten,tuoi) VALUES ($1,$2)',[ten,tuoi], (err, res) => {
    console.log(res);
  })
  res.render('them', { title: 'Thêm dữ liệu PostgreSQL' });
});

/*Trang Xem*/
router.get('/xem', function(req, res, next) {
  pool.query('SELECT * FROM contact ORDER BY id ASC', (err, data) => {
    res.render('xem', { title: 'Thêm dữ liệu PostgreSQL', dulieu: data.rows });
  })
});

/*Xóa dữ liệu*/
router.get('/xoa/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  pool.query('DELETE FROM contact WHERE id=$1',[id], (err, data) => {
    res.redirect('/xem');
  })
});

/* GET sửa page. */
router.get('/sua/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  pool.query('SELECT * FROM contact WHERE id=$1',[id], (err, data) => {
    res.render('sua', { title: 'Sửa dữ liệu PostgreSQL', dulieu:data.rows  });
  })
});
router.post('/sua/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var ten = req.body.ten;
  var tuoi = req.body.tuoi;
  pool.query('UPDATE contact SET ten=$1, tuoi=$2 WHERE id=$3',[ten,tuoi,id], (err, res) => {});
  res.redirect('/xem');
});

module.exports = router;
