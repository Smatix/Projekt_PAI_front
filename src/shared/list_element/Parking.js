import React, { Component } from "react";
import "./ListElement.css"
import AcceptBtn from "../buttons/SquareBtns/AcceptBtn";
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";
import StarRate from "../elements/StarRate/StartRate";
import PopUp from "../elements/PopUp/PopUp";

class Parking extends Component {

    render() {
        const {name, number, street, city, rate, pick, priceList} = this.props.element;
        return (
            <div
                className="list-element-container"
                style={pick ? {borderRadius: 0, boxShadow: '5px 5px 5px #B2B2B2'} : {borderRadius: 0}}
                onMouseOver={this.props.mouseOver}
                onMouseOut={this.props.mouseOut}
            >
                <div>
                    <div style={{fontSize: '0.7em'}}>{name}</div>
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
                    click={(event) => console.log(name)}
                />
            </div>
        );
    }
}

export default Parking;