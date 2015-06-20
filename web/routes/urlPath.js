var express = require('express');
var router = express.Router();

router.get('/path/not/Required/To/Follow/FileStructure', function(req, res, next) {
  res.render('hola');
});

module.exports = router;
