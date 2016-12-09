const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const _ = require('lodash');

var app = express();


/*
    Express.static will server everything in the client as a static resource. 
    index.html is set as the root GET of that directory get('/');
*/
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var players = [];
var id = 0;

app.get('/', function(req, res){

    res.sendFile(__dirname + '/index.html', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

app.get("/players", function(req, res){
    res.json(players);
});

app.get('/players/:id', function(req, res){
    var player = _.find(players, {id: req.params.id});
    res.json(player);
});

app.post('/add', function(req, res){
    var player = req.body;
    player.id = id + '';        //coherse to string for lodash to find it.
    players.push(player);
    res.redirect('/');
});

app.listen(3000);