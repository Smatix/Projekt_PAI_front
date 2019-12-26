import React, { Component } from "react";
import "./ListElement.css"
import AcceptBtn from "../buttons/SquareBtns/AcceptBtn";
import DiscardBtn from "../buttons/SquareBtns/DiscardBtn";

class ReservationToAccept extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>Mateusz Suchenia</div>
                    <div style={{fontSize: '0.5em'}}>mail</div>
                </div>
                <div className="buttons-container">
                    <AcceptBtn/>
                    <DiscardBtn/>
                </div>
            </div>
        );
    }
}

export default ReservationToAccept;