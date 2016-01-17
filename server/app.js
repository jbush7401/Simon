/**
 * Created by jbush_000 on 11/18/2015.
 */"use strict";

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
var crypto = require('crypto-js');
var async = require('async');

var jwt = require('jsonwebtoken');
var config = require('./config');
var http = require('http');

app.use(cors());

// application routing
var router = express.Router();

var GameModel = require('./models/Game');
var UserModel = require('./models/User');

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use(morgan('dev'));

//Routes
router.post('/authenticate', function(req, res) {
    // find the user
    new UserModel.User({Username: req.body.username}).fetch().then(
        function(user) {
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                bcrypt.compare(req.body.password, user.get('PasswordHash'), function(err, res2) {
                    // res == true
                    // check if password matches
                    if (res2 == true) {
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, config.secret, {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    } else {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
});

router.get('/setup', function(req, res) {
    bcrypt.hash('password', 8, function(err, hash){
        if(err)
        {
            console.log(err);
        }
        var user = new UserModel.User({
            Username: 'Testing',
            PasswordHash: hash,
            Email: 'jbush6@gmail.com',
            JoinDate: new Date()
        });

        user.save().then(function(model) {
                res.json({success: true, model:model});
                console.log('User saved successfully');
            }
        ).catch(function(e) {
            console.log(e);
        });
    });
});

router.get('/incrementscore/:id', function (req, res) {
    var decryptId = crypto.AES.decrypt(req.params.id, config.secret).toString(crypto.enc.Utf8);
    GameModel.Game.forge({id: decryptId.toString()}).fetch()
        .then(function(game){
        var scoreToIncrement = parseInt(game.get('Score')) + 1;
        game.save({Score: scoreToIncrement}).then(function(){
            console.log(scoreToIncrement.toString());
            res.json({success: true, data: {score: scoreToIncrement.toString()}})
        }).catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
        });
    })
});

router.get('/', function (req, res) {
    res.json({message: 'Hooray! Welcome to our api'});
});

router.get('/newgame', function (req, res) {
    GameModel.Game.forge({Score:0}).save().then(function(model){
        var encryptId = crypto.AES.encrypt(model.id.toString(), config.secret);
        var ReturnModel = {id: encryptId.toString(), Score: "0"};
        res.json({success: true, model:ReturnModel})
        }).catch(function(e){
        console.log(e);
    })
});

router.get('/score', function (req, res) {
    res.json({message: 'Hooray! Welcome to our api'});
});

router.get('/users', function(req, res) {
    var users = new UserModel.Users();
        users.fetch().then(function(users) {
        res.json(users);
    });
});

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port ' + server.address().port);
});






