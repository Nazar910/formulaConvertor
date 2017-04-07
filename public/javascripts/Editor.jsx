const React = require('react');
const axios = require('axios');


const Editor = React.createClass({
    getInitialState(){
        return {
            inputFormula: '',
            outputFormula: ''
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
        let input = this.state.inputFormula;
        this.convertToClassicView(input)
            .then(({ data }) => {
                let formula = data.body.formula;
                this.setState({
                    outputFormula: formula
                });
            })
    },
    render() {
        return(
            <div>

                <textarea value={this.state.inputFormula}
                          placeholder="input"
                          onChange={this.onInputFormulaChange}
                >
                </textarea>

                <span id="output">
                    {this.state.outputFormula}
                </span>

                <button onClick={this.processInputFormula}>Process</button>
            </div>
        )
    }
});

module.exports = Editor;
