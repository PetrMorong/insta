/**
 * Created by Petr on 13.2.2017.
 */
let express = require('express');
let app = express();
let bodyParser  = require('body-parser');
let mongoose = require('mongoose');

//connect to mongo
let mongooseKey = require('./constants.js');
mongoose.Promise = global.Promise;
mongoose.connect(mongooseKey.MONGO_URL, {
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            connectionTimeout: 0
        }
    }
});


//controllers
let instaController = require('./controllers/insta-controller.js');

//dependencies
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/get-posts', instaController.getPosts);
app.post('/like', instaController.like);
app.post('/dislike', instaController.dislike);
app.post('/delete', instaController.delete);
app.post('/add-post', instaController.addPost)


app.listen(3002, function(){
    console.log('we have a server sir!');
});