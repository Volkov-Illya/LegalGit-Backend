

var TimelineSchema = require( './../../db/mongo/schemas/Timeline.js' );
var TimelineModel = MongoDB.mongoose.model( 'Timeline', TimelineSchema );

var EventsSchema = require( './../../db/mongo/schemas/Events.js' );
var EventsModel = MongoDB.mongoose.model( 'Events', EventsSchema );

var DocumentsSchema = require( './../../db/mongo/schemas/Documents.js' );
var DocumentsModel = MongoDB.mongoose.model( 'Documents', DocumentsSchema );

// 

var SSF = require('xlsx').SSF;
var async = require('async');
var eachSeries = require('async/eachSeries');
var waterfall  = require('async/waterfall');

// 

var Timeline = {};
var asyncTasks = [];
var asyncDocuments = [];

// 

Timeline.import = function ( data, callback ) {

    var date = 'Timestamp';
    var title = 'American Standard Version';
    var description = 'LOLCAT';

    var titles = [];

    for ( var key in data[ 0 ] ) {
        
        if ( key !== 'Timestamp' ) {
            
            titles.push( key )

        }

    }

    async.waterfall([
        createTimeline,
        createEvents
    ], function ( err, result ) {

        if ( err ) {

            return callback({ code: 0, message: err });
            

        }
        
        return callback( null, { success: true } );

    });

    function createTimeline ( callback ) {

        titles.forEach( function ( item ) {

            asyncTasks.push( function ( callback ) {

                TimelineModel
                .create({
                    title: item
                })
                .then ( function ( result ) {

                    return callback( null, result );

                })
                .catch ( function ( err ) {

                    return callback({ code: 0, message: err });

                })

            });

        });

        async.parallel( asyncTasks, function( err, result ) {

            if ( err ) {

                return callback( err );

            }

            asyncTasks.length = 0;

            return callback( null, result );

        });

    };

    function createEvents( timeResult, callback ) {
        
        var iid = 0;

        data.forEach( function ( item ) {

            var titles = [];

            asyncTasks.push( function ( callback ) {
                
                for ( var key in item ) {

                    if ( key !== 'Timestamp' ) {
                        
                        titles.push( key );
                    
                    }

                }

                var tmp = [];

                timeResult.forEach( function ( item ) {
                    
                    for ( var i = 0; i < titles.length; i ++ ) {

                        if ( item.title === titles[ i ] ) {

                            tmp.push( item._id );

                        }

                    }

                });

                async.waterfall([
                    pushDataEvent,
                    createDocuments
                ], function ( err, result ) {

                    if ( err ) {

                        return callback({ code: 0, message: err });

                    }
                    
                    return callback( null, { success: true } );

                });

                function pushDataEvent ( callback ) {

                    var _iid = iid + 1;
                    iid ++;

                    EventsModel
                    .create({
                        date:     item[ date ],
                        timeline: tmp
                    })
                    .then( function ( event ) {

                        return callback( null, event, _iid );

                    })
                    .catch( function ( err ) {

                        return callback ( err );

                    });

                };

                function createDocuments ( event, _iid, callback ) {

                    titles.forEach( function ( title ) {

                        var tid = ( title === 'LOLCAT' ) ? 2 : 1;

                        DocumentsModel
                        .create({
                            eid:    event._id,
                            iid:    tid + '.' + _iid,
                            text:   item[ title ]
                        })
                        .then( function ( event ) {
                        
                            return callback( null,  event );

                        })
                        .catch( function ( err ) {

                            return callback ( err );
                            
                        });

                    });

                };

            });

        });

        async.parallel( asyncTasks, function( err, result ) {

            if ( err ) {

                return callback( err );

            }

            asyncTasks.length = 0;

            return callback( null, result );

        });

    };

};

Timeline.getEvents = function ( callback ) {

    async.waterfall([
        getTimelineData,
        getEventsData
    ], function ( err, result ) {

        if ( err ) {

            return callback({ code: 0, message: err });

        }
        
        return callback( null, result );

    });

    function getTimelineData ( callback ) {
        
        TimelineModel
        .find()
        .then( function ( event ) {

            return callback( null,  event );

        })
        .catch( function ( err ) {

            return callback ( err );

        })

    };

    function getEventsData ( data, callback ) {

        EventsModel
        .find()
        .then( function ( events ) {
            
            var eventsData = [];

            for ( var i = 0; i < events.length; i ++ ) {

                    
                eventsData.push({
                    id:     events[ i ]._id,
                    date:   events[ i ].date,
                    docIds: events[ i ].timeline
                });

            }

            return callback( null, { events: eventsData, soursesData: data } )

        })
        .catch( function ( err ) {

            return callback ( err );

        })

    };

};

Timeline.getDocuments = function ( id, callback ) {
    
    DocumentsModel
    .find({
        eid: id
    })
    .then( function ( documents ) {

        var documentData = [ false, false ];

        for ( var i = 0; i < documents.length; i ++ ) {

            var tid = ( + documents[ i ].iid.split('.')[0] ) - 1;

            documentData[ tid ] = documents[ i ];

        }
console.log(1);
        return callback( null, documentData )

    })
    .catch( function ( err ) {

        return callback ( err );

    });

};

//

module.exports = Timeline;
