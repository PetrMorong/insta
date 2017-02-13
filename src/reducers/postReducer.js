/**
 * Created by Petr on 13.2.2017.
 */

export default function reducer(state={
    posts: []
}, action){

    switch(action.type) {
        case 'FETCH_POST': {
            return {...state, fetching: true}
        }
        case 'FETCH_POST_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_POST_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                posts: action.payload
            }
        }
    }
    return state;
}