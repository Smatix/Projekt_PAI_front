import React, { Component } from "react";
import "./ListElement.css"
import Timer from "../elements/Tmer/Timer";

class Reservation extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>Mateusz Suchenia</div>
                    <div style={{fontSize: '0.5em'}}>mail</div>
                </div>
                <Timer/>
            </div>
        );
    }
}

export default Reservation;