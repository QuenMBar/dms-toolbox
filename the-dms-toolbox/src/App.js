import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DmPage from "./components/DmPage";
import LoginPage from "./components/LoginPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import red from "@material-ui/core/colors/red";

//const URL = http://localhost:9393/
// ?NOTE Theme Provider?
class App extends Component {
    state = {
        dmId: undefined,
        name: undefined,
    };

    setDmIdAndName = (dmId, name) => {
        this.setState({
            dmId: dmId,
            name: name,
        });
    };

    theme = createMuiTheme({
        palette: {
            primary: {
                main: cyan[200],
            },
            secondary: red,
        },
    });

    logout = () => {
        this.setDmIdAndName(undefined, undefined);
    };

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Router>
                    <div className="App">
                        <Route
                            exact
                            path="/"
                            render={(routerProps) => (
                                <LoginPage
                                    {...routerProps}
                                    setDmIdAndName={this.setDmIdAndName}
                                    dmId={this.state.dmId}
                                />
                            )}
                        />
                        <Route
                            path="/dm"
                            render={(routerProps) => (
                                <DmPage {...routerProps} logout={this.logout} dmId={this.state.dmId} />
                            )}
                        />
                    </div>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
