import React, { Component } from "react";
import "./Timer.css"

class Timer extends Component {

    constructor(props) {
        super(props);
        this.now = new Date();
        const date = new Date(this.props.time*1000);
        this.state = {
            hours: Math.abs(this.now.getHours() - date.getHours()),
            minutes: Math.abs(this.now.getMinutes() - date.getMinutes()),
            seconds: Math.abs(this.now.getSeconds() - date.getSeconds())
        };
    }

    componentDidMount() {
        if (this.props.time < this.now.getTime()) {
            this.startTimerToUp()
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimerToUp() {
        this.timer = setInterval(() => {

            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }))

            if (this.state.seconds >= 60) {
                this.setState(prevState => ({
                    minutes: prevState.minutes + 1,
                    seconds: 0
                }))
            }

            if (this.state.minutes >= 60) {
                this.setState(prevState => ({
                    hours: prevState.hours + 1,
                    minutes: 0,
                    seconds: 0
                }))
            }

        }, 1000)
    }

    leadingZero(i) {
        return (i < 10)? '0'+i : i;
    }

    render() {
        return (
            <div className="timer-container">
                <div className="timer-digits">
                    {`${this.leadingZero(this.state.hours)}:${this.leadingZero(this.state.minutes)}:${this.leadingZero(this.state.seconds)}`}
                </div>
            </div>
        );
    }
}

export default Timer;