import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchPosts, like } from './actions/postActions'


const mapStateToProps = (store) => {
    return{
        post: store.post.posts
    }
}

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'PuppyMaster',
            editingName: false
        }

        this._handleEdit = this._handleEdit.bind(this);
        this._updateName = this._updateName.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(fetchPosts())
    }

    _handleLike(id){
        this.props.dispatch(like(id, this.state.name))
        setTimeout(()=>{
            this.props.dispatch(fetchPosts())
        }, 350)
    }

    _updateName(event){
        this.setState({name: event.target.value});
    }

    _handleEdit(){
        this.setState({editingName: !this.state.editingName})
    }



    render() {
        const { post } = this.props;
        let mappedPosts = post.map((post, key) => {
            return (
                <div className="item" key={post._id}>
                    <div className="item-title" >
                        <span>{post.title}</span>
                    </div>
                    <div className="item-image">
                        <img src={post.image} alt=""/>
                    </div>
                    <div className="item-smallWrap">
                        <div className="item-likeCount">
                            <span> <b>{post.likeCount}</b>  To se mi líbí</span>
                        </div>
                        <div className="item-heart">
                            <img onClick={() => this._handleLike(post._id)} src="https://www.clipartsgram.com/image/2057969127-1983601772-black-and-white-heart-md.png" alt=""/>
                            <a href="#">
                                delete
                            </a>
                        </div>
                    </div>
                </div>
            )
        });

        let name;
        if(this.state.editingName){
            name = <div>
                <input type="text"
                       id='name'
                       value={this.state.name}
                       onChange={this._updateName}
                       placeholder="Your nickaname"/>
                <buton onClick={this._handleEdit} className="button">Save</buton>
            </div>
        }else{
            name = <div>
                <span>nickname: {this.state.name}</span>
                <buton onClick={this._handleEdit} className="button">Edit</buton>
            </div>

        }

    return (
        <div className="App">
            <div className="nav">
                <div className="navWrap">
                    <div className="logoWrap">
                        <div className="logo">
                            <img src="http://www.murga-linux.com/puppy/viewtopic.php?mode=attach&id=18892" alt="logo"/>
                        </div>
                        <h4 className="logoText">Instapuppy</h4>
                    </div>
                    <div className="searchWrap">
                        {name}
                    </div>
                </div>
            </div>
            <div className="content">
                {mappedPosts}
            </div>
        </div>
    );
  }
}

module.exports = connect(mapStateToProps)(App);