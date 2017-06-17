'use strict';
const React = require('react');
const axios = require('axios');

const Formula = require('./Formula.jsx');

class FormulaList extends React.Component {
    constructor(...args) {
        super(...args);

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        console.log(this.props.formulas);
    }

    deleteFormula(id) {
        this.props.deleteFormula(id);
    }

    render(){
        return (
            <div>
                {
                    this.props.formulas.map(elem => <Formula key={elem._id} formula={elem}/>)
                }
            </div>
        )
    }
}

module.exports = FormulaList;
