const router = require('express').Router();

var clubs = [];
var id = 0;

var updateId = function(req, res, next){
    if(!req.body.id){
        id++;
        req.body.id = id + '';
    }
    next();
}

router.get('/', function(req, res){
    res.json(clubs);
});

module.exports = router;