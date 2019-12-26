import React, { Component } from "react";
import "./Home.css"
import List from "../../shared/elements/List/List";


class Home extends Component {

    render() {
        return (
            <div className="home-container">
               <List/>
            </div>
        );
    }
}

export default Home;