import React, { Component } from "react";
import "./PopUp.css"

class PopUp extends Component {


    render() {
        return (
            <div className="popup">
                <div className="close-btn" onClick={this.props.close}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="popup-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PopUp;