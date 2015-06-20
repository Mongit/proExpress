var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page.*/

router.get('/', function(req, res, next) {
  res.render('index', { 
                        title: 'Express',   
                        appName: req.appName, 
                        number: req.number,
                        img: req.img
                    });
});

router.get('/compress', function(req, res, next) {
  res.render('compress');
});

router.get('/formulario', function(req, res, next) {
  res.render('formulario');//muestra vista del formulario
});

router.post('/formulario', function(req, res, next) {//recibe la informacion del submit
    console.dir(req.body);//body parse toma la info del formulario y lo pone en el body
    res.send(req.body);//manda un objeto
    //res.render('formulario');//vuelve a mandar la vista del formulario, res.render manda una vista
    
});

router.get('/json', function(req, res, next) {
    res.json({title: 'Express', appName: req.appName, color: 'morado' });
});

router.get('/queryString', function(req, res, next) { 
    console.dir(req.query);
    res.render('queryString', { query: JSON.stringify(req.query)});//convierte a json 
});

router.get('/bodyparser', function(req, res, next) {
    res.render('bodyparser', {body: '' });
});

router.post('/bodyparser', function(req, res, next) {
    res.render('bodyparser', {body: JSON.stringify(req.body) });
});

router.get('/cookie', function(req, res, next){
    var valor = '';
    if (req.cookies.galleta !== undefined)
        valor = req.cookies.galleta;
    
    res.render('cookie', {valor: valor});
});

router.post('/cookie', function(req, res, next){
//res.cookie un metodo para guardar una cookie, se lo manda al browser
    res.cookie('galleta', req.body.valor, {maxAge: 4000, httpOnly: true });
    res.render('cookie', {valor: req.body.valor});
});

router.get('/session', function(req, res, next) {
    var fullname = req.session.fullname || '';
    res.render('session', { fullname: fullname, csrfToken: req.csrfToken() });
});

router.post('/session', function(req, res, next) {
    req.session.fullname = req.body.nombre + ' ' + req.body.apellido;
    res.send('data is being processed');//envia objs al html 
});

var errorMiddleware = function(req, res, next) {
    next(new Error('Sorry, something went wrong :('));
};

router.get('/error', errorMiddleware, function(req, res, next) {
    res.render('index');
});

router.delete('/purchase-orders', function(request, response){
    console.log('The DELETE route has been triggered');
    response.status(204).end();
});

router.get('/upload', function(req, res){
    res.render("upload");
});

router.post('/upload', function(request, response) {
    
    request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {//sube el archivo
        file.on('data', function(data){//evento entra al buffer
            fs.writeFile(__dirname + '/../public/shared/' + filename, data);
        });
        file.on('end', function(){//termina
            console.log('File' + filename + ' is ended');
        });
        
    });
    request.busboy.on('finish', function(){
        console.log('Busboy is finished');
        response.status(201).end();
    });
});


module.exports = router;
