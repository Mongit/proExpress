var express = require('express');
var router = express.Router();
var fs = require('fs');

//res.render() with the 'name argument' (mandatory)
router.get('/render', function(req, res) {
    res.render('render', {title: 'Pro Express.js'});
});

//res.render(), with 'data parameter', makes templates more dynamic
router.get('/render-title', function(req, res) {
    res.render('render', {title: 'Pro Express.js'});
});

//res.render() callback, accpets 2 parameters, you can do just about anything, as long as there’s an ending to the response (response.json, response.send, or response.end).
router.get('/render-retitle', function(req, res) {
    res.render('render', {title: 'Different Pro Express.js'}, function(error, html) {
    //res.render('render', function (error, html){  
        console.log(html);
        res.send(html);
    });
});

router.get('/locals', function(req, res, next) {
    res.locals = {title: 'Locals Express.js'};
   // console.log(res.locals);
    res.render('render');
 /*   res.locals = { user: {admin: true}};
    next();//eliminar en la vista el <%=title%>
    }, function(req, res) {
    console.log(res.locals);
    res.render('render');*/
});

router.get('/set-html', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.end('<html><body>' + '<h1>Express.js Guide</h1>' + '</body></html>');
});

router.get('/set-csv', function(req, res) {
    var body = 'title, tags\n' + 
        'Practical Node.js, node.js express.js\n' + 
        'Rapid Prototyping with JS, backbone.js node.js mongodb\n' + 
        'JavaScript: The Good Parts, javascript\n';
    
    res.set({'Content-Type': 'text/csv', 
             'Content-length': body.toString().length,
             'Set-Cookie': ['type = reader', 'language=javascript']});
    res.end(body);
});

//this route, returns 200 (OK) if the server is still up and running. It won’t send back any text or HTML. We use response.end() because response.send() will automatically add the proper status code 200:
router.get('/status', function(req, res){
    res.status(200).end();
});

//status code and data parameters can be combined in a chained statement.
router.get('/send-ok', function(req, res) {
    res.status(200).send({message: 'Data was submitted successfully.'});
});

router.get('/send-err', function(req, res) {
    res.status(500).send({message: 'Oops, the server is down.'});
});

router.get('/send-buf', function(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(new Buffer('text data that will be converted into buffer'));
});

router.get('/json', function(req, res) {
    res.status(200).json([{title: 'Practical Node.js', tags: 'node.js express.js'},
                          {title: 'Rapid Prototyping with JS', tags: 'backbone.js node.js mongodb'}, 
                          {title: 'JavaScript: The Good Parts', tags: 'javascript'}
                        ]);
});

router.get('/api/v1/stories/:id', function(req, res){
    req.story = {cinderella: 'Girls Story', hulk: 'Boys Story'};
    res.json(req.story);// es lo mismo que res.send
    //res.send(req.story);
})

router.get('/jsonp', function (req, res) {
    res.status(200).jsonp([{title: 'Express.js Guide', tags: 'node.js express.js'},
                        {title: 'Rapid Prototyping with JS', tags: 'backbone.js, node.js, mongodb'},
                        {title: 'JavaScript: The Good Parts', tags: 'javascript'}
    ]);
});

/*
router.get('/redirect', function(req, res) {
    //res.redirect('http://google.com');//full path
    //res.redirect('/json');//relative path
    res.redirect(301,'../layout');//absolute path
});*/
  
router.get('/redirec', function(req, res) {
    //res.redirect('http://google.com');//full path
    //res.redirect('/res/json');//relative?
    res.redirect(301, '../layout/');//absolute
});

router.get('/stream1', function(req, res) {
    var stream = fs. createReadStream(__dirname + '/../public/images/a.jpg');
    stream.pipe(res);
});

//Use event handlers with data and events
router.get('/stream2', function(req, res) {
    var stream = fs.createReadStream(__dirname + '/../public/images/a.jpg');
    stream.on('data', function(data) {//evento q se ejecuta cuando empieza a cargar el archivo, que hara cuando empieza a descargar
        res.write(data);
    });
    stream.on('end', function() {//cuando termina el evento
        res.end();//termina el res
    });
});

//nonstreaming equivalent 
router.get('/non-stream', function(req, res) {
    var file = fs.readFileSync(__dirname + '/../public/images/a.jpg');
    res.end(file);
});

router.get('/non-stream2', function(req, res) {
    var file = fs.readFile(__dirname + '/../public/images/a.jpg', function(error, data){
        res.end(data);
    });
});

module.exports = router;
