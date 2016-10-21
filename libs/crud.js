var mongoose =  require('mongoose');

mongoose.connect('mongodb://192.168.122.134/openstack');

var openstackSchema = new mongoose.Schema({
    keyword: String,
    text: String,
    links: String,
    timestamp: {type: Date, default: Date.now}
});
var OpenStack = mongoose.model('OpenStack', openstackSchema);

var callback = function(error, data) {
  if(error) console.log('Error returned: ', error);
  else console.log("Retrieved data: ", data);
}

OpenStack.create({keyword:'hadoop', text:'some random text', links:'http://www.google.com'}, callback);

OpenStack.find({keyword:/hadoop/},callback);

OpenStack.findOneAndUpdate({keyword:/hadoop/},{text:'New text inserted'}, callback);

OpenStack.remove({keyword:/hadoop/}, callback);
