var express = require('express');
var router = express.Router();

//req.query,todo lo que va despues del ?
router.get('/', function(req, res, next) {
    //res.send(req.query);
    var objeto = JSON.stringify(req.query);
      res.render('search', {reqQuery: objeto});
});

router.get('/params/:role/:name/:status', function(req, res) {
    //res.send(req.params);
    var objeto = JSON.stringify(req.params);
    var route = JSON.stringify(req.route);
    res.render('params', {params: objeto, route: route});
});

router.get('/reqbody', function(req, res) {
    res.render('reqBody', {body: ''});
});

router.post('/reqbody', function(req, res) {//propiedades del req
    var objeto = JSON.stringify(req.body);
    res.render('reqBody', {body: objeto});
});

router.get('/reqcookies', function(req, res){
    if (!req.cookies.counter)
        res.cookie('counter', 0);
    else
        res.cookie('counter', parseInt(req.cookies.counter,10) + 1);
    res.status(200).send('cookies are: ', req.cookies);
})

router.get('/signed-cookies', function(req, res){
    if (!req.signedCookies.counter)
        res.cookie('counter', 0, {signed: true});
    else
        res.cookie('counter', parseInt(req.signedCookies.counter,10) + 1, {signed: true});
    res.status(200).send('cookies are: ', req.signedCookies);
});

router.get('/header', function(req, res) {//metodo del req
    var header = req.get('Content-Type');
    res.render('header', {header: header});
});


module.exports = router;
