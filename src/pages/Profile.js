/**
 * Created by Petr on 25.2.2017.
 */
import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import { connect } from 'react-redux';
import { fetchProfile, like, dislike, deletePost } from '../actions/postActions'
import Close from 'react-icons/lib/md/close'
import ChevronLeft from 'react-icons/lib/md/chevron-left'
import ChevronRight from 'react-icons/lib/md/chevron-right'

const mapStateToProps = (store) => {
    return{
        posts: store.post.postsProfile,
        fetching: store.post.fetching
    }
};

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            isHovering: '',
            postDetail: false
        }
    }

    componentWillMount(){
        this.props.dispatch(fetchProfile(this.props.params.user))
    }

    handleMouseEnter(id){
        this.setState({isHovering: id})
    }

    handleMouseLeave(){
        this.setState({isHovering: ''})
    }

    handleClick(indexInArray){
        this.setState({
            postDetail: {
                post: this.props.posts[indexInArray],
                index: indexInArray
            }
        })
    }

    handleClose(){
        this.setState({postDetail: false})
    }

    handleNext(){
        let postDetail = Object.assign(this.state.postDetail);
        postDetail.index++;
        postDetail.post = this.props.posts[postDetail.index];
        this.setState({postDetail: postDetail})
    }

    handlePrevious(){
        let postDetail = Object.assign(this.state.postDetail);
        postDetail.index--;
        postDetail.post = this.props.posts[postDetail.index];
        this.setState({postDetail: postDetail})
    }

    _handleLike(id){
        this.props.dispatch(like(id, this.props.routes[0].user.name))
    }

    _handleDislike(id){
        this.props.dispatch(dislike(id, this.props.routes[0].user.name))
    }

    _handleDelete(id){
        this.handleClose()
        this.props.dispatch(deletePost(id, this.props.route.user.name))
    }



    render() {
        const user = this.props.route.user;
        const { posts } = this.props;

        let mappedPosts = posts.map((post, key)=>{
            let classes;
            if(this.state.isHovering === post._id){
                classes = 'profileImgWrap profileImgWrapHovered'
            }else{
                classes = 'profileImgWrap'
            }


           return <div className={classes} key={post._id}
                       onMouseEnter={()=>this.handleMouseEnter(post._id)}
                       onMouseLeave={()=>this.handleMouseLeave()}
                       onClick={()=>this.handleClick(key)}>
               <img src={post.image} alt="" className="profileImg"/>
               <div className="hoverProfileImage">
                   <div className="hoverProfileImageWrap">
                       <img src={require('../img/heartWhite.png')} alt="srdce" className="whiteHeart"/>
                       <span className="heartCount"> ({post.likeCount})</span>
                   </div>
               </div>
           </div>
        });

        let postDetail;
        let classes;
        if(this.state.postDetail){

            let post = this.state.postDetail.post;

            let chevronLeft;
            if(this.state.postDetail.index !== 0){
               chevronLeft =  <ChevronLeft className="postDetailChevronLeft" onClick={()=>this.handlePrevious()}/>
            }else{
                chevronLeft = <div></div>
            }

            let chevronRight;
            if(this.state.postDetail.index !== this.props.posts.length-1){
                chevronRight =  <ChevronRight className="postDetailChevronRight" onClick={()=>this.handleNext()}/>

            }

            let liked = false;
            post.likedBy.map((name) => {
                if(name ===  user.name){
                    liked = true;
                }
                return name;
            });

            let heart;
            if(liked){
                heart = <img className="profileHeart" onClick={() => this._handleDislike(post._id)} src="http://www.freeiconspng.com/uploads/heart-icon-14.png" alt=""/>
            }else{
                heart = <img className="profileHeart" onClick={() => this._handleLike(post._id)} src="https://www.clipartsgram.com/image/2057969127-1983601772-black-and-white-heart-md.png" alt=""/>

            }

            classes = 'relativePosition';
            postDetail = <div className="postDetailWrap" >
                <div className="postDetailSmallWrap">
                    <div className="postDetailLeft">
                        <img src={post.image} alt=""/>
                    </div>
                    <div className="postDetailRight">
                        <div className="postDetailRightTop">
                            <img src={post.ownerImage} alt=""/>
                            <span>{post.ownerName}</span>
                        </div>
                        <div className="postDetailRightLikes">
                            <span className="mediumFont">{post.likeCount} To se mi líbí</span>
                        </div>
                        <div className="postDetailRightOwner">
                            <span className="mediumFont">{post.ownerName}</span>
                            <span className="paddingLeft10">{post.title}</span>
                        </div>
                        <div className="postDetailRightCommentSection">

                        </div>
                        <div className="postDetailRightLikeSection">
                            {heart}
                            <buton onClick={() => this._handleDelete(post._id)} className="button">Delete</buton>
                        </div>
                    </div>
                    {chevronLeft}
                    {chevronRight}
                </div>
                <Close className="postDetailClose" onClick={()=>this.handleClose()}/>

            </div>
        }

        let view;
        if(this.props.fetching){
            view = <div className="loader">
                <img src={require('../img/ring-alt.gif')} alt="loader"/>
            </div>
        }else{
            view = mappedPosts;
        }

        return (
            <div className={classes}>
                <Navigation userName={user.name}/>
                <div className="content">
                    <div className="profileWrap">
                        <div className="profileTop">
                            <div className="profileImageWrap">
                                <img src={user.image} alt="profilePic" className="profileImage"/>
                            </div>
                            <div className="profileTopRight">
                                <div className="profileLine">
                                    <span className="profileName">{user.name}</span>
                                </div>
                                <div>
                                    Příspěvky  ({Object.keys(posts).length})
                                </div>
                            </div>
                        </div>
                        <div className="profileGrid">
                            {view}
                        </div>
                    </div>
                </div>
                {postDetail}
            </div>
        )
    }
}

module.exports = connect(mapStateToProps)(Profile);


