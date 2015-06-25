var express = require('express');
var router = express.Router();
var fs = require('fs');

//To trigger an error from within our request handlers and middleware, we can just call
router.get('/', function(req, res, next){
    next(error);
});
 
//Or, if we want to pass a specific error message, then we create an Error object and pass it to next():
//router.get('/', function(req,res,next){
  //  next(new Error('Something went wrong :-('));
//});

//Main middleware
router.use(function(err, req, res, next) {
    console.error("El error *** " + err + " *** Entro al error handler");
    next(err);
    //res.status(500).send();
});

//It's recommended to send at least a brief error messag. The response can be anything: JSON, text, redirect, etc.
router.use(function(err, req, res, next) {
    console.error("\n Error handler 2 " + err);
    //res.status(500).send({status:500, message: 'internal error', type:'internal'});
    console.log({status:500, message: 'internal error', type:'internal'});
    //res.status(500);
    next(err);
}) 

//The most straightforward(sencillo) way is to just send a text:
router.use(function(err, req, res, next) {
    console.log("\n Error handler 3 " + err);
    //res.status(500).send('Internal server error');
    console.log('Internal server error');
    next(err);
})

//Now, if we know that it's secure to output the error message:
router.use(function(err, req, res, next) {
    console.error("\n Error handler 4 " + err);
//    res.status(500).send('internal server error: ' + err);
    next(err);
});

//To simply render a static error page with the name 500.ejs
router.use(function(err, req, res, next) {
    console.error("\n Error handling 5 " + err);
    //res.render('500', {err: err});
    next(err);
});

/*//We can also use res.redirect():
router.use(function(err, req, res, next) {
    res.redirect('/public/500.html');
})
*/

//This is how we can send the status 500 (Internal Server Error) without sending back any data:
router.use(function(err, req, res, next) {
    //res.end(500);
    res.send(500);
});


module.exports = router;
