// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require('express');
const fs = require('fs');

var app = express();
var jsonData = {count: 12, message: 'hey'};

app.get('/', function(req, res){
    res.send("index page.");
});

app.get('/data', function(req, res){
    res.send(jsonData);
});

app.listen(3000);