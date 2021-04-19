import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import DmPage from "./components/DmPage";
import LoginPage from "./components/LoginPage";

//const URL = http://localhost:9393/
class App extends Component {
    state = {
        dmId: null,
    };

    setDmId = (dmId) => this.setState(dmId);

    render() {
        return (
            <Router>
                <div className="App">
                    {/* localhost:3000/dm/:campaign_id/:subpages */}
                    <Route
                        exact
                        path="/"
                        render={(routerProps) => (
                            <LoginPage {...routerProps} setDmId={this.setDmId} dmId={this.state.dmId} />
                        )}
                    />
                    <Route
                        exact
                        path="/dm"
                        render={(routerProps) => <DmPage {...routerProps} dmId={this.state.dmId} />}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
