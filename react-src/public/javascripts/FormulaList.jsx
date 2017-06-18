'use strict';
import React from 'react';

import Formula from './Formula.jsx';


class FormulaList extends React.Component {
    constructor(...args) {
        super(...args);

        this.deleteFormula = this.deleteFormula.bind(this);
    }

    deleteFormula(...args) {
        console.log(args);
        this.props.deleteFormula(...args);
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
                            deleteFormula={this.deleteFormula}
                        />)
                }
            </div>
        )
    }
}

module.exports = FormulaList;
