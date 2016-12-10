const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const mainRouter = require('./routes/main');
const clubsRouter = require('./routes/clubs');
const managersRouter = require('./routes/managers');
const playersRouter = require('./routes/players');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Mounting the routers.
app.use('/', mainRouter);
app.use('/clubs', clubsRouter);
app.use('/managers', managersRouter);
app.use('/players', playersRouter);

/** 
    Basic custom error handling middleware.
    @param {obj} err - 4 params needed to catch err as first param
    otherwise with 3 we'll only get req, res, next.
*/
app.use(function(err, req, res, next){
    if(err){
        console.log("ERROR: " + err.message);
        res.status(500).send(err);
    }
});

app.listen(3000);

module.exports = app;