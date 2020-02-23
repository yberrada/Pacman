var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Database = require('../lib/database');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date());
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next(); docker / rfontain / pacman
})

router.get('/colors',urlencodedParser,function(req,res,next) {
       
    var color = 'rgb(0, 0, 0)';
    // Red Hat
    // var color = 'rgb(197, 33, 33)';
    if (process.env.COLOR) {
        color = process.env.COLOR;
    }
    // IBM
    // var color = 'rgb(59, 108, 170)';
    console.log("called color : " + color);
    //res.status(200);
    res.json(color);
        
});

module.exports = router;
