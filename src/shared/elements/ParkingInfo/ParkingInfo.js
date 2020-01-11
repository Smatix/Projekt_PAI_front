import React, { Component } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import config from "../../../config";
import Loader from "../Loader/Loader";
import StarRate from "../StarRate/StartRate";
import "./ParkingInfo.css"

import OpinionForm from "../../forms/OpinionForm/OpinionForm";

class ParkingInfo extends Component {

    state = {
        parking: null
    };

    dayInWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    componentDidMount() {
        axios.get(`${config.url}/api/parkings/${this.props.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                this.setState({
                    parking: res.data,
                })

            })
            .catch(err => {
                if (err.response.status === 404) {
                    toast.error('Nie znaleziono parkingu');
                } else {
                    toast.error('Problem z pobraniem danych');
                }
            })
    }

    render() {
        const p = this.state.parking;
        return (
            <div className="parking-info-container">
                {this.state.parking ?
                    <div>
                        <div style={{fontSize: '1em'}}>{p.name}</div>
                        <div style={{fontSize: '0.5em'}}>
                            <StarRate rate={p.rate}/>
                        </div>
                        <div style={{fontSize: '0.4em'}}>
                            {`ul ${p.street} ${p.number}, ${p.city} ${p.postCode}`}
                        </div>
                        <h2 style={{fontSize: '1em'}}>Liczba miejsc</h2>
                        {p.parkingSpace.map((el, index) => {
                            if (el.type === "car") {
                                return (
                                    <p key={index} style={{fontSize: '0.4em'}}>
                                        {`Samochód: ${el.count} miejsc`}
                                    </p>
                                )
                            }
                        })}
                        {p.parkingSpace.map((el, index) => {
                            if (el.type === "motorbike") {
                                return (
                                    <p key={index} style={{fontSize: '0.4em'}}>
                                        {`Motocykl: ${el.count} miejsc`}
                                    </p>
                                )
                            }
                        })}
                        <h2 style={{fontSize: '1em'}}>Cennik</h2>
                        <div style={{fontSize: '0.5em'}}>Samochód:</div>
                        {p.priceList.map((el, index) => {
                            if (el.type === "car") {
                                return (
                                    <p key={index} style={{fontSize: '0.4em'}}>
                                        {`${el.price} zł/${el.period}${el.unit}`}
                                    </p>
                                )
                            }
                        })}
                        <div style={{fontSize: '0.5em'}}>Motocykl:</div>
                        {p.priceList.map((el, index) => {
                            if (el.type === "motorbike") {
                                return (
                                    <p key={index} style={{fontSize: '0.4em'}}>
                                        {`${el.price} zł/${el.period}${el.unit}`}
                                    </p>
                                )
                            }
                        })}
                        <h2 style={{fontSize: '1em'}}>Godziny otwarcia</h2>
                        {p.openingHours.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p style={{fontSize: '0.5em'}}>{this.dayInWeek[item.day]}:</p>
                                    <p style={{fontSize: '0.4em'}}>
                                        {`${item.open} - ${item.close}`}
                                    </p>
                                </div>
                            )
                        })}
                        <h2 style={{fontSize: '1em'}}>Dodaj opinię</h2>
                        <OpinionForm parking={p.id}/>
                    </div> : <Loader/>}
            </div>
        )
    }
}

export default ParkingInfo;