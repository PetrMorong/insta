/**
 * Created by Petr on 13.2.2017.
 */
import request from 'superagent'

export function fetchPosts(){
    return function(dispatch) {
        request
            .get('http://10.0.0.34:3002/get-posts')
            .end(function(err, res){
                dispatch({type: 'FETCH_POST_FULFILLED', payload: JSON.parse(res.text)})
            });
    }
}

export function like(id, name){
    return function(dispatch) {
        request.post('http://10.0.0.34:3002/like')
            .send({name: name, id: id})
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }

                dispatch(fetchPosts());
            });
    }
}

export function dislike(id, name){
    return function(dispatch) {
        request.post('http://10.0.0.34:3002/dislike')
            .send({name: name, id: id})
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }
                dispatch(fetchPosts());
            });
    }
}

export function deletePost(id){
    return function(dispatch) {
        request.post('http://10.0.0.34:3002/delete')
            .send({id: id})
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }
                dispatch(fetchPosts());

            });
    }
}

export function addPost(data){
    return function (dispatch) {
        request.post('http://10.0.0.34:3002/add-post')
            .send({data: data})
            .end(function(err, res){
                if(err){
                    console.log(err)
                    return false;
                }
                return true;
            })
    }
}