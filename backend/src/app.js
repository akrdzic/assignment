'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const routes = require('./routes');
const errorHandler = require('./middleware/ErrorHandler');
const authenticate = require('./middleware/Auth');
const setAnonymous = require('./middleware/SetAnonymous');

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(authenticate);

app.use(setAnonymous);

// Set routes
app.use('/', routes);

app.use(errorHandler);

module.exports = app;



// const morgan = require('morgan');
// const i18n = require('../../lib/helpers/i18n').i18n;
//
// function appSetup(app) {
//     morgan.token('access-token', req => req.headers.access_token);
//     app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url" :status :access-token :res[content-length] :req[content-length] :response-time ms ":referrer" ":user-agent"'));
//
//     // setting request size
//     //app.use(bodyParser.json({ limit: '10mb' }));
//
//     // For setting various HTTP headers.
//     // app.use(helmet());
//     // GZIP compression on all requests
//     // app.use(compression());
//
//     //app.use(bodyParser.urlencoded({ extended: false }));
//     // i18n init parses req for language headers.
//     app.use(i18n.init);
//
//     // allowing app to deal with ajax calls
//     app.use(global.Packages.Oyster.Middleware.allow_ajax);
//     // this middleware add method "" in request object that iterates all params in request object and create object
//     app.use(global.Packages.Oyster.Middleware.param_object);
//     // to handle all the errors that are raised on app (should pass express cycle for e.g must call next(err); )
//     // should be use in last after every app.use
//     app.use(global.Packages.Oyster.Middleware.error_handler);
// }
//
// module.exports = appSetup;