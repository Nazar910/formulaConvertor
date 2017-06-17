'use strict';
import React from 'react';
import axios from 'axios';

import renderHTML from 'react-render-html';

class Formula extends React.Component {
    constructor(...args) {
        super(...args);

    }

    delete() {
        // this.props.deleteFormula(this.props.formula._id);
    }

    render(){
        return (
            <div>
                <p>{renderHTML(this.props.formula.classicView)}</p>
            </div>
        )
    }
}

module.exports = Formula;
