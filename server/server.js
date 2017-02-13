/**
 * Created by Petr on 13.2.2017.
 */
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');

//connect to mongo
var mongooseKey = require('./constants.js');
mongoose.connect(mongooseKey.MONGO_URL);


//controllers
var instaController = require('./controllers/insta-controller.js');

//dependencies
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/get-posts', instaController.getPosts);
app.post('/like/:id', instaController.like);


app.listen(3002, function(){
    console.log('we have a server sir!');
});