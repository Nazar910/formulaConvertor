'use strict';
import React from 'react';
import axios from 'axios';

import renderHTML from 'react-render-html';

class Formula extends React.Component {
    constructor(...args) {
        super(...args);

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

    delete() {
        // this.props.deleteFormula(this.props.formula._id);
    }

    render(){
        return (
            <div>
                <span id="formula">{renderHTML(this.props.formula.classicView)}</span>
                <button className="btn btn-default" onClick={this.saveToXml.bind(null, this.props.formula.classicView)}>Save to Xml</button>
                <button className="btn btn-default" onClick={this.saveToImg}>Save to Image</button>
                <button className="btn btn-default" onClick={this.deleteFormula}>Delete</button>
            </div>
        )
    }
}

module.exports = Formula;
