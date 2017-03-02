/**
 * Created by Petr on 13.2.2017.
 */

let post = require('../datasets/posts.js');

module.exports.getPosts = function(req, res){

    post.find({}).sort({_id: -1}).exec(function(err, posts){
        if(err){
            res.statusCode(500);
            res.send();
            return;
        }
        res.json(posts);
    })
};

module.exports.like = function(req, res){

    post.findById(req.body.id, function (err, foundPost) {

        foundPost.likedBy.push(req.body.name);
        foundPost.likeCount++;

        foundPost.save(function (err, updatedPost) {
            if(err){
                res.statusCode(500);
                res.send();
                return;
            }
            res.json(updatedPost);
        });
    });
};

module.exports.dislike = function(req, res){

    post.findById(req.body.id, function (err, foundPost) {

        foundPost.likedBy.push(req.body.name);
        let newLikedBy = foundPost.likedBy.map((like)=>{
            if(like !== req.body.name){
                return like
            }
        });

        foundPost.likeCount--;
        foundPost.likedBy = newLikedBy;

        foundPost.save(function (err, updatedPost) {
            if(err){
                res.statusCode(500);
                res.send();
            }
            res.json(updatedPost);
        });
    });
};

module.exports.delete = function(req, res){

  post.remove({_id: req.body.id}, function(err){
      if(err){
          res.statusCode(500);
          res.send();
      }
      res.json(true);
  })

};

module.exports.addPost = function(req, res){

    let newPost = new post(req.body.data);

    newPost.save(function (err, savedPost) {
        if(err){
            res.statusCode(500);
            res.send();
        }
        res.json(true);
    });
};

module.exports.renderImage = function(req,res){

    post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.statusCode(500);
            res.send();
        }
        res.json(foundPost.image);
    })

};

module.exports.fetchProfile = function(req, res){

    post.find({ownerName: req.params.name}).sort({_id: -1}).exec(function(err, posts){
        if(err){
            res.statusCode(500);
            res.send();
            return;
        }
        res.json(posts);
    })
};