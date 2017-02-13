/**
 * Created by Petr on 13.2.2017.
 */

var post = require('../datasets/posts.js');

module.exports.getPosts = function(req, res){
    post.find({}).exec(function(err, posts){
        if(err){
            res.statusCode(500);
            res.send();
            return;
        }
        res.json(posts);
    })
};

module.exports.like = function(req, res){

    post.findById(req.params.id, function (err, post) {

        post.likedBy.push(req.body.name);
        post.save(function (err, updatedPost) {
            if(err){
                res.statusCode(500);
                res.send();
                return;
            }
            res.json(updatedPost);
        });
    });

};