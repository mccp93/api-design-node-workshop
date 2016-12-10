const router = require('express').Router();

var managers = [];
var id = 0;

var updateId = function (req, res, next) {
    if (!req.body.id) {
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
router.param('id', function (req, res, next, id) {
    var manager = _.find(managers, { id: id });

    if (manager) {
        req.manager = manager;
        next();
    } else {
        res.send();
    }
});


/**
 * Routing for any Create or Read operations.
 */
router.route('/')
    .get(function(req, res){
        res.json(managers);
    })
    .post(function(req, res){
        var manager = req.body;
        managers.push(manager);
        res.json(managers)
    });

/**
 * Routing for any Read, Update, Delete operations on specific clubs.
 * @param {string} :id - The id of the specified club object.
 */
router.route('/:id')
    .get(function(req, res){
        var manager = req.manager;
        res.json(manager || {});
    })
    .put(function(req, res){
        var update = req.body;
        if(update.id){
            delete update.id;
        }

        var manager = _.findIndex(managers, {id: req.params.id});
        if(!managers[manager]){
            res.send(); // Send nothing.
        }else{
            var updatedmanager = _.assign(managers[manager], updatedmanager);
            res.json(updatedmanager);
        }
    })
    .delete(function(req, res){
        var manager = _.findIndex(managers, {id: req.params.id});
        managers.splice(manager, 1);
        res.json(req.manager);
    });

module.exports = router;