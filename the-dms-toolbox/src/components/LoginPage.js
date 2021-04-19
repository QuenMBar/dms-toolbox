import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
// Login, sends a get request to the back end with a username and password
// Backend validates the request and either sends back the associated id or -1
// On not -1, set app.js dmid state and navigate to path /dm

export default class LoginPage extends Component {
    state = {
        username: "",
        password: "",
        loggedIn: false,
    };

    updateUser = (e) => this.setState({ username: e.target.value });
    updatePass = (e) => this.setState({ password: e.target.value });

    submitForm = (e) => {
        e.preventDefault();
        // let user = {
        //     name: this.state.username,
        //     password: this.state.password,
        // };

        // let configObj = {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(user),
        // };

        fetch(`http://127.0.0.1:9393/check_login?username=${this.state.username}&password=${this.state.password}`)
            .then((res) => res.json)
            .then((res) => {
                if (res.id !== null) {
                    this.props.setDmId(res.id);
                    this.setState({ loggedIn: true });
                } else {
                    this.setState({ password: "" });
                    // TODO: Display error
                }
            })
            .catch((e) => console.error("e: ", e));
    };

    render() {
        return (
            <Fragment>
                {this.state.loggedIn ? <Redirect to="/dm" /> : null}
                <form onSubmit={this.submitForm}>
                    <input type="text" value={this.state.username} onChange={this.updateUser}></input>
                    <input type="password" value={this.state.password} onChange={this.updatePass}></input>
                    <input type="submit"></input>
                </form>
            </Fragment>
        );
    }
}
