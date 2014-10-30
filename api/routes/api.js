var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
    
    // console.log('API endpoint hit.');
    
    models.EMP.findAll().success(function(emps) {
        emps.forEach(function(emp) {
            console.log(JSON.stringify(emp));
        });
        res.send(JSON.stringify(emps));    
    }).failure(function(error) {
        res.send(error);
        console.log('error');
    });

});

module.exports = router;