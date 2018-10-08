var mongoose = require('mongoose');

var FeelSchema = new mongoose.Schema({
    feeldate: String,
    feelfeel: Number,
    feeltext: String
})

feelModel = mongoose.model('Feel', FeelSchema);
module.exports = feelModel;