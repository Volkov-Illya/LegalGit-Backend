/*
 * @author ohmed
 * Events entity schema
*/

var autoIncrement = require('mongoose-auto-increment');
var Schema = MongoDB.mongoose.Schema;

//

var EventsSchema = new Schema({

    date:               { type: Date },
	timeline: 			[ String ]

});


//

module.exports = EventsSchema;
    