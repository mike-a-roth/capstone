var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
    
    // console.log('API endpoint hit.');
    if((typeof(req.query.date) !== 'undefined')) {
        // console.log(req.query.date);
        var startDateTimeStamp = parseInt(req.query.date);
        var endDateTimeStamp = parseInt(req.query.date) + 86400000;
        var startDate = new Date(startDateTimeStamp).toISOString();
        var endDate = new Date(endDateTimeStamp).toISOString();
        var data = [];
        
        models.EMP.findAll({
            where: {
                timestamp: {
                    gte: startDate,
                    lt: endDate
                }
                
            },
            order: 'timestamp ASC'
        }).success(function(emps) {
            var data = new Array(1440);
            var index = 0;
            for(var i=0;i<1440;i++) {
                data[i] = 0;
            }
            for(var i=startDateTimeStamp;i<endDateTimeStamp;i+=60000) {
                // console.log(i);
                emps.forEach(function(emp) {
                    var timestamp = Date.parse(emp.timestamp);
                    if(timestamp >= i && timestamp < (i+60000)) {
                        data[index]++;    
                    }
                });
                index++
            }
            
            res.send(JSON.stringify(data));    
        }).failure(function(error) {
            res.send(error);
            console.log('error');
        });        
    }


});

module.exports = router;