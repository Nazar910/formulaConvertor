'use strict';
import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(...args) {
        super(...args);
    }

    onSubmit() {
        axios.post('http://localhost:9000/api/users/authenticate', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then( ({ data }) => {
            this.props.updateToken(data.token);
        });
    }

    render(){
        return (
            <div>
                <input type="text" ref="email"/><br/>
                <input type="password" ref="password"/><br/>
                <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>&nbsp;
                <Link to='/register'>Sign up</Link>
            </div>
        )
    }
}

module.exports = Login;
