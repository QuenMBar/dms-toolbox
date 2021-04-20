import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import DmPage from "./components/DmPage";
import LoginPage from "./components/LoginPage";
import Error from "./components/Error";

//const URL = http://localhost:9393/
class App extends Component {
    state = {
        dmId: null,
        name: null,
    };

    setDmIdAndName = (dmId, name) => {
        this.setState({
            dmId: dmId,
            name: name,
        });
    };

    render() {
        return (
          <Router>
            <Switch>
              <div className='App'>
                {/* localhost:3000/dm/:campaign_id/:subpages */}
                <Route
                  exact
                  path='/'
                  render={(routerProps) => (
                    <LoginPage
                      {...routerProps}
                      setDmIdAndName={this.setDmIdAndName}
                      dmId={this.state.dmId}
                    />
                  )}
                />
                <Route
                  exact
                  path='/dm'
                  render={(routerProps) => (
                    <DmPage {...routerProps} dmId={this.state.dmId} />
                  )}
                />
              </div>
              <Route path='*'>
                <Error />
              </Route>
            </Switch>
          </Router>
        );
    }
}

export default App;
