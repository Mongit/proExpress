var Monads = function() {

}

Monads.prototype.setAppName = function(app) {

    var monad = function(req, res, next) {
        req.appName = app.get("appName");
        next();
    };
    
    return monad;
}

module.exports = function () {
    return new Monads();
}
