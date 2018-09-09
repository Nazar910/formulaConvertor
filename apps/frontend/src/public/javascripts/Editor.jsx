import React from 'react';

import FormulaList from './FormulaList.jsx';

import api from './api';

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

        this.onLangChange = this.onLangChange.bind(this);
    }

    async componentDidMount() {
        const { user } = await api.users.getUserProfile();
        const formulas = await api.formulas.getUserFormulas(user._id);
        this.setState({
            user,
            formulaList: formulas.data
        });
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

        return api.formulas.postOne(this.state.user._id, formulaBody);
    }

    async processInputFormula() {
        const input = this.refs.inputFormula.value;
        const { data } = await this.convertToClassicView(input)
        const arr = this.state.formulaList;

        arr.unshift(data);
        this.setState({
            formulaList: arr
        });
    }

    onLangChange(event) {
        this.setState({
            lang: event.target.value
        })
    }

    async updateFormula(id, body, index) {
        const data = await api.formulas.patchOne(id, {
            body
        });
        const arr = this.state.formulaList;

        arr[index].attributes.body = body;
        arr[index].attributes.classicView = data.data.attributes.classicView;

        this.setState({
            formulaList: arr
        });
    }

    async deleteFormula(index, id) {
        await api.formulas.deleteOne(id)
        const formulaList = this.state.formulaList;
        formulaList.splice(index, 1);
        this.setState({
            formulaList
        });
    }

    logout() {
        this.props.logout();
    }

    async deleteAccount() {
        const windowMessage = 'Are you sure you want to delete your account?';

        if (confirm(windowMessage)) {
            await api.users.deleteOne(this.state.user._id)
            this.logout.call(this);
        }
    }

    render() {
        return(
            <div>
                Hello, { this.state.user.name }
                <button className="btn btn-success" id="delete-account" onClick={this.deleteAccount.bind(this)}>Delete my account</button>
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
