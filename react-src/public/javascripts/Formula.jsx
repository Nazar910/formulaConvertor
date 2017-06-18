'use strict';
import React from 'react';

import renderHTML from 'react-render-html';

class Formula extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            edit: false
        }
    }

    saveToImg() {
        html2canvas($("#formula"), {
            onrendered: function(canvas) {
                document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            }
        });
    }
    saveToXml(value){
        var xmlFile="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <formula>"+ value +"</formula>";
        var blob = new Blob([xmlFile], {
            type: "text/plain;charset=utf-8"
        });

        saveAs(blob, "RAW.xml");
    }

    deleteFormula() {
        this.props.deleteFormula(this.props.index, this.props.formula._id);
    }

    saveFormula() {
        this.props.updateFormula(this.props.formula._id, this.refs.edit_formula.value, this.props.index);
        this.setState({edit: false});
    }

    render(){
        return (
            <div>
                {
                    this.state.edit ?
                        <div className="form-group">
                            <input type="text" className="form-control" ref="edit_formula"/>
                            <button className="btn btn-default" onClick={this.saveFormula.bind(this)}>Save</button>
                            <button className="btn btn-default" onClick={() => this.setState({edit: false})}>Cancel</button>
                        </div>
                        :
                        <div>
                            <span id="formula">{renderHTML(this.props.formula.classicView)}</span>
                            <button className="btn btn-default" onClick={this.saveToXml.bind(null, this.props.formula.classicView)}>Save to Xml</button>
                            <button className="btn btn-default" onClick={this.saveToImg}>Save to Image</button>
                            <button className="btn btn-default" onClick={() =>
                                this.setState({edit: true}, () => this.refs.edit_formula.value = this.props.formula.body)}>Edit</button>
                            <button className="btn btn-default" onClick={this.deleteFormula.bind(this)}>Delete</button>
                        </div>
                }
            </div>
        )
    }
}

module.exports = Formula;
