import React, { Component } from "react";
import "./ListElement.css"
import VehicleIcon from "../elements/VehicleIcon";

class ParkingReservation extends Component {

    render() {
        const {type, expiredDate, name, surname, email} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{`${name} ${surname}`}</div>
                    <div style={{fontSize: '0.5em'}}>{email}</div>
                    <VehicleIcon type={type}/>
                    <div style={{fontSize: '0.5em'}}>{`Data: ${expiredDate}`}</div>
                </div>
            </div>
        );
    }
}

export default ParkingReservation;