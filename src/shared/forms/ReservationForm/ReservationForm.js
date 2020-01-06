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
        reservationDate: "",
        type: "car",
        parkingId: this.props.parking
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    confirmReservation = () => {
        const data = this.state;
        axios.post(`${config.url}/api/reservations`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Rezerwacja dodana');
            })
            .catch(err => {
                toast.error('Problem z wykonaniem rezerwacji');
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
                    value={this.state.date}
                    change={this.handleChange}
                />
                <SelectField
                    label="Wybierz pojazd"
                    name={"type"}
                    change={this.handleChange}
                    options={[
                        {name: "Samochód", "value": "car"},
                        {name: "Motocykl", "value": "motorbike"}
                    ]}
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