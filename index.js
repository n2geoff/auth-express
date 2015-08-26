'use strict';

var _user = {};
var _realm = '';

function unauthorized(res) {
    var realm = _realm || 'My Realm';

    res.set('WWW-Authenticate', 'Basic realm="' + realm + '"');
    res.status(401).end('Unauthorized');
}

exports.required = function(req, res, next) {
    var input = null;
    var stored = null;

    if (!_user.username || !_user.password) return unauthorized(res);

    if (!req.user.username || !req.user.password) return unauthorized(res);

    input = new Buffer(_user.username + ':' + _user.password).toString('base64');
    stored = new Buffer(req.user.username + ':' + req.user.password).toString('base64');

    if (input !== stored) return unauthorized(res);

    next();
};

exports.basic = function(username, password, realm) {
    _user.username = username || null;
    _user.password = password || null;
    _realm         = realm    || null;

    return function(req, res, next) {
        req = req.req || req;
        req.user = {};

        var auth = req.headers.authorization;
        if (!auth) return next();

        // malformed
        var parts = auth.split(' ');
        if ('basic' != parts[0].toLowerCase()) return next();
        if (!parts[1]) return next();
        auth = parts[1];

        // credentials
        auth = new Buffer(auth, 'base64').toString();
        auth = auth.match(/^([^:]*):(.*)$/);
        if (!auth) return next();

        req.user = {
            username: auth[1],
            password: auth[2]
        };

        return next();
    };
};