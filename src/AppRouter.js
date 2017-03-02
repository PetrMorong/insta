/**
 * Created by Petr on 16.2.2017.
 */
import React, { Component } from 'react'
import { Router, Route, hashHistory, } from 'react-router'

import Home from './pages/Home'
import AddPost from './pages/AddPost'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './styles/App.css';

const NotFound = () => (
    <h1>404.. This page is not found!</h1>);

export default class AppRouter extends Component{
    constructor(props){
        super(props);

        let user = JSON.parse(sessionStorage.getItem('user')) || {};

        if (!Object.keys(user).length){
            this.state = {};
        } else {
            this.state = {
                user: {
                    name:  user.name,
                    image: user.picture.data.url,
                },
                logged: sessionStorage.getItem('user')
            };
        }
    }

    render(){
        const responseFB = (response) => {
            console.log(response)
            if(response.name){
                let user = {
                    name: response.name,
                    image: response.picture.data.url
                };
                this.setState({logged: true, user: user});
                sessionStorage.setItem('user', JSON.stringify(response))
            }
        };

        let view;
        if(this.state.logged){
            view = <div>
                <Router history={hashHistory}>
                    <Route path='/' component={Home} userName={this.state.user.name}/>
                    <Route path='/add-post' component={AddPost} userName={this.state.user.name}/>
                    <Route path='/profile/:user' component={Profile} user={this.state.user}/>
                    <Route path='*' component={NotFound} />
                </Router>
            </div>
        }else{
            view = <Login responseFB={responseFB}/>
        }

        return(
            <div className="App">
                {view}
            </div>
        )
    }
}



