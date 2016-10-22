var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/crawl', function(req, res) {
  console.log('Incoming Request');
  var url = 'http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/';
  request(url, function(error, response, html){
    if(!error) {
      var $ = cheerio.load(html);
      var keyword, text, links, timestamp;
      var json = {keyword : "", text : "", links : "", timestamp: new Date()};
      $('p').each(function(i, elem) {
        var data = $(this);
        json.keyword = 'hadoop' + i;
        json.text = data.text();
        json.links = url;
        var options = {
          url: 'http://0.0.0.0:4000/recommend',
          method: 'POST',
          json: json
        }
        request(options, function(error, response, body){
          if(error) console.log(error);
          else console.log(body);
        });
      });
    }
    res.send('Check console output')
  });
});

app.listen('8081');
console.log('Server listening on port 8081');
exports = module.exports = app;
