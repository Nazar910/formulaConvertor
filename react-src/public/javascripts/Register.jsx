'use strict';
import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(...args) {
        super(...args);
    }

    onSubmit() {
        axios.post('http://localhost:9000/api/users/', {
            data: {
                type: 'user',
                attributes: {
                    name: this.refs.name.value,
                    lastName: this.refs.lastName.value,
                    company: this.refs.company.value,
                    email: this.refs.email.value,
                    password: this.refs.password.value
                }
            }
        }).then( () => {
            this.props.registered();
        });
    }

    render(){
        return (
            <div>
                <div className="form-group">
                    <input className="form-control" type="text" ref="name" placeholder="Name"/><br/>
                    <input className="form-control" type="text" ref="lastName" placeholder="Last name"/><br/>
                    <input className="form-control" type="text" ref="email" placeholder="Email"/><br/>
                    <input className="form-control" type="text" ref="company" placeholder="Company name"/><br/>
                    <input className="form-control" type="password" ref="password" placeholder="Password"/><br/>
                    <button className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>&nbsp;
                </div>
            </div>
        )
    }
}

module.exports = Register;
