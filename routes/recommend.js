/*
Use this file if you are storing data into Apache Solr.
*/

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET keyword listing. */
router.get('/crawl', function(req, res) {
  console.log('Incoming Get Request');
  var url = 'http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/';
  request(url, function(error, response, html){
    if(!error) {
      var $ = cheerio.load(html);
      var keyword, text, links, timestamp;
      var json = {keyword : "", text : "", links : "", timestamp: new Date()};
      $('p').each(function(i, elem) {
        var data = $(this);
        json.keyword = 'hadoop';
        json.text = data.text();
        json.links = url;
        var options = {
          url:'http://192.168.122.111:8983/solr/recommend/update/json/docs?split=/&f=/**',
          method: 'POST',
          json: json
        }
        request(options, function(error, response, body){
          if(error) console.log(error);
          else console.log(body);
        });
      });
    }
    res.send('API Request Processed');
  });
});

router.get('/commit', function(req, res) {
  var options = {
    url:'http://192.168.122.111:8983/solr/recommend/update/json/docs?commit=true',
    method: 'POST'
  }
  request(options, function(error, response, body){
    if(error) console.log(error);
    else console.log(body);
  });
  res.send('Content Indexed');
});

module.exports = router;
