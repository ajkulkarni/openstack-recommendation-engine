/*
Use this file if you are storing data into MongoDB.
This file is not required if using Apache Solr
*/

var express = require('express');
var router = express.Router();
var mongoose =  require('mongoose');
var schema = require('../models/schema.js');
/* GET keyword listing. */
router.get('/', function(req, res, next) {
  schema.find(function(error,data) {
    if(error) return next(error);
    res.json(data);
  });
});

router.get('/:keyword', function(req, res, next) {
  schema.find({keyword:req.params.keyword},function(error,data) {
    if(error) return next(error);
    res.json(data);
  });
});

router.post('/', function(req, res, next) {
  schema.create(req.body, function(error,data) {
    if(error) return next(error);
    console.log(req.body);
    res.json(data);
  });
});

module.exports = router;
