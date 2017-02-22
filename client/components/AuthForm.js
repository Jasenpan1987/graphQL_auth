import React, { Component } from "react";

class AuthForm extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        const email = this._inputEmail.value,
            password = this._inputPassword.value;
        
        this._inputEmail.value = "";
        this._inputPassword.value = "";

        this.props.handleSubmit(email, password);
    }

    render(){
        return (
            <div className="row">
                <form className="col s6" onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input placeholder="email" type="text" ref={i => this._inputEmail = i}/>
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="password" ref={i => this._inputPassword = i}/>
                    </div>
                    <input value="Submit" type="submit" className="btn"/> 
                    <div className="errors">
                        { this.props.errors.map(err => (<div key={err}>{err}</div>))}
                    </div>
                </form>
            </div>
        )
    }
}

export default AuthForm;