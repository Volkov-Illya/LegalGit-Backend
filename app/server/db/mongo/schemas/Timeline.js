/*
 * @author ohmed
 * Events entity schema
*/

var autoIncrement = require('mongoose-auto-increment');
var Schema = MongoDB.mongoose.Schema;

//

var TimelineSchema = new Schema({
	
	// _id: 			   Number,
    title:             { type: String, default: '' },
    img:               { type: String, default: '' }

});

//

module.exports = TimelineSchema;
    