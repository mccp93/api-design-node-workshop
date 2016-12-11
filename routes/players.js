const router = require('express').Router();
const _ = require('lodash');

var players = [];
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
    var player = _.find(players, {id: id});

    if(player){
        req.player = player;
        next();
    }else{
        res.send();
    }
});

/**
 * Routing for any Create or Read operations.
 */
router.route('/')
    .get(function(req, res){
        res.json(players);
    })
    .post(updateId, function(req, res){
        var player = req.body;
        players.push(player);
        res.json(player);
    })

/**
 * Routing for any Read, Update, Delete operations on specific clubs.
 * @param {string} :id - The id of the specified club object.
 */

router.route('/:id')
    .get(function(req, res){
        var player = req.player;
        res.json(player || {});
    })
    .put(function(req, res){
        var update = req.body;
        if(update.id){
            delete update.id;
        }

        var player = _.findIndex(players, {id: req.params.id});

        if(!players[player]){
            res.send(); // Send nothing.
        }else{
            var updatedplayer = _.assign(players[player], update);
            res.json(updatedplayer);
        }
    })
    .delete(function(req, res){
        var player = _.findIndex(players, {id: req.params.id});
        players.splice(player, 1);
        res.json(req.player);
    });

module.exports = router;