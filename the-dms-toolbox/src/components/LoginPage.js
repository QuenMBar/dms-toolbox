import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Button, TextField, Paper } from "@material-ui/core";
// Login, sends a get request to the back end with a username and password
// Backend validates the request and either sends back the associated id or -1
// On not -1, set app.js dmid state and navigate to path /dm

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  updateUser = (e) => this.setState({ username: e.target.value });
  updatePass = (e) => this.setState({ password: e.target.value });

  submitForm = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:9393/check_login`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id !== undefined) {
          this.props.setDmIdAndName(res.id, res.name);
        } else {
          this.setState({ password: "" });
          // TODO: Display error
        }
      })
      .catch((e) => {
        this.setState({ password: "" });
        // TODO: Display (bigger?) error
        console.error("e: ", e);
      });
  };

  render() {
    return (
      <Fragment>
        {this.props.dmId !== undefined ? <Redirect to='/dm' /> : null}
        <Paper
          component='form'
          onSubmit={this.submitForm}
          className='loginPaper'
        >
          {/* <input type="text" value={this.state.username} onChange={this.updateUser}></input> */}
          <TextField
            id='username'
            label='username'
            value={this.state.username}
            onChange={this.updateUser}
            className='loginUser'
          />
          <br />
          <TextField
            type='password'
            id='password'
            label='password'
            value={this.state.password}
            onChange={this.updatePass}
            className='loginPass'
          />
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='loginBttn'
          >
            Log In
          </Button>
        </Paper>
      </Fragment>
    );
  }
}
