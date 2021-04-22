import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { Button, TextField, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
    loginDiv: {
        paddingTop: 20,
    },
    username: {
        margin: 10,
        width: 300,
    },
    password: {
        margin: 10,
        width: 300,
    },
    bttn: {
        margin: 10,
        width: 140,
    },
    title: { paddingTop: 20 },
    loginPaper: {
        height: "300px",
        width: "600px",
        margin: "auto",
        marginTop: "20vh",
        ["@media (max-width:760px)"]: {
            width: "auto",
        },
    },
});

class LoginPage extends Component {
    state = {
        username: "",
        password: "",
    };

    updateUser = (e) => this.setState({ username: e.target.value });
    updatePass = (e) => this.setState({ password: e.target.value });

    submitForm = (e) => {
        fetch(`http://127.0.0.1:9393/check_login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "username": this.state.username,
                "password": this.state.password,
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

    signUp = () => {
        fetch(`http://127.0.0.1:9393/sign_up`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "username": this.state.username,
                "password": this.state.password,
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
        const { classes } = this.props;
        return (
            <Fragment>
                {this.props.dmId !== undefined ? <Redirect to="/dm" /> : null}
                <Paper className={classes.loginPaper}>
                    {/* <input type="text" value={this.state.username} onChange={this.updateUser}></input> */}
                    <Typography variant="h5" color="textSecondary" component="p" className={classes.title}>
                        Log In
                    </Typography>
                    <div className={classes.loginDiv}>
                        <TextField
                            className={classes.username}
                            id="username"
                            label="username"
                            value={this.state.username}
                            onChange={this.updateUser}
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            className={classes.password}
                            type="password"
                            id="password"
                            label="password"
                            value={this.state.password}
                            onChange={this.updatePass}
                            variant="outlined"
                        />
                        <br />
                        <Button className={classes.bttn} onClick={this.submitForm} variant="contained" color="primary">
                            Log In
                        </Button>
                        <Button className={classes.bttn} onClick={this.signUp} variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(LoginPage);
