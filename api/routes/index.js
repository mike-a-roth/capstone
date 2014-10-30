var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.sendFile("../../website/capstone.html");
});

module.exports = router;