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
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import StarRate from "../../../shared/elements/StarRate/StartRate";

class ParkingSearch extends Component {

    centerPosition = [50.895854, 20.641937];
    state = {
        mapLoaded: false,
        listLoaded: false,
        searching: false,
        search: "",
        parkings: [
            {
                name: "Parking przy słowaku",
                street: "Aleja Legionów",
                number: 0,
                city: "Kielce",
                rate: 15,
                car: 34,
                price: "free",
                lat: 50.860179,
                lng: 20.621567,
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
                lat: 50.8958751,
                lng: 20.6419071,
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
                lat: 50.893754,
                lng: 20.641937,
                pick: 0
            },
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

    getList = () => {
        return this.state.parkings.map((el, index) => {
            return <Parking
                key={el.id}
                element={el}
                mouseOver={() => {this.selectMarker(index)}}
                mouseOut={() => {this.unselectMarker(index)}}
            />
        });
    };

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

    handleMoveMap = event => {
        const bounds = event.target.getBounds();
        //console.log(`North: ${bounds.getNorth()} East: ${bounds.getEast()} South: ${bounds.getSouth()} West: ${bounds.getWest()}`);
        this.setState({
            listLoaded: false
        });
        const coords = {
            north: bounds.getNorth(),
            east: bounds.getEast(),
            south: bounds.getSouth(),
            west: bounds.getWest()
        };
        //console.log(JSON.stringify(coords));
        axios.post(`${config.url}/api/parkings/coordinate`, coords, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                const newParks = res.data.map(item => {
                    return {...item, pick: 0}
                });
                this.setState({
                    parkings: newParks,
                    listLoaded: true
                })

            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    };

    handleSearchChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSearch = () => {
        const city = this.state.search;
        this.setState({
            searching: true,
            listLoaded: false,
            mapLoaded: false,
        });
        axios.get(`${config.url}/api/parkings/search?city=${city}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                const newParks = res.data.map(item => {
                    return {...item, pick: 0}
                });
                this.setState({
                    parkings: newParks,
                    listLoaded: true,
                    mapLoaded: true
                });
                this.centerPosition = [this.state.parkings[0].lat, this.state.parkings[0].lng];
            })
            .catch(err => {
                toast.error('Problem z pobraniem danych');
            })
    };

    render() {
        return (
            <div className="parking-search-container">
                <div className="search">
                    <SearchForm
                        placeholder="Wpisz miasto"
                        onSearch={this.handleSearch}
                        change={this.handleSearchChange}
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
                {this.state.searching ?
                <div className="parking-list-container">
                    <div className="buttons-container">
                        <i className="fas fa-sort" >Sort</i>
                        <i className="fas fa-filter">Filtr</i>
                    </div>
                    {this.state.listLoaded ? this.getList() : <Loader/>}
                </div> : null}
                {this.state.searching ?
                <div className="parking-map-container">
                    { this.state.mapLoaded ?
                    <Map
                        center={this.centerPosition}
                        zoom={13}
                        onMoveend={this.handleMoveMap}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {this.state.parkings.map((el, index) => {
                            return (
                                <Marker
                                    key={el.id}
                                    position={[el.lat, el.lng]}
                                    icon={el.pick ? this.icon2 : this.icon}
                                    onMouseOver={() => {this.selectMarker(index)}}
                                    onMouseOut={() => {this.unselectMarker(index)}}
                                >
                                    <Popup>
                                        <div>{el.name}</div>
                                        <div>{`ul ${el.street} ${el.number}, ${el.city}`}</div>
                                        <div>
                                            <StarRate rate={el.rate}/>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </Map> : <Loader/>}
                </div> : null}
            </div>
        );
    }
}

export default ParkingSearch;