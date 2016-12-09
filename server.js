const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

var app = express();
var players = [];

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/** 
    Middleware to grab id and attach it to the body of each request.
    Put before the routers otherwise it would get called after the
    HTTP request has hit the routing function.
*/  
app.param('id', function(req, res, next, id){
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
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

/** 
    Gets all players from local array storage.
*/  
app.get("/players", function(req, res){
    res.json(players);
});

app.get('/players/:id', function(req, res){
    var player = _.find(players, {id: req.params.id});
    res.json(player);
});

/** 
    Adds a player to the local array storage.
*/
app.post('/add', function(req, res){
    var player = req.body;
    player.id = id + '';        /* Coherse id to a string so that lodash can find it. */
    players.push(player);
    res.redirect('/');
});

/** 
    Updates a player from local array storage by id.
*/
app.put('/players/:id', function(req, res){
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
app.delete('/players/:id', function(req, res){
    var player = _.findIndex(players, {id: req.params.id});

    if(!players[player]){
        res.send('DOESNT EXIST!');
    }else{
        var deletedPlayer = players[player]
        players.splice(player, 1);
        res.json(deleedPlayer);
    }    
});

/** 
    Basic custom error handling middleware.
    @param err - 4 params needed to catch err as first param
    otherwise with 3 we'll only get req, res, next.
*/
app.use(function(err, req, res, next){
    if(err){
        res.status(500).send(err);
    }
});

app.listen(3000);