import React, { Component } from "react";
import "./PrimaryBtns.css"

class PrimaryBtn extends Component {

    render() {
        return (
            <div className={`primary-btn-container ${this.props.type}`} onClick={this.props.click}>
                {this.props.text}
            </div>
        );
    }
}

export default PrimaryBtn;