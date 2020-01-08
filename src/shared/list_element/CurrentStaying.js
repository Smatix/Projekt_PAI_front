import React, { Component } from "react";
import "./ListElement.css"
import PrimaryBtn from "../buttons/PrimaryBtns/PrimaryBtn";
import Timer from "../elements/Tmer/Timer";

class CurrentStaying extends Component {

    render() {
        return (
            <div className="list-element-container">
                <div>
                    <div>{this.props.title}</div>
                    <div style={{fontSize: '0.5em'}}>{`Aktualna kwota: ${this.props.element.amount} zł`}</div>
                    <div className="buttons-container">
                        <PrimaryBtn text="Zakończ" type="blue-btn" click={this.props.end}/>
                    </div>
                </div>
                <div>
                    <Timer time={this.props.element.start_timestamp}/>
                </div>
            </div>
        );
    }
}

export default CurrentStaying;