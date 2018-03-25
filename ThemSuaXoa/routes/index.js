var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var chuyenObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contact';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET them du lieu. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Them moi du lieu' });
});
/* GET them du lieu. */
router.post('/them', function(req, res, next) {
  var dulieu01 = {"ten": req.body.ten, "sdt": req.body.sdt};
  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Insert some documents
    collection.insert(dulieu01, function(err, result) {
      assert.equal(err, null);
      console.log("Them duoc roi");
      callback(result);
    });
  };

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    insertDocuments(db, function() {
      client.close();
    });
  });

  res.redirect('/them');
});

/* GET them du lieu. */
router.get('/xem', function(req, res, next) {
  const findDocuments = function(db, callback) {
    const collection = db.collection('nguoidung');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
  }
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    findDocuments(db, function(dulieu) {
      res.render('xem', { title: 'Xem dữ liệu', dulieu: dulieu });
      console.log(dulieu);
      client.close();
    });
  });

  /* GET xóa dữ liệu by id. */
  router.get('/xoa/:idxoa', function(req, res, next) {
    var idxoa = chuyenObjectID(req.params.idxoa);
    
    const xoacontact = function(db, callback) {
      const collection = db.collection('nguoidung');
      collection.deleteOne({ _id : idxoa }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        callback(result);
      });    
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      xoacontact(db, function() {
        client.close();
      });
    });
    res.redirect("/xem")
  });
});

router.get('/sua/:idsua', function(req, res, next) {
  var idsua = chuyenObjectID(req.params.idsua);
  console.log(idsua);
  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Find some documents
    collection.find({_id: idsua}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      // console.log(docs);
      callback(docs);
    });
  }
    // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function(dulieu) {
      res.render('sua', { title: 'Sửa dữ liệu', dulieu: dulieu });
      console.log(dulieu);
      client.close();
    });
  });
});

/* POST sua dữ liệu by id. */
router.post('/sua/:idcansua', function(req, res, next) {
  var id = chuyenObjectID(req.params.idcansua);
  var dulieu01 = {"ten": req.body.ten, "sdt": req.body.sdt};

  const updateDocument = function(db, callback) {
    const collection = db.collection('nguoidung');
    collection.updateOne({ _id : id }
      , { $set: dulieu01 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      callback(result);
    });  
  };
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    updateDocument(db, function() {
      res.redirect('/xem');
      client.close();
    });
  });
});


module.exports = router;
