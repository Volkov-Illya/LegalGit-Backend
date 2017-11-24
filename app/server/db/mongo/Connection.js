/*
 * @author ohmed
 * Mongo DB connection setup
*/

var mongoose = require('mongoose');
var environment = require( '../../config/LocalEnvironment.js')
mongoose.Promise = global.Promise;

//
mongoose.connect( environment.mongodb.host + '/' + environment.mongodb.db, { useMongoClient: true } );

var connection = mongoose.connection;

connection.on( 'error', console.error.bind ( console, 'connection error' ) );
connection.once( 'open', function ( callback ) {

    console.log( 'legalGit: MongoDB connection succeeded.' );

});

//

module.exports = {
    mongoose: mongoose,
    connection: connection
};
