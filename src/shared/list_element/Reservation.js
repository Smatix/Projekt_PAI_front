import React, { Component } from "react";
import "./ListElement.css"
import Timer from "../elements/Tmer/Timer";

class Reservation extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>{this.props.name}</div>
                    <div style={{fontSize: '0.5em'}}>{this.props.email}</div>
                </div>
                <Timer time={this.props.time}/>
            </div>
        );
    }
}

export default Reservation;