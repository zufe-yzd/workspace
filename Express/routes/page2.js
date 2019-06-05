var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('page2', { title: '监控' });
});

module.exports = router;
