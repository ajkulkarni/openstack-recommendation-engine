var mongoose =  require('mongoose');

var openstackSchema = new mongoose.Schema({
    keyword: String,
    text: String,
    links: String,
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('keyword', openstackSchema);
