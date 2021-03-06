import React from 'react';
import Editor from './Editor.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import api from './api';


class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            loggedIn: false,
            registered: false
        }
    }

    async componentDidMount() {
        //call profile
        try {
            await api.users.getUserProfile();
            //if success then token should already be in the local storage
            this.setState({
                loggedIn: true
            });
        } catch (_) {
            //something
        }
    }

    register() {
        this.setState({
            registered: true
        });
    }

    login(token) {
        this.setState({ loggedIn: true });
        localStorage.setItem('token', token);
    }

    logout() {
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() =>
                        this.state.loggedIn ?
                            <Redirect to="/editor"/> :
                            <Login saveToken={this.login.bind(this)}/>}/>
                    <Route path="/editor" render={() =>
                        this.state.loggedIn ?
                            <Editor logout={this.logout.bind(this)}/> :
                            <Redirect to="/"/>}/>
                    <Route path="/register" render={() =>
                        this.state.registered ?
                            <Redirect to="/"/> :
                            <Register registered={this.register.bind(this)}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

module.exports = App;
