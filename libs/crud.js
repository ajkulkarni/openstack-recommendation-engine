/*
Use this file if you are storing data into MongoDB.
This file is not required if using Apache Solr
This is just a test crud file for mongodb.
You can test your connection to mongodb using this file
*/

var mongoose =  require('mongoose');

mongoose.connect('mongodb://192.168.122.134/openstack');

var openstackSchema = new mongoose.Schema({
    keyword: String,
    text: String,
    links: String,
    timestamp: {type: Date, default: Date.now}
});
var OpenStack = mongoose.model('keyword', openstackSchema);

var callback = function(error, data) {
  if(error) console.log('Error returned: ', error);
  else console.log("Retrieved data: ", data);
}

OpenStack.create({keyword:'java', text:'some random text', links:'http://www.google.com'}, callback);

OpenStack.find({keyword:/hadoop/},callback);

OpenStack.findOneAndUpdate({keyword:/hadoop/},{text:'New text inserted'}, callback);

OpenStack.remove({keyword:/hadoop/}, callback);
