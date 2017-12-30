var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
     name: { type: String, required: true },
     number: { type: Number, required: true },
     modified: { type: Date }
 });

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
