/*
 * @author ohmed
 * Events entity schema
*/

var autoIncrement = require('mongoose-auto-increment');
var Schema = MongoDB.mongoose.Schema;

//

var DocumentsSchema = new Schema({

    eid: 				{ type: String, ref: 'Events' },
    iid: 				{ type: String },
    title:              { type: String, default: '' },
    text:               { type: String, default: '' }

});


//

module.exports = DocumentsSchema;