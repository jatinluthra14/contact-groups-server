var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
     name: { type: String, required: true },
     number: { type: Number, required: true },
     group: { type: Number, required: true },
     modified: { type: Date }
 });

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
