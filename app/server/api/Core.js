/*
 * @author ohmed
 * Auth service api
*/
var xlsx = require('xlsx');

var core = require('./../core/timeline/Timeline.js');

//

var Timeline = {};

Timeline.import = function ( req, res ) {

	if ( ! req.files.length || ! req.files[ 0 ].path ) {

        return res.send({ code: 0, message: 'Main dataset file not specified.' });

    }

    var path = req.files[ 0 ].path;
    var sheet = xlsx.readFile( path );

    var Source = 'Source 1';

    var json = xlsx.utils.sheet_to_json( sheet.Sheets[ Source ] );

    core.import( json, function ( err, result ) {

        if ( err ) {

            return res.send( err );

        }

        return res.send( result );

    });

};

Timeline.getEvents = function ( req, res ) {

    core.getEvents( function ( err, result ) {

        if ( err ) {

            return res.send( err );

        }

        return res.send( result );

    });

};

Timeline.getDocuments = function ( req, res ) {

    var id = req.query.id;

    core.getDocuments( id, function ( err, result ) {

        if ( err ) {

            return res.send( err );

        }

        return res.send( result );

    });

};

//

module.exports = Timeline;
