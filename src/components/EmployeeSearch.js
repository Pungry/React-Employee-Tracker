import React, { Component } from 'react'
import SearchForm from "./SearchForm"
import ResultList from "./ResultList"
import API from "../utils/API";

export default class EmployeeSearch extends React.Component {

    state = {
        search: "",
        results: [],
        displayUsers: []
    };

    componentDidMount() {
        //call the function that searches the API to search for 200 employees by default
        this.searchUsers(200);
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
    };

    //Sorts alphabetically by first name
    alphaSort = () => {
        this.setState({results: this.state.results.sort((a, b) => a.name.first.localeCompare(b.name.first))})
    }
    //this kind of works, but it filters the NEXT set of results instead of the CURRENT set of results
    filterRes = () => {
        let filteredRes = [];
        this.state.results.forEach(element => {
            if(element.name.first.includes(this.state.search) || element.name.last.includes(this.state.search))
            {
                filteredRes.push(element)
            }
        });
        this.setState({displayUsers: filteredRes})
    }

    // When the form is submitted, filter the Results for all users with the string in their first or last name
    handleFormSubmit = event => {
        event.preventDefault();
        this.filterRes();
    };

    //function that calls the API search here
    searchUsers = query => {
        API.search(query).then(res => {
            this.setState({results: res.data.results,
                            displayUsers: res.data.results})
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <header><h1>Employee Tracker</h1></header>
                <hr />
                <SearchForm
                search={this.state.search}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                />
                <button className="btn btn-primary" onClick={this.alphaSort}>Sort Alphabetically by Name</button>
                <table className="table">
                <ResultList results={this.state.displayUsers} />
                </table>
            </div>
        )
    }
}
