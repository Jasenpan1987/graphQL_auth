import React, { Component } from "react";
import { graphql } from "react-apollo";

import AuthForm from "./AuthForm";

import signup from "../mutations/signup";
import currentUser from "../queries/currentUser";

class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = { errors: [] };

        this.handleSignup = this.handleSignup.bind(this);
    }

    componentWillUpdate(nextProps){
        // console.log(this.props, nextProps);
        if(!this.props.data.user && nextProps.data.user){
            hashHistory.push("/");
        }
    }

    handleSignup(email, password){
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{ query: currentUser }]
        }).catch(err => {
            const errors = err.graphQLErrors.map(err => err.message);
            this.setState({ errors });
        });
    }

    render(){
        return(
            <div>
                <h3>Signup</h3>
                <AuthForm 
                    handleSubmit={this.handleSignup}
                    errors={this.state.errors}
                />
            </div> 
        )   
    }
}

export default graphql(currentUser)(
    graphql(signup)(SignupForm)
);