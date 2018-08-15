'use strict';
import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            error: ''
        }
    }

    onSubmit() {
        console.log(this.refs.email.value);
        console.log(this.refs.password.value);
        axios.post('http://localhost:9000/api/users/authenticate', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then( ({ data }) => {
            if (!data.token) {
                return this.setState({
                    error: 'Email or Password are incorrect!'
                })
            }

            this.props.updateToken(data.token);
        });
    }

    render(){
        return (
            <div>
                {this.state.error}
                <div className="form-group">
                    <input className="form-control" type="text" ref="email" placeholder="Email"/><br/>
                    <input className="form-control" type="password" ref="password" placeholder="Password"/><br/>
                    <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>&nbsp;
                    <Link to='/register'>Sign up</Link>
                </div>
            </div>
        )
    }
}

module.exports = Login;
