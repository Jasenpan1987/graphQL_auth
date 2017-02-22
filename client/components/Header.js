import React, { Component } from "react";
import { graphql } from "react-apollo";

import { Link, hashHistory } from "react-router";

import currentUser from "../queries/currentUser";
import logout from "../mutations/logout"

class Header extends Component {
    constructor(props){
        super(props);

        this.renderBtns = this.renderBtns.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
        e.preventDefault();
        this.props.mutate({
            refetchQueries: [{ query: currentUser }]
        });
        hashHistory.push("/");
    }

    renderBtns(){
        if(this.props.data.loading){
            return (
                null
            );
        }
        
        if(this.props.data.user){
            return (
                <li>
                    <a href="#" 
                        onClick={this.handleLogout}
                    >Logout</a>
                </li>
            )
        }

        return (
            <div>
                <li>
                    <Link to="/signup" >Signup</Link>
                </li>
                <li>
                    <Link to="/login" >Login</Link>
                </li>
            </div>
        )
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderBtns()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(logout)(
    graphql(currentUser)(Header)
)