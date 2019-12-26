import React, { Component } from "react";
import "./Timer.css"

class Timer extends Component {

    render() {
        return (
            <div className="timer-container">
                <div className="timer-digits">12:34:08</div>
            </div>
        );
    }
}

export default Timer;