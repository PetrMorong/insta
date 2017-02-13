/**
 * Created by Petr on 13.2.2017.
 */

var mongoose = require('mongoose');
module.exports = mongoose.model('post', {
    title: String,
    image: String,
    likeCount: 0
})