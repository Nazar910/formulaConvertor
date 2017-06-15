'use strict';
const React = require('react');
const axios = require('axios');

const Register = React.createClass({
    onSubmit() {
        axios.post('http://localhost:9000/api/users/', {
            user: {
                name: this.refs.name.value,
                lastName: this.refs.lastName.value,
                company: this.refs.company.value,
                email: this.refs.email.value,
                password: this.refs.password.value
            }
        }).then( () => {
            window.location = '/';
        });
    },

    render(){
        return (
            <div>
                <input type="text" ref="name"/><br/>
                <input type="text" ref="lastName"/><br/>
                <input type="text" ref="email"/><br/>
                <input type="text" ref="company"/><br/>
                <input type="password" ref="password"/><br/>
                <button className="btn btn-success" onClick={this.onSubmit}>Submit</button>&nbsp;
            </div>
        )
    }
});

module.exports = Register;
