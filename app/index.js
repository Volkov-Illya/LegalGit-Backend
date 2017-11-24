/*
 * @author ohmed
 * Core server start
*/

console.log( 'Starting legalGit' );

//

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');

// Detect environment

global.environment = require('./server/core/app/Environment.js');

// Setup redis/mongod connections

global.MongoDB = require('./server/db/mongo/Connection.js');

var ServerRouter = require('./Router.js');

// Setup express server

var app = express()
    .use( cookieParser() )
    .use( multer({ dest: __dirname + '/uploads' }).any() )
    .use( bodyParser.urlencoded({ extended: true }) )
    .use( bodyParser.json({ limit: '5mb' }) );

//

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

ServerRouter.setup( app );
app.listen( environment.web.port );

//

console.log( 'legalGit: ' + environment.name + ' service started.' );
