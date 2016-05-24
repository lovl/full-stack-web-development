var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();


leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.get(function(req,res,next){
    res.end('Will send all the leaders to you!');
})

.post(function(req, res, next){
    res.end('Will add the leader: ' + req.body.name + ' with details: ' +         req.body.description);    
})

.delete(function(req, res, next){
    res.end('Deleting all leaders');
});


leaderRouter.route('/:leaderId')
.get(function(req,res,next){
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
})

.put(function(req, res, next){
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
    res.end('Deleting leader: ' + req.params.leaderId);
});


module.exports = leaderRouter;