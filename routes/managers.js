const router = require('express').Router();

var managers = [];
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
*/  
router.param('id', function(req, res, next, id){
    var manager = _.find(managers, {id: id});

    if(manager){
        req.manager = manager;
        next();
    }else{
        res.send();
    }
});

/** 
    Gets all managers from local array storage.
*/  
router.get("/", function(req, res){
    res.json(managers);
});

router.get('/:id', function(req, res){
    var manager = _.find(managers, {id: req.params.id});
    res.json(manager);
});

/** 
    Adds a manager to the local array storage.
*/
router.post('/', updateId, function(req, res){
    var manager = req.body;
    managers.push(manager);
    res.json(manager);
});

/** 
    Updates a manager from local array storage by id.
*/
router.put('/:id', function(req, res){
    var update = req.body;
    
    if(update.id){
        delete update.id;
    }

    var manager = _.findIndex(managers, {id: req.params.id});

    if(!managers[manager]){
        res.send('DOESNT EXIST!');
    }else{
        var updatedmanager = _.assign(managers[manager], update);
        res.json(updatedmanager);
    }
});

/** 
    Deletes a manager from the local array storage by id.
*/
router.delete('/:id', function(req, res){
    var manager = _.findIndex(managers, {id: req.params.id});

    if(!managers[manager]){
        res.send('DOESNT EXIST!');
    }else{
        var deletedmanager = managers[manager]
        managers.splice(manager, 1);
        res.json(deleedmanager);
    }    
});

module.exports = router;