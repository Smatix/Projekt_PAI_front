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
        this.loadData();
    }

    loadData= () => {
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
    };

    deleteReservation = id => {
        axios.delete(`${config.url}/api/user/reservations/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Usunięto rezerwację');
                this.loadData();
            })
            .catch(err => {
                toast.error('Problem z usunięciem rezerwacji');
            })
    };

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
                                deleteClick={() => this.deleteReservation(el.id)}
                            />
                        })
                    }
                />
            </div>
        );
    }
}

export default Reservations;