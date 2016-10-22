/*
Use this file if you are storing data into MongoDB.
This file is not required if using Apache Solr
*/

var mongoose =  require('mongoose');

var openstackSchema = new mongoose.Schema({
    keyword: String,
    text: String,
    links: String,
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('keyword', openstackSchema);
