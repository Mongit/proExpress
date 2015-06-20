var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

router.get('/', function(req, res) {
  res.render('index.swig');
});

module.exports = router;
