import React, { Component } from "react";
import "./ListElement.css"
import TrashBtn from "../buttons/SquareBtns/TrashBtn";
import VehicleIcon from "../elements/VehicleIcon";


class Reservation extends Component {

    render() {
        const {id,expiredDate, parkingName, street, number, city, type} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{parkingName}</div>
                    <div style={{fontSize: '0.4em'}}>{`${street} ${number}, ${city}`}</div>
                    <VehicleIcon type={type}/>
                    <div style={{fontSize: '0.5em'}}>{`Data: ${expiredDate}`}</div>
                </div>
                <div className="buttons-container">
                    <TrashBtn/>
                </div>
            </div>
        );
    }
}

export default Reservation;