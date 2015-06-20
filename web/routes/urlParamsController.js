var Controller = function() {

}

Controller.prototype.get = function(urlParams, req, res next) {
    var username = req.query.username,//despues del ? en la url
        password = req.query.password;
    
    var nombre = req.params.nombre,
        apellido = req.params.apellido;
    
    res.render('urlParams', {username: username,
                            password: password,
                            nombre: nombre,
                            apellido: apellido});
}

module.exports = function () {
    return new Controller();
}