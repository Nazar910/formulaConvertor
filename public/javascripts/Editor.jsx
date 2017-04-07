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
    SaveToImg() {
        html2canvas($("#output"), {
            onrendered: function(canvas) {
                document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            }
        });
    },

    render() {
        return(
            <div>
                {this.state.error}
                <textarea value={this.state.inputFormula}
                          placeholder="input"
                          onChange={this.onInputFormulaChange}
                >
                </textarea>

                <span id="output">
                    {renderHTML(this.state.outputFormula)}
                </span>
                <button onClick={this.SaveToImg}>Save Formula to Image</button>
                <button onClick={this.processInputFormula}>Process</button>
            </div>
        )
    }
});

module.exports = Editor;
