'use strict';
import React from 'react';
import axios from 'axios';

import Formula from './Formula.jsx';


class FormulaList extends React.Component {
    constructor(...args) {
        super(...args);

    }

    deleteFormula(id) {
        this.props.deleteFormula(id);
    }

    render(){
        return (
            <div>
                {
                    this.props.formulas.map(elem => <Formula key={elem.id} formula={elem.attributes}/>)
                }
            </div>
        )
    }
}

module.exports = FormulaList;
