import React, { Component } from "react";
import "./ParkingSearch.css"
import { Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {isMobile} from "react-device-detect";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "./marker-icon.png";
import marker2 from "./marker-icon2.png";
import Parking from "../../../shared/list_element/Parking";
import Loader from "../../../shared/elements/Loader/Loader";
import SearchForm from "../../../shared/forms/SearchForm/SearchForm";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import StarRate from "../../../shared/elements/StarRate/StartRate";

class ParkingSearch extends Component {

    centerPosition = [50.061053, 19.937462]; // Center of Cracow

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

    constructor(props) {
        super(props);
        let displayList = true;
        let displayMap= true;
        if (isMobile) {
            displayMap = false;
        }
        this.state = {
            displayList: displayList,
            displayMap: displayMap,
            mapLoaded: false,
            listLoaded: false,
            searching: false,
            search: "",
            parkings: []
        };
    }

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

    displayMap = () => {
        this.setState(prevState => {
            return {
                displayList: false,
                displayMap: true,
            }
        })
    };

    displayList = () => {
        this.setState(prevState => {
            return {
                displayList: true,
                displayMap: false,
            }
        })
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
                    <div className="map-toggle-btn" onClick={this.displayList} style={this.state.displayList ? {backgroundColor: '#a6a6a6'} : null}>
                        <i className="fas fa-list"></i>
                    </div>
                    <div className="map-toggle-btn" onClick={this.displayMap} style={this.state.displayMap ? {backgroundColor: '#a6a6a6'} : null}>
                        <i className="fas fa-map"></i>
                    </div>
                </div>
                {(this.state.searching && this.state.displayList) ?
                <div className="parking-list-container">
                    {this.state.listLoaded ? this.getList() : <Loader/>}
                </div> : null}
                {(this.state.searching && this.state.displayMap) ?
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