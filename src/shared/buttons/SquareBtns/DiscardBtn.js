import React, { Component } from "react";
import "./styles.css"

class DiscardBtn extends Component {

    render() {
        return (
            <div className="square-btn-container red-btn" onClick={this.props.click}>
                <i className="fas fa-times"></i>
            </div>
        );
    }
}

export default DiscardBtn;