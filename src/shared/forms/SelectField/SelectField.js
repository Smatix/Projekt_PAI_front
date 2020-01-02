import React, { Component } from "react";
import "./SelectField.css"

class SelectField extends Component {

    render() {
        return (
            <div className="form-field-container">
                <label>{this.props.label}</label>
                <select
                    style={this.props.error ? {border: "1px solid red"} : null}
                    className="form-field"
                    placeholder={this.props.placeholder}
                    onChange={this.props.change}
                    name={this.props.name}
                >
                    {
                        this.props.options.map(item => {
                            return (
                                <option value={item.value}>
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </select>
                {this.props.error ? <div className="error-msg">{this.props.error}</div> : null}
            </div>
        );
    }
}

export default SelectField;