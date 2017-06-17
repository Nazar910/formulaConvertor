const React = require('react');
const axios = require('axios');
const renderHTML = require('react-render-html');

const FormulaList = require('./FormulaList.jsx');

import _ from 'lodash';

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
        const token = localStorage.getItem('token');
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
                        user: user,
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

    processInputFormula(){
        const input = this.refs.inputFormula.value;
        this.convertToClassicView(input)
            .then(({ data }) => {
                if (data.error) {
                    this.setState({
                        error
                    })
                }
            })
    }

    /*saveToImg() {
        html2canvas($("#output"), {
            onrendered: function(canvas) {
                document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            }
        });
    }
    saveToXml(){
        var xmlFile="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <formula>"+this.state.outputFormula+"</formula>";
        var blob = new Blob([xmlFile], {
            type: "text/plain;charset=utf-8"
        });

        saveAs(blob, "RAW.xml");
    }*/

    onLangChange(event){
        this.setState({
            lang: event.target.value
        })
    }

    deleteFormula(id) {
        // axios.delete('http://localhost')

    }

    render() {
        return(
            <div>
                <div className="form-group">
                    <label>Formula:</label>
                    <textarea className="form-control"
                              placeholder="input"
                              ref="inputFormula"
                    >
                    </textarea>
                    {this.state.error}
                </div>
                <br/>
                <div className="form-group">
                    <label>Select language:</label>
                    <select className="form-control"
                            id="select_lang"
                            value={this.state.lang}
                            onChange={this.onLangChange}>
                        <option>c</option>
                        <option>pascal</option>
                        <option>fortran</option>
                    </select>
                </div>

                <br/>
                <button className="btn btn-success" onClick={this.processInputFormula.bind(this)}>Process</button>
                <br/>
                <br/>
                <button className="btn btn-default" onClick={this.saveToImg}>Save Formula to Image</button>
                <br/>
                <br/>
                <button className="btn btn-default" onClick={this.saveToXml}>Save Formula to Xml</button>


                { !_.isEmpty(this.state.formulaList) ?
                    <FormulaList formulas={this.state.formulaList}/> : 'Empty'}
            </div>
        )
    }
}

module.exports = Editor;
