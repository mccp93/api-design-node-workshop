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

/**
    Middleware to grab id and attach it to the body of each request.
    Put before the routers otherwise it would get called after the
    HTTP request has hit the routing function.
    @param {string} id - id of the specified object.
*/  
router.param('id', function(req, res, next, id){
    var club = _.find(clubs, {id: id});

    if(club){
        req.club = club;
        next();
    }else{
        res.send();
    }
});

router.route('/')
    .get(function(req, res){
        res.json(clubs);
    })
    .post(function(req, res){
        var club = req.body;
        clubs.push(club);
        res.json(clubs)
    })

router.route('/:id')
    .get(function(req, res){
        var club = req.club;
        res.json(club || {});
    })
    .put(function(req, res){
        var update = req.body;
        if(update.id){
            delete update.id;
        }

        var club = _.findIndex(clubs, {id: req.params.id});
        if(!clubs[club]){
            res.send(); // Send nothing.
        }else{
            var updatedClub = _.assign(clubs[club], updatedClub);
            res.json(updatedClub);
        }
    })
    .delete(function(req, res){
        var club = _.findIndex(clubs, {id: req.params.id});
        clubs.splice(club, 1);
        res.json(req.club);
    });


module.exports = router;