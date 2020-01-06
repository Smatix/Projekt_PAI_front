import React, { Component } from "react";
import "./ListElement.css"
import AcceptBtn from "../buttons/SquareBtns/AcceptBtn";
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";
import StarRate from "../elements/StarRate/StartRate";
import {Link} from "react-router-dom";
import PopUp from "../elements/PopUp/PopUp";
import ReservationForm from "../forms/ReservationForm/ReservationForm";

class Parking extends Component {

    state = {
        openPopup: false
    };

    openPopUp = () => {
        this.setState({
            openPopup: true
        })
    };

    closePopUp = () => {
        this.setState({
            openPopup: false
        })
    };

    render() {
        const {id, name, number, street, city, rate, pick, priceList} = this.props.element;
        return (
            <div
                className="list-element-container"
                style={pick ? {borderRadius: 0, boxShadow: '5px 5px 5px #B2B2B2'} : {borderRadius: 0}}
                onMouseOver={this.props.mouseOver}
                onMouseOut={this.props.mouseOut}
            >
                <div>
                    <div>{name}</div>
                    <div style={{fontSize: '0.4em'}}>{`ul ${street} ${number}, ${city}`}</div>
                    <div style={{fontSize: '0.3em'}}>
                        <StarRate rate={rate}/>
                    </div>
                    <div style={{display: 'flex', fontSize: '0.6em'}}>
                        <i className="fas fa-car"></i>
                        {priceList.map(el => {
                            if (el.type === "car") {
                                return `${el.price} zł/${el.period}${el.unit}`
                            }
                        })}
                    </div>
                    <div style={{display: 'flex', fontSize: '0.6em'}}>
                        <i className="fas fa-motorcycle"></i>
                        {priceList.map(el => {
                            if (el.type === "motorbike") {
                                return `${el.price} zł/${el.period}${el.unit}`
                            }
                        })}
                    </div>
                </div>
                <PrimaryBtn
                    text="Rezerwuj"
                    type="blue-btn"
                    click={this.openPopUp}
                />
                {this.state.openPopup ?
                    <PopUp close={this.closePopUp}>
                        <ReservationForm parking={id}/>
                    </PopUp>
                    : null}
            </div>
        );
    }
}

export default Parking;