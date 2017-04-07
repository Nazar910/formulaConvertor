const React = require('react');
const axios = require('axios');
const renderHTML = require('react-render-html');


const Editor = React.createClass({
    getInitialState(){
        return {
            inputFormula: '',
            outputFormula: '',
            error: ''
        }
    },
    onInputFormulaChange(event){
        let value = event.target.value;
        this.setState({ inputFormula: value });
    },

    convertToClassicView(value){
        return axios.post('/api', { formula: value });
    },
    processInputFormula(){
        const input = this.state.inputFormula;
        this.convertToClassicView(input)
            .then(({ data }) => {
                const formula = data.body.formula;
                let state = {
                    outputFormula: formula,
                    error: ''
                };

                if (formula.error) {
                    state = {
                        error: formula.error,
                        outputFormula: ''
                    }
                }

                this.setState(state);
            })
    },
    saveToImg() {
        html2canvas($("#output"), {
            onrendered: function(canvas) {
                document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            }
        });
    },
    saveToXml(){
        var xmlFile="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <formula>"+this.state.outputFormula+"</formula>";
        var blob = new Blob([xmlFile], {
            type: "text/plain;charset=utf-8"
        });

        saveAs(blob, "RAW.xml");
    },

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
                    <select className="form-control" id="select_lang">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
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
            </div>
        )
    }
});

module.exports = Editor;
