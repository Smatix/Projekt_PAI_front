import React, { Component } from "react";
import "./SquareBtn.css"

class InvoiceBtn extends Component {

    render() {
        return (
            <div className="square-btn-container blue-btn" onClick={this.props.click}>
                <i className="fas fa-file-invoice"></i>
            </div>
        );
    }
}

export default InvoiceBtn;