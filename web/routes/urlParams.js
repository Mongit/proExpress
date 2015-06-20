var express = require('express');
var router = express.Router();

router.get('/:nombre/:apellido', function(req, res, next) {
    var username = req.query.username,//despues del ? en la url
        password = req.query.password;
    
    var nombre = req.params.nombre,
        apellido = req.params.apellido;
    
    res.render('urlParams', {username: username,
                            password: password,
                            nombre: nombre,
                            apellido: apellido});
});//http://localhost:8080/urlparams/monse/jimenez

module.exports = router;
