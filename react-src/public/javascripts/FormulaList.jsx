'use strict';
import React from 'react';

import Formula from './Formula.jsx';


class FormulaList extends React.Component {
    constructor(...args) {
        super(...args);

    }

    deleteFormula(...args) {
        console.log(args);
        this.props.deleteFormula(...args);
    }

    updateFormula(...args) {
        this.props.updateFormula(...args);
    }

    render(){
        return (
            <div>
                {
                    this.props.formulas.map((elem, index) =>
                        <Formula
                            key={elem.id}
                            index={index}
                            formula={elem.attributes}
                            deleteFormula={this.deleteFormula.bind(this)}
                            updateFormula={this.updateFormula.bind(this)}
                        />)
                }
            </div>
        )
    }
}

module.exports = FormulaList;
