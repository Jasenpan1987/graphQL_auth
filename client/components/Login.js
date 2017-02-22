import React, { Component } from "react";
import { hashHistory } from "react-router";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";
import login from "../mutations/login";
import currentUser from "../queries/currentUser";

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            errors: []
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillUpdate(nextProps){
        // console.log(this.props, nextProps);
        if(!this.props.data.user && nextProps.data.user){
            hashHistory.push("/");
        }
    }

    handleLogin(email, password){
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{ query: currentUser }]
        })
        // .then((user)=> {
        //     console.log("login successful")
        //     hashHistory.push("/");
        // })
        .catch(err => {
            const errors = err.graphQLErrors.map(err => err.message);
            this.setState({ errors });
        });
    }

    render(){
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    handleSubmit={this.handleLogin}
                    errors={this.state.errors}
                />
            </div>
        )    
    }
}

export default graphql(currentUser)(
    graphql(login)(LoginForm)
);