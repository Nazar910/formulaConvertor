'use strict';
const React = require('react');
const axios = require('axios');

class Login extends React.Component {
    constructor(...args) {
        super(...args);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        axios.post('http://localhost:9000/api/users/authenticate', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then( ({ data }) => {
            localStorage.setItem('token', data.token);
            window.location = 'editor';
        });
    }

    register() {
        window.location = 'register';
    }

    render(){
        return (
            <div>
                <input type="text" ref="email"/><br/>
                <input type="password" ref="password"/><br/>
                <button className="btn btn-success" onClick={this.onSubmit}>Submit</button>&nbsp;
                <button className="btn btn-success" onClick={this.register}>Sign up</button>
            </div>
        )
    }
}

module.exports = Login;
