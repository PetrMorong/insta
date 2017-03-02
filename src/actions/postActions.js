/**
 * Created by Petr on 13.2.2017.
 */
import request from 'superagent'

export function fetchPosts(){

    return function(dispatch) {
        dispatch({type: 'FETCH_POST'})
        request
            .get('http://10.0.0.12:3002/get-posts')
            .end(function(err, res){
                if(err){
                    dispatch({type: 'FETCH_POST_REJECTED', payload: JSON.parse(res)})
                }
                dispatch({type: 'FETCH_POST_FULFILLED', payload: JSON.parse(res.text)})
            });
    }
}

export function like(id, name){
    return function(dispatch) {
        dispatch({type: 'LIKED', _id: id, name: name})
        request.post('http://10.0.0.12:3002/like')
            .send({name: name, id: id})
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }
            });
    }
}

export function dislike(id, name){
    return function(dispatch) {
        dispatch({type: 'DISLIKED', _id: id, name: name})
        request.post('http://10.0.0.12:3002/dislike')
            .send({name: name, id: id})
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }
            });
    }
}

export function deletePost(id, name){
    return function(dispatch) {
        request.post('http://10.0.0.12:3002/delete')
            .send({id: id})
            .end(function(err, res){
                if(err){
                    console.log(err);
                    return false;
                }
                dispatch(fetchProfile(name));

            });
    }
}

export function addPost(data){
    return function (dispatch) {
        dispatch({type: 'UPLOAD_POST'});
        request.post('http://10.0.0.12:3002/add-post')
            .send({data: data})
            .end(function(err, res){
                if(err){
                    dispatch({type: 'UPLOAD_POST_REJECTED'});
                }
                dispatch({type: 'UPLOAD_POST_FULFILLED'});
            })
    }
}

export function fetchProfile(name) {
    return function (dispatch) {
        dispatch({type: 'FETCH_PROFILE'})
        request.get('http://10.0.0.12:3002/fetch-profile/' + name)
            .end(function(err, res){
                if(err){
                    dispatch({type: 'FETCH_PROFILE_REJECTED', payload: JSON.parse(res)});
                }
                dispatch({type: 'FETCH_PROFILE_FULFILLED', payload: JSON.parse(res.text)});
            })
    }
}
