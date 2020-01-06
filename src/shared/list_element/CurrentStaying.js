import React, { Component } from "react";
import "./ListElement.css"
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";
import Timer from "../elements/Tmer/Timer";

class CurrentStaying extends Component {

    render() {
        const {id, name, amount, start_timestamp} = this.props.element;
        return (
            <div className="list-element-container">
                <div>
                    <div>{name}</div>
                    <div style={{fontSize: '0.5em'}}>{`Aktualna kwota: ${amount} zł`}</div>
                    <div className="buttons-container">
                        <PrimaryBtn text="Zakończ" type="blue-btn" click={this.props.end}/>
                    </div>
                </div>
                <div>
                    <Timer time={start_timestamp}/>
                </div>
            </div>
        );
    }
}

export default CurrentStaying;