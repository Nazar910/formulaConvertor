import React from 'react';
import Editor from './Editor.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


class App extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            token: localStorage.getItem('token'),
            registered: false
        }
    }

    componentDidMount() {
        const { content } = document.querySelector('meta[name="api-uri"');
        process.env.API_URI = content;
    }

    updateToken(token) {
        this.setState({
            token
        });
        localStorage.setItem('token', token);
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
                    <Route path="/editor" render={() =>
                        this.state.token ?
                            <Editor token={this.state.token} logout={() => this.updateToken('')}/> :
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
