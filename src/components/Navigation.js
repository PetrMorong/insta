/**
 * Created by Petr on 16.2.2017.
 */
import React, { Component } from 'react'
import Camera from 'react-icons/lib/fa/camera'
import Person from 'react-icons/lib/md/person'
import { Link } from 'react-router'


export default class Navigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            search: ''
        };

        this._updateSearch = this._updateSearch.bind(this);
    }

    _updateSearch(event){
        this.setState({search: event.target.value});
    }

    render(){
        let searchComponent;
        /*if(this.state.search !== ''){
            let searchResult = post.filter((match) => {
                return match.title.indexOf(this.state.search) !== -1;
            });

            searchComponent = searchResult.map((value, key) => {
                return(<div className="searchComponentRow" key={key}>
                    <div className="searchImage">
                        <img src={value.image} alt=""/>
                    </div>
                    <div className="searchTitle">
                        {value.title}
                    </div>
                </div>)
            });
        }*/
        return(
            <div className="nav">
                <div className="navWrap">
                    <Link to={'/'}>
                        <div className="logoWrap">
                            <div className="logo">
                                <img src="http://www.murga-linux.com/puppy/viewtopic.php?mode=attach&id=18892" alt="logo"/>
                            </div>
                            <h4 className="logoText">Instapuppy</h4>
                        </div>
                    </Link>
                    <div className="searchWrap ">
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Hledat"
                                className="searchInput"
                                id='sear'
                                value={this.state.search}
                                onChange={this._updateSearch}/>
                            <div className="searchComponent">
                                {searchComponent}
                            </div>
                        </div>
                    </div>
                    <div className="searchWrap">
                        <Link to={'add-post'}><Camera style={{fontSize: 25, margin: 10}}/></Link>
                        <Link><Person style={{fontSize: 30, margin: 10}}/></Link>

                    </div>
                </div>
            </div>
        )
    }
}