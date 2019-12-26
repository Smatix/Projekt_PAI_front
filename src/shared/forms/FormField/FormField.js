import React, { Component } from "react";
import "./FormField.css"

class FormField extends Component {

    render() {
        return (
            <div className="form-field-container">
                <label>{this.props.label}</label>
                <input type={this.props.type} className="form-field" placeholder={this.props.placeholder}/>
            </div>
        );
    }
}

export default FormField;