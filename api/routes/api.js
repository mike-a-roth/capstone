module.exports = function (app) {
    var express = require('express');
    var router = express.Router();
    var models = require('../models');

    router.get('/', app.oauth.authorise(), function(req, res) {

        console.log('API endpoint hit.');

        var authToken = req.headers.authorization.substring(7);
        var allowedBanks = [];
        console.log(authToken);
        models.oauth_access_token.find({
            where: {access_token: authToken}
        }).success(function(tokenObject) {
                tokenObject.getBanks().success(function(banks) {
                    banks.forEach(function(bank) {
                        allowedBanks.push(bank.name);
                    });
                    console.log(allowedBanks);
//                    res.send(JSON.stringify(allowedBanks));
                    if(allowedBanks.length != 0) {
                        if((typeof(req.query.startDate) !== 'undefined') && (typeof(req.query.endDate) !== 'undefined')) {
                            models.doc_score.findAll({
                                where: {
                                    bank: [allowedBanks],
                                    isParsed: true,
                                    date_published: {
                                        gte: req.query.startDate,
                                        lte: req.query.endDate
                                    }
                                },
                                attributes: ['filename','bank','url','score','lower','upper']
                            }).success(function(doc_scores) {
                                    if(doc_scores.length == 0) {
                                        res.send('There are no document scores in the database with published date between ' + req.query.startDate + ' and ' + req.query.endDate);
                                    } else {
                                        console.log('Document found!');
                                        //console.log(doc_scores);
                                        res.send(JSON.stringify(doc_scores));
                                    }
                                }).failure(function(err) {
                                    console.log(err);
                                });
                        } else {
                            models.doc_score.findAll({
                                where: {
                                    bank: [allowedBanks],
                                    isParsed: true
                                },
                                attributes: ['filename','bank','url','score','lower','upper']
                            }).success(function(doc_scores) {
                                    if(doc_scores.length == 0) {
                                        res.send('There are no document scores in the database');
                                    } else {
                                        console.log('Document found!');
                                        //console.log(doc_scores);
                                        res.send(JSON.stringify(doc_scores));
                                    }
                                }).failure(function(err) {
                                    console.log(err);
                                });
                        }
                    }else {
                        console.log('none');
                        res.send('no bank access');
                    }
                });
            });

    });

    router.get('/:bank', app.oauth.authorise(), function(req, res) {

        console.log('API endpoint hit.');

        var requestedBanks = req.params.bank.split(",");
        var authToken = req.headers.authorization.substring(7);
        var allowedBanks = [];
        var banksToQuery = [];
        console.log(authToken);
        models.oauth_access_token.find({
            where: {access_token: authToken}
        }).success(function(tokenObject) {
                tokenObject.getBanks().success(function(banks) {
                    banks.forEach(function(bank) {
                        allowedBanks.push(bank.name);
                    });
                    console.log(allowedBanks);
                    requestedBanks.forEach(function(bank) {
                        if(allowedBanks.indexOf(bank) != -1) {
                            banksToQuery.push(bank);
                        }
                    })
                    if(banksToQuery.length != 0) {
                        if((typeof(req.query.startDate) !== 'undefined') && (typeof(req.query.endDate) !== 'undefined')) {
                            models.doc_score.findAll({
                                where: {
                                    bank: [banksToQuery],
                                    isParsed: true,
                                    date_published: {
                                        gte: req.query.startDate,
                                        lte: req.query.endDate
                                    }
                                },
                                attributes: ['filename','bank','url','score','lower','upper']
                            }).success(function(doc_scores) {
                                    if(doc_scores.length == 0) {
                                        res.send('There are no document scores in the database with bank name ' + req.params.bank
                                            + ' and published date between ' + req.query.startDate + ' and ' + req.query.endDate);
                                    } else {
                                        console.log('Document found!');
                                        //console.log(doc_scores);
                                        res.send(JSON.stringify(doc_scores));
                                    }
                                }).failure(function(err) {
                                    console.log(err);
                                });
                        } else {
                            models.doc_score.findAll({
                                where: {
                                    bank: [banksToQuery],
                                    isParsed: true
                                },
                                attributes: ['filename','bank','url','score','lower','upper']
                            }).success(function(doc_scores) {
                                    if(doc_scores.length == 0) {
                                        res.send('There are no document scores in the database with bank name ' + req.params.bank);
                                    } else {
                                        console.log('Document found!');
                                        //console.log(doc_scores);
                                        res.send(JSON.stringify(doc_scores));
                                    }
                                }).failure(function(err) {
                                    console.log(err);
                                });
                        }
                    }else {
                        console.log('none');
                        res.send('no bank access');
                    }
                });
            });


    });

    return router;
};