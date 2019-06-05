var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
	});
	app.get('/login', function (req, res) {
		res.render('login', { title: '监控' });
	});
	// router.post('/login', function (req, res) {
	// });
	app.get('/page2.html', function (req, res) {
		res.render('page2', { title: '外围' });
	});
	// router.post('/page2', function (req, res) {
	// });
	app.get('/page3', function (req, res) {
		res.render('page3', { title: '全局' });
	});
	// router.post('/page3', function (req, res) {
	// });
	app.get('/end', function (req, res) {
	});
};

// var page2 = require('./');

// router.use('/', page2);

module.exports = router;
