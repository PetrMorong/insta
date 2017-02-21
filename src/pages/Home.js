import React, { Component } from 'react';
import { fetchPosts, like, dislike, deletePost } from '../actions/postActions'
import { connect } from 'react-redux';
import Navigation from '../components/Navigation'


const mapStateToProps = (store) => {
    return{
        post: store.post.posts
    }
};


export default class Home extends Component {


    componentWillMount(){
        this.props.dispatch(fetchPosts())
    }

    _handleLike(id){
        this.props.dispatch(like(id, this.props.routes[0].userName))
    }

    _handleDislike(id){
        this.props.dispatch(dislike(id, this.props.routes[0].userName))
    }

    _handleDelete(id){
        this.props.dispatch(deletePost(id))
    }


    render() {
        const { post } = this.props;

        let mappedPosts = post.map((post) => {

            let liked = false;
            post.likedBy.map((name) => {
                if(name ===  this.props.routes[0].userName){
                    liked = true;
                }
                return name;
            });

            let heart;
            if(liked){
                heart = <img onClick={() => this._handleDislike(post._id)} src="http://www.freeiconspng.com/uploads/heart-icon-14.png" alt=""/>
            }else{
                heart = <img onClick={() => this._handleLike(post._id)} src="https://www.clipartsgram.com/image/2057969127-1983601772-black-and-white-heart-md.png" alt=""/>

            }

            return (
                <div className="item" key={post._id}>
                    <div className="item-owner">
                        <img className="item-ownerImage" src={post.ownerImage} alt=""/>
                        <span className="item-ownerName">{post.ownerName}</span>
                    </div>
                    <div className="item-image">
                        <img src={post.image} alt=""/>
                    </div>
                    <div className="item-smallWrap">

                        <div className="item-likeCount">
                            <span> <b>{post.likeCount}</b>  To se mi líbí</span>
                        </div>
                        <div className="item-titleWrap">
                            <span className="item-ownerName">{post.ownerName}</span>
                            <span>{post.title}</span>
                        </div>
                        <div className="item-heart">
                            {heart}
                            <buton onClick={() => this._handleDelete(post._id)} className="button">Delete</buton>
                        </div>
                    </div>
                </div>
            )
        });

        let view;
        if(this.props.post.fetching){
            view = <span>fetching..</span>
        }else{
            view = mappedPosts;
        }


    return (
        <div>
            <Navigation/>
            <div className="content">
                {view}
            </div>
        </div>
    );
  }
}

module.exports = connect(mapStateToProps)(Home);

