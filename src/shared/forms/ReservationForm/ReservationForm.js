import React, { Component } from "react";
import "./ReservationForm.css"
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import FormField from "../FormField/FormField";
import ConfirmBtn from "../../buttons/ConfirmBtn/ConfirmBtn";
import SelectField from "../SelectField/SelectField";

class ReservationForm extends Component {

    state = {
        data: {
            reservationDate: "",
            type: "car",
            parkingId: this.props.parking,
        },
        error: {
            reservationDate: "",
            type: "",
            parkingId: ""
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        this.setState(prevState => {
            return {
                data: {...prevState.data, [name]: value},
                error: {...prevState.error, [name]: ""}
            }
        })
    };

    confirmReservation = () => {
        const data = this.state.data;
        axios.post(`${config.url}/api/reservations`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Rezerwacja dodana');
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.setState(prevState => {
                        return {
                            error: {
                                ...prevState.error,
                                ...err.response.data
                            }
                        }
                    });
                } else {
                    toast.error('Problem z wykonaniem rezerwacji');
                }
            })
    };

    render() {
        return (
            <div className="reservation-form-container">
                <div>Rezerwuj</div>
                <FormField
                    label="Data rezerwacji"
                    type="date"
                    name={"reservationDate"}
                    value={this.state.data.date}
                    change={this.handleChange}
                    error={this.state.error.reservationDate}
                />
                <SelectField
                    label="Wybierz pojazd"
                    name={"type"}
                    change={this.handleChange}
                    options={[
                        {name: "Samochód", "value": "car"},
                        {name: "Motocykl", "value": "motorbike"}
                    ]}
                    error={this.state.error.type}
                />
                <ConfirmBtn
                    text="Rezerwuj"
                    click={this.confirmReservation}
                />
            </div>
        );
    }
}

export default ReservationForm;