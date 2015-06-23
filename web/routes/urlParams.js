var express = require('express');
var router = express.Router();

router.param('texto', function (req, res, next, texto) {
    req.texto = texto;
    next();
})

router.get('/texto/:texto', function(req, res, next) {
    var texto= req.texto;
    return res.render('texto', {
        texto: texto
    });
});

router.get('/prueba/:texto/prueba', function(req, res, next) {
    var texto = req.texto;
    return res.render('texto', {
        texto: texto
    });
});

router.param('nombre', function(req, res, next, nombre){//todos los url que tengan 'nombre' ejecutaran este callback, que recibe como cuarto parametro la variable que se le pasa
    req.nombreCompleto = nombre;
    next();
});
router.param('apellido', function(req, res, next, apellido){
    req.nombreCompleto = req.nombreCompleto + ' ' + apellido;
    next();
});

router.get('/:nombre/:apellido', function(req, res, next) {
    var username = req.query.username,//despues del ? en la url
        password = req.query.password;
    
    var nombre = req.params.nombre,//Parametros que se escriben en la url
        apellido = req.params.apellido;
    
    res.render('urlParams', {
        username: username,
        password: password,
        nombre: nombre,
        apellido: apellido,
        nombreCompleto: req.nombreCompleto
    });
});//http://localhost:8080/urlparams/monse/jimenez


router //hace diferentes request para un mismo path
    .route('/posts')
    .post(function(req, res, next) {
        console.log("se cargo el metodo post");
})
    .get(function(req, res, next) {
        console.log("se cargo el get en router ");
    res.json(req.post);
})
    .put(function(req, res, next) {
        console.log("se cargo el metodo put ");
    res.json(req.post);
})
    .delete(function(req, res, next) {
        console.log("se cargo el metodo delete");
    res.json({'message': 'ok'});
})

//request handlers
var ping = function(req, res, next) {
    console.log('ping');
    return next();
};

var pong = function(req, res) {
    console.log('pong');
    res.end(200);
};

router.get('/ping', ping, pong);

module.exports = router;
