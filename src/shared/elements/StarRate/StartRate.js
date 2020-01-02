import React, { Component } from "react";
import "./StarRate.css"

class StarRate extends Component {

    stars = [0,0,0,0,0];

    getFilledStars() {
        if (this.props.rate < 0) return 0;
        if (this.props.rate > 5) return 5;
        return Math.floor(this.props.rate);
    }

    fillStars() {
        let countOfFilledStars = this.getFilledStars();
        for (let i = 0; i < countOfFilledStars; i++) {
            this.stars[i] = 1;
        }
        return this.stars.map(el => {
            if (el) {
                return (
                    <i className="fas fa-star" style={{color: "#ffcc00"}}></i>
                );
            } else {
                return (
                    <i className="fas fa-star" style={{color: "#fff0b3"}}></i>
                );
            }
        })
    };

    render() {
        return (
            <div className="stars-container">
                {this.fillStars()}
            </div>
        );
    }
}

export default StarRate;