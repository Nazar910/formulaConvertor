import React from 'react';
import Editor from './Editor.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            token: '',
            registered: false
        }
    }

    updateToken(token) {
        this.setState({
            token
        })
    }

    register() {
        this.setState({
            registered: true
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() =>
                        this.state.token ?
                            <Redirect to="/editor"/> :
                            <Login updateToken={this.updateToken.bind(this)}/>}/>
                    <Route path="/editor" component={Editor}/>
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
