/**
 * Created by Petr on 13.2.2017.
 */
import request from 'superagent'

export function fetchPosts(){
    return function(dispatch) {
        request
            .get('http://10.0.0.12:3002/get-posts')
            .end(function(err, res){
                dispatch({type: 'FETCH_POST_FULFILLED', payload: JSON.parse(res.text)})
            });
    }
}

export function like(id, name){
    return function(dispatch) {
        request.post('http://10.0.0.12:3002/like/' + id)
            .send({name: name})
            .set('Content-Type', 'application/json')
            .end(function(err, res){
                console.log(res)
            });
    }
}