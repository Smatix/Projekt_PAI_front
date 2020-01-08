import React, { Component } from "react";
import "./ListElement.css"
import AcceptBtn from "../buttons/SquareBtns/AcceptBtn";
import DiscardBtn from "../buttons/SquareBtns/DiscardBtn";
import VehicleIcon from "../elements/VehicleIcon";

class ReservationToAccept extends Component {

    render() {
        const {id, type, expiredDate, name, surname, email} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{`${name} ${surname}`}</div>
                    <div style={{fontSize: '0.5em'}}>{email}</div>
                    <VehicleIcon type={type}/>
                    <div style={{fontSize: '0.5em'}}>{`Data ${expiredDate}`}</div>
                </div>
                <div className="buttons-container">
                    <AcceptBtn click={this.props.accept}/>
                    <DiscardBtn/>
                </div>
            </div>
        );
    }
}

export default ReservationToAccept;