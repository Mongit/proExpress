var Middleware = function(){

}

Middleware.prototype.createMyMiddleware = function(app){
    
    var myMiddleware = function(req, res, next){
        req.number = app.get("number");
        //console.log('This is myMiddleware and I have the number: ' + app.get('number'));
        next();
    }
    return myMiddleware;
};

Middleware.prototype.middlewareWithMandatoryFunction = function (app) {
    //app use has one optional string parameter path and one mandatory function parameter callback
    var mandatoryFunction = function(req, res, next){
        console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
        return next();
    };
    return mandatoryFunction;
};

Middleware.prototype.mountingMiddleware = function (app) {
//mounting, we can use the path parameter, which restricts the use of this particular middleware to only the routes that have such a prefix..
    var parameter = function(req, res, next){
        console.log('%s %s - %s', (new Date).toString(), req.method, req. url);
        return next();
    };
    return parameter;
};

module.exports = function () {
    return new Middleware();
}