/**
 * Created by Petr on 13.2.2017.
 */

export default function reducer(state={
    posts: [],
    postsProfile: []
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
                posts: action.payload,
                uploaded: false
            }
        }

        case 'UPLOAD_POST': {
            return{...state, uploading: true}
        }
        case 'UPLOAD_POST_REJECTED': {
            return {...state, uploaded: false, uploading: false, error: action.payload}
        }
        case 'UPLOAD_POST_FULFILLED': {
            return {...state, uploaded: true, uploading: false}
        }
        case 'LIKED': {

            if(state.posts.length > 0){
                let newArray = state.posts.map((post)=>{
                    if(post._id === action._id){
                        post.likeCount++;
                        post.likedBy.push(action.name);
                    }
                    return post;
                });
                return {...state, posts: newArray}
            }else{
                let newArray = state.postsProfile.map((post)=>{
                    if(post._id === action._id){
                        post.likeCount++;
                        post.likedBy.push(action.name);
                    }
                    return post;
                });
                return {...state, postsProfile: newArray}
            }
        }

        case 'DISLIKED': {

            if(state.posts.length > 0){
                let newArray = state.posts.map((post)=>{
                    if(post._id === action._id){
                        post.likeCount--;
                        let newLikedBy = post.likedBy.map((like)=>{
                            if(like !== action.name){
                                return like
                            }
                        });
                        post.likedBy = newLikedBy;
                    }
                    return post;
                });
                return {...state, posts: newArray}
            }else{
                let newArray = state.postsProfile.map((post)=>{
                    if(post._id === action._id){
                        post.likeCount--;
                        let newLikedBy = post.likedBy.map((like)=>{
                            if(like !== action.name){
                                return like
                            }
                        });
                        post.likedBy = newLikedBy;
                    }
                    return post;
                });
                return {...state, postsProfile: newArray}
            }
        }

        case 'FETCH_PROFILE': {
            return {...state, fetching: true}
        }
        case 'FETCH_PROFILE_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_PROFILE_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                postsProfile: action.payload,
                uploaded: false
            }
        }
    }
    return state;
}