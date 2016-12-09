const express = require('express');
const router = express.Router();

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
    Express.static will server everything in the client as a static resource. 
    index.html is set as the root GET of that directory get('/');
*/
router.get('/', function(req, res){
    res.sendFile('/' + __dirname + 'index.html', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

/** 
    Gets all players from local array storage.
*/  
router.get("/players", function(req, res){
    res.json(players);
});

router.get('/players/:id', function(req, res){
    var player = _.find(players, {id: req.params.id});
    res.json(player);
});

/** 
    Adds a player to the local array storage.
*/
router.post('/players', updateId, function(req, res){
    var player = req.body;
    players.push(player);
    res.json(player);
});

/** 
    Updates a player from local array storage by id.
*/
router.put('/players/:id', function(req, res){
    var update = req.body;
    
    if(update.id){
        delete update.id;
    }

    var player = _.findIndex(players, {id: req.params.id});

    if(!players[player]){
        res.send('DOESNT EXIST!');
    }else{
        var updatedPlayer = _.assign(players[player], update);
        res.json(updatedPlayer);
    }
});

/** 
    Deletes a player from the local array storage by id.
*/
router.delete('/players/:id', function(req, res){
    var player = _.findIndex(players, {id: req.params.id});

    if(!players[player]){
        res.send('DOESNT EXIST!');
    }else{
        var deletedPlayer = players[player]
        players.splice(player, 1);
        res.json(deleedPlayer);
    }    
});

module.exports = router;