// Login routing

var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  res.render('login');	// to file 'login.ejs'
});

router.post('/', function(req, res) {
	
	console.log(req.body);
});

module.exports = router;
