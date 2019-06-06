var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('page3', { title: '全局' });
});

module.exports = router;
