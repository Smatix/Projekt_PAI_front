import React, { Component } from "react";
import "./SquareBtn.css"

class TrashBtn extends Component {

    render() {
        return (
            <div className="square-btn-container red-btn" onClick={this.props.click}>
                <i className="fas fa-trash"></i>
            </div>
        );
    }
}

export default TrashBtn;