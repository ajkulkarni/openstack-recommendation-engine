  /*
  This is a crawler to get Hadoop related data from a single page and persist to MongoDB/Apache Solr.
  You can make this crawler iterative by extracting all the href in the page and creating a list.
  You can then crawl each link in the list and restrict further branching using a depth variable.
  */

  var express = require('express');
  var request = require('request');
  var cheerio = require('cheerio');
  var app = express();

  app.get('/crawl', function(req, res) {
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
            //To persist data into MongoDB. Uncomment if using MongoDB
            //url: 'http://0.0.0.0:4000/recommend',
            //To persist data into Apache Solr. Comment if using MongoDB
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
      res.send('API Request Processed')
    });
  });

  app.get('/commit', function(req, res) {
    var options = {
      url:'http://192.168.122.111:8983/solr/recommend/update/json/docs?commit=true',
      method: 'POST',
      json: json
    }
    request(options, function(error, response, body){
      if(error) console.log(error);
      else console.log(body);
    });
  });

  app.listen('8081');
  console.log('Server listening on port 8081');
  exports = module.exports = app;
