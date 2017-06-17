const React = require('react');
const Editor = require('./Editor.jsx');
const Login = require('./Login.jsx');
const Register = require('./Register.jsx');

const { BrowserRouter, Switch, Route } = require('react-router-dom');


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/editor" component={Editor}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

module.exports = App;
