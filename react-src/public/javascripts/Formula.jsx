'use strict';
const React = require('react');
const axios = require('axios');

const renderHTML = require('react-render-html');

class Formula extends React.Component {
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
