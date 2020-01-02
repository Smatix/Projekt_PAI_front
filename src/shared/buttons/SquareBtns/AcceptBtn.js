import React, { Component } from "react";
import "./SquareBtn.css"

class AcceptBtn extends Component {

    render() {
        return (
            <div className="square-btn-container green-btn" onClick={this.props.click}>
                <i className="fas fa-check"></i>
            </div>
        );
    }
}

export default AcceptBtn;