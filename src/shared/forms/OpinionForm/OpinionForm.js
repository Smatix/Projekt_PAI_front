import React, { Component } from "react";
import axios from "axios";
import config from "../../../config";
import {toast} from "react-toastify";
import FormField from "../FormField/FormField";
import ConfirmBtn from "../../buttons/ConfirmBtn/ConfirmBtn";
import SelectField from "../SelectField/SelectField";

class OpinionForm extends Component {

    state = {
        comment: "",
        rate: 5,
        parkingId: this.props.parking
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    addOpinion = () => {
        const data = this.state;
        axios.post(`${config.url}/api/opinions`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(res => {
                toast.success('Dodano opinię');
            })
            .catch(err => {
                toast.error('Problem z dodaniem opini');
            })
    };

    render() {
        return (
            <div>
                <SelectField
                    label="Wybierz ocenę"
                    name={"rate"}
                    change={this.handleChange}
                    options={[
                        {name: "5", "value": 5},
                        {name: "4", "value": 4},
                        {name: "3", "value": 3},
                        {name: "2", "value": 2},
                        {name: "1", "value": 1},
                    ]}
                />
                <FormField
                    label="Komentarz"
                    type="text"
                    name={"comment"}
                    value={this.state.comment}
                    change={this.handleChange}
                />
                <ConfirmBtn
                    text="Dodaj opinię"
                    click={this.addOpinion}
                />
            </div>
        );
    }
}

export default OpinionForm;