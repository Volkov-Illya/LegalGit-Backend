/*
 * @author ohmed
 * Server router list
*/

var fs = require('fs');

var api = require('./server/api/Core.js');
var Express = require('express');
var path = require('path');

//

var Router = {};

Router.setup = function ( expressAPP ) {

    Router.setupApi( expressAPP );

};

Router.setupApi = function ( expressAPP ) {
    
    expressAPP.post( '/api/timeline/import', api.import );
    expressAPP.get( '/api/timeline/getEvents', api.getEvents );
    expressAPP.get( '/api/timeline/getDocuments', api.getDocuments );

};

//

module.exports = Router;
