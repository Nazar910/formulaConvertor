const React = require('react');
const axios = require('axios');
const renderHTML = require('react-render-html');

const FormulaList = require('./FormulaList.jsx');

function getUserFormulas(userId) {
    console.log('GET USER FORMULAS');
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        axios({
            url: `http://localhost:9000/api/formulas/${userId}`,
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(({data}) => {
            console.log('FORMULAS', data);
            resolve(data);
        })
    })
}

class Editor extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            inputFormula: '',
            outputFormula: '',
            error: '',
            lang: 'c',
            formulaList: [],
            user: {}
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
                window.location = 'login';
                return;
            }

            return data.user;
        }).then(user => {
            console.log(user);

            getUserFormulas(user._id)
                .then(formulas => {
                    console.log(formulas);
                    this.setState({
                        user: user,
                        formulaList: formulas
                    });
                });

        })

    }

    onInputFormulaChange(event){
        let value = event.target.value;
        this.setState({ inputFormula: value });
    }

    convertToClassicView(value){
        return axios.post('http://localhost:9000/api/formulas/' + this.state.user._id, { formula: value, lang: this.state.lang });
    }
    processInputFormula(){
        const input = this.state.inputFormula;
        this.convertToClassicView(input)
            .then(({ data }) => {
                // const formula = data.formula;
                // let state = {
                //     formulaList: this.state.formulaList.push(formula),
                //     error: ''
                // };
                //
                // if (formula.error) {
                //     state = {
                //         error: formula.error,
                //         outputFormula: ''
                //     }
                // }
                //
                // this.setState(state);
            })
    }
    saveToImg() {
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
    }

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
                              value={this.state.inputFormula}
                              placeholder="input"
                              onChange={this.onInputFormulaChange}
                    >
                    </textarea>
                    {this.state.error}
                </div>

                <div className="form-group">
                    <label>Output:</label>
                    <span id="output">
                        {renderHTML(this.state.outputFormula)}
                    </span>
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
                <button className="btn btn-success" onClick={this.processInputFormula}>Process</button>
                <br/>
                <br/>
                <button className="btn btn-default" onClick={this.saveToImg}>Save Formula to Image</button>
                <br/>
                <br/>
                <button className="btn btn-default" onClick={this.saveToXml}>Save Formula to Xml</button>
                <FormulaList formulas={this.state.formulaList}/>
            </div>
        )
    }
}

module.exports = Editor;
