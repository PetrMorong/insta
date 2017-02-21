/**
 * Created by Petr on 16.2.2017.
 */
import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'


export default class Login extends Component{
    render(){
        return(
            <div className="loginScreen">
                <div className="loginMiddle">
                    <img src="http://www.murga-linux.com/puppy/viewtopic.php?mode=attach&id=18892" alt="logo"/>
                    <h2>InstaPuppy</h2>
                    <h4>Amazing images of puppies</h4>
                    <FacebookLogin
                        appId="595380377331631"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={this.props.responseFB} />
                </div>
            </div>
        )
    }
}