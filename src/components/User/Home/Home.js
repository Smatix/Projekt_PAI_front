import React, { Component } from "react";
import "./Home.css"
import List from "../../../shared/elements/List/List";
import StarRate from "../../../shared/elements/StarRate/StartRate";
import FormField from "../../../shared/forms/FormField/FormField";
import axios from "axios";
import config from "../../../config";


class Home extends Component {

    render() {
        return (
            <div className="home-container">
               Witaj na koncie
            </div>
        );
    }
}

export default Home;