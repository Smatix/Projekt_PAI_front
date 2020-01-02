import React, { Component } from "react";
import "./SearchForm.css"

class SearchForm extends Component {

    render() {
        return (
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    className="search-field"
                    placeholder={this.props.placeholder}
                    onChange={this.props.change}
                />
                <i className="fas fa-search" onClick={this.props.onSearch}></i>
            </div>
        );
    }
}

export default SearchForm;