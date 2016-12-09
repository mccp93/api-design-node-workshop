const express = require('express');
const fs = require('fs');

var app = express();

var jsonData = {count: 12, message: 'hey'};

app.get('/', function(req, res){
    /*
        Takes a path to the file and sets the MIME typing based on the extensions (.html)
    */
    res.sendFile(__dirname + 'index.html', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

app.get('/data', function(req, res){
    res.send(jsonData);
});

app.listen(3000);