var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
    
    // console.log('API endpoint hit.');
    
    models.Test.findAll().success(function(tests) {
        res.send(JSON.stringify(tests));    
    }).failure(function(error) {
        res.send(error);
        console.log('error');
    });

});

module.exports = router;