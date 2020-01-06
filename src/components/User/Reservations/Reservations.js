import React, { Component } from "react";
import "./Reservations.css"
import List from "../../../shared/elements/List/List";
import Reservation from "../../../shared/list_element/Reservation";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";


class Reservations extends Component {

    state = {
        reservations: []
    };

    componentDidMount() {
        axios.get(`${config.url}/api/user/reservations/finished`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    reservations: res.data,
                });
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    }

    render() {
        return (
            <div className="reservations-container">
                <List
                    title="Historia rezerwacji"
                    list={
                        this.state.reservations.map(el => {
                            return <Reservation
                                key={el.id}
                                element={el}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default Reservations;