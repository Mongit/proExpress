var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//for reading POSTed form data into req.body
var monadsFactory = require('./ch4/monads');
var monads = monadsFactory();
var middlewareFactory = require('./ch4/middleware');
var middleware = middlewareFactory();
var session = require('express-session');//the session is stored
var csrf = require('csurf');
var error = require('errorhandler');
var timeout = require('connect-timeout');
var methodOverride = require('method-override');
var responseTime = require('response-time');
var serveIndex = require('serve-index');
var busboy = require('connect-busboy');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('x-powered-by', false);
app.set('json spaces', 2);//Da identacion al json
app.set('json replacer', function(key, value){
    if (key === 'title')//no aparece el titulo en el json
        return undefined;
    else
        return value;
});

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compression({threshold: 1}));
app.use(logger('dev'));//escribe una bitacora de lo q va pasando en el server(Morgan)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(__dirname + '/public/images'));
app.use(error());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));//cambia el metodo cuando el browser no lo soporta
app.use(responseTime(4));//digitos del tiempo
app.use('/shared', serveIndex(
    path.join('public', 'shared'),
    {'icons': true}
));
app.get(
    '/slow-request',
    timeout('1000'),
    function(request, response, next) {
        setTimeout(function(){
            if (request.timedout) return false;
            return next();
        }, 999 + Math.round(Math.random()));
    }, function(request, response, next) {
        response.send('ok');
    }
);

app.use(session({
    secret:"Hello",
    resave: false,
    saveUninitialized: true
}));

app.use('/session', csrf({ cookie: true}));

app.use(monads.setAppName(app));
app.use(middleware.createMyMiddleware(app));
app.use(middleware.middlewareWithMandatoryFunction(app));
//we can use the path parameter which restricts the use of this particular middleware to only the routes that have such a prefix.
app.use('/users', middleware.mountingMiddleware(app));
app.use('/upload', busboy({immediate: true }));


//STATIC MIDDLEWARE EXAMPLES
//app.use(logger('combined'));
//app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/users', users);
//app.use('/cookie', galleta);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
