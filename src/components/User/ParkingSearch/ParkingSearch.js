import React, { Component } from "react";
import "./ParkingSearch.css"
import { Map, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "./marker-icon.png";
import marker2 from "./marker-icon2.png";
import Parking from "../../../shared/list_element/Parking";
import Loader from "../../../shared/elements/Loader/Loader";
import SearchForm from "../../../shared/forms/SearchForm/SearchForm";
import PopUp from "../../../shared/elements/PopUp/PopUp";

class ParkingSearch extends Component {

    state = {
        parkings: [
            {
                name: "Parking przy słowaku",
                street: "Aleja Legionów",
                number: 0,
                city: "Kielce",
                rate: 15,
                car: 34,
                price: "free",
                position: [50.860179, 20.621567],
                pick: 0
            },
            {
                name: "Dom",
                street: "Orkana",
                number: 40,
                city: "Kielce",
                rate: 4,
                car: 34,
                price: 2,
                position: [50.8958751, 20.6419071],
                pick: 0
            },
            {
                name: "Pqrking 1a",
                street: "Orkana",
                number: 40,
                city: "Kielce",
                rate: -7,
                car: 34,
                price: 2,
                position: [50.893754, 20.641937],
                pick: 0
            },
            {
                name: "PArking 2a",
                street: "Orkana",
                number: 40,
                city: "Kielce",
                rate: 4,
                car: 34,
                price: 2,
                position: [50.897732, 20.642974],
                pick: 0
            },
            {
                name: "Pqrking 1a",
                street: "Orkana",
                number: 40,
                city: "Kielce",
                rate: 4,
                car: 34,
                price: 2,
                position: [50.894454, 20.641937],
                pick: 0
            },
            {
                name: "PArking 2a",
                street: "Orkana",
                number: 40,
                city: "Kielce",
                rate: 4,
                car: 34,
                price: 2,
                position: [50.896632, 20.642974],
                pick: 0
            }
        ]
    };
    icon = L.icon({
        iconUrl: marker,
        iconSize: [25, 50],
        iconAnchor: [22, 49],
        popupAnchor: [-6, -55],
    });
    icon2 = L.icon({
        iconUrl: marker2,
        iconSize: [25, 50],
        iconAnchor: [22, 49],
        popupAnchor: [-6, -55],
    });

    selectMarker = i => {
        const updatedParks = this.state.parkings.map((item, index) => {
            if (i === index) {
                return {...item, pick: 1}
            } else {
                return item
            }
        });
        this.setState({
            parkings: updatedParks
        })
    };

    unselectMarker = i => {
        const updatedParks = this.state.parkings.map((item, index) => {
            if (i === index) {
                return {...item, pick: 0}
            } else {
                return item
            }
        });
        this.setState({
            parkings: updatedParks
        })
    };

    render() {
        return (
            <div className="parking-search-container">
                <div className="search">
                    <SearchForm
                        placeholder="Wpisz miasto"
                        onSearch={() => this.showPopUp}
                    />
                </div>
                <div className="map-toggle">
                    <div className="map-toggle-btn">
                        <i className="fas fa-list"></i>
                    </div>
                    <div className="map-toggle-btn">
                        <i className="fas fa-map"></i>
                    </div>
                </div>
                <div className="parking-list-container">
                    <div className="buttons-container">
                        <i className="fas fa-sort" >Sort</i>
                        <i className="fas fa-filter">Filtr</i>
                    </div>
                    {this.state.parkings.map((el, index) => {
                        return <Parking
                            element={el}
                            mouseOver={() => {this.selectMarker(index)}}
                            mouseOut={() => {this.unselectMarker(index)}}
                        />
                    })}
                </div>
                <div className="parking-map-container">
                    <Map center={[50.895854, 20.641937]} zoom={16}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {this.state.parkings.map((el, index) => {
                            return (
                                <Marker
                                    position={el.position}
                                    icon={el.pick ? this.icon2 : this.icon}
                                    onMouseOver={() => {this.selectMarker(index)}}
                                    onMouseOut={() => {this.unselectMarker(index)}}
                                >
                                    <Popup>
                                        <p>HoHo</p>
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </Map>
                </div>
            </div>
        );
    }
}

export default ParkingSearch;