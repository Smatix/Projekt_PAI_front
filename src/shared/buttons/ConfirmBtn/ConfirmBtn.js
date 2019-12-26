import React, { Component } from "react";
import "./ConfirmBtn.css"

class ConfirmBtn extends Component {

    render() {
        return (
            <div className="confirm-btn" onClick={this.props.click}>
                {this.props.text}
            </div>
        );
    }
}

export default ConfirmBtn;