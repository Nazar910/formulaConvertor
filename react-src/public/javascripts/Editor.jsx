import React from 'react';
import axios from 'axios';

import FormulaList from './FormulaList.jsx';

function getUserFormulas(userId, token) {
    console.log('GET USER FORMULAS');
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:9000/api/formulas/${userId}`,
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(({data}) => {
            console.log('FORMULAS', data);
            resolve(data);
        }).catch(reject);
    })
}

class Editor extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            error: '',
            lang: 'c',
            formulaList: [],
            user: {},
            isUnauthenticated: false
        }
    }

    componentDidMount() {
        const { token } = this.props;
        axios({
            url: 'http://localhost:9000/api/users/profile',
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(({data, statusCode}) => {
            if (statusCode === 403) {
                throw new Error('UnAuthorized');
            }

            return data.user;
        }).then(user => {
            getUserFormulas(user._id, token)
                .then(formulas => {
                    console.log(formulas);
                    this.setState({
                        user,
                        formulaList: formulas.data
                    }, () => console.log(this.state));
                })
                .catch(e => {
                    this.setState({
                        error: e.message
                    })
                })

        }).catch(e => {
            if (e.message === 'UnAuthorized') {
                this.setState({
                    isUnauthenticated: true
                })
            }

            console.error(e);
            this.setState({
                error: e.message
            })
        })

    }

    convertToClassicView(value){
        const formulaBody = {
            data: {
                type: 'formula',
                attributes: {
                    body: value,
                    language: this.state.lang
                }
            }
        };

        return axios.post('http://localhost:9000/api/formulas/' + this.state.user._id, formulaBody);
    }

    processInputFormula() {
        const input = this.refs.inputFormula.value;
        this.convertToClassicView(input)
            .then(({ data }) => {
                if (data.error) {
                    return this.setState({
                        error
                    })
                }

                const arr = this.state.formulaList;

                arr.unshift(data.data);
                this.setState({
                    formulaList: arr
                });
            })
    }

    onLangChange(event) {
        this.setState({
            lang: event.target.value
        })
    }

    updateFormula(id, body, index) {
        axios.patch('http://localhost:9000/api/formulas/' + id, {body})
            .then(({data}) => {
                const arr = this.state.formulaList;

                arr[index].attributes.body = body;
                arr[index].attributes.classicView = data.data.attributes.classicView;

                this.setState({
                    formulaList: arr
                })
            })
    }

    deleteFormula(index, id) {
        axios.delete('http://localhost:9000/api/formulas/' + id)
            .then(({data}) => {
                if (data.deleted === true) {
                    const formulaList = this.state.formulaList;
                    formulaList.splice(index, 1);
                    console.log(formulaList);
                    this.setState({
                        formulaList
                    })
                }
            })
    }

    logout() {
        this.props.logout();
    }

    render() {
        return(
            <div>
                <button className="btn btn-success" id="log-out" onClick={this.logout.bind(this)}>Log out</button>
                <div className="form-group">
                    <br/>
                    <label>Formula:</label>
                    <textarea className="form-control"
                              placeholder="input"
                              ref="inputFormula"
                    >
                    </textarea>
                    {this.state.error}
                    <div>
                        <label>Select language:</label><br/>
                        <select className="form-control"
                                id="select_lang"
                                value={this.state.lang}
                                onChange={this.onLangChange}>
                            <option>c</option>
                            <option>pascal</option>
                            <option>fortran</option>
                        </select>
                        <button className="btn btn-success" id="convert" onClick={this.processInputFormula.bind(this)}>Process</button>
                    </div>
                </div>
                <br/><br/>

                <FormulaList
                    formulas={this.state.formulaList}
                    deleteFormula={this.deleteFormula.bind(this)}
                    updateFormula={this.updateFormula.bind(this)}
                />
            </div>
        )
    }
}

module.exports = Editor;
