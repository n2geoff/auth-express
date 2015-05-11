# auth-basic

A Basic Authentication middleware for Express 4.x

The primary goal is to provide a simple method for adding Basic Authentication to
ExpressJS apps.

> A Fork of [basic-auth](https://github.com/jshttp/basic-auth) 

## Installation

	npm install auth-basic

## Express Example

if the middleware succeeds then the decoded username and password will be attached to the request object; `req.user`.

	var express = require('express'),
		auth  = require('auth-express'),
		app = express();

	app.use(auth.basic(process.env.AUTHUSER, process.env.AUTHPASS));

	app.get('/', auth.required, function(req, res) {
		res.send('Looks like your authorized');
	});

	app.listen(process.env.PORT || 3000);


## TODO

- provide alternate methods to check credentials
- expand flexiblity
- write tests
- comment code

## License

[MIT](https://github.com/n2geoff/auth-express/blob/master/LICENSE)