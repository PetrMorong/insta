/**
 * Created by Petr on 13.2.2017.
 */
let express = require('express');
let app = express();
let bodyParser  = require('body-parser');
let mongoose = require('mongoose');
var path = require('path');


//connect to mongo
let mongooseKey = require('./constants.js');
mongoose.Promise = global.Promise;
mongoose.connect(mongooseKey.MONGO_URL, {
    server: {
        socketOptions: {
            socketTimeoutMS: 90000,
            connectionTimeout: 90000
        }
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
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
app.post('/add-post', instaController.addPost);
app.get('/render-image/:id', instaController.renderImage);
app.get('/fetch-profile/:name', instaController.fetchProfile)


let port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('we have a server sir! on port ' + port);
});