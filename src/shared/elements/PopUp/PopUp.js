import React, { Component } from "react";
import "./PopUp.css"
import PrimaryBtn from "../../list_element/Parking";

class PopUp extends Component {

    render() {
        return (
            <div className="popup">
                <div className="close-btn"><i className="fas fa-times"></i></div>
                {this.props.children}
            </div>
        );
    }
}

export default PopUp;