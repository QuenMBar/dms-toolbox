import React, { Component } from "react";
//router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//css
import "./App.css";

//pages
import DmRouter from "./components/DmRouter";
import LoginPage from "./components/LoginPage";
import Error from "./components/Error";

//const URL = http://localhost:9393/
class App extends Component {
    state = {
        dmId: null,
    };

    setDmId = (dmId) => this.setState(dmId);

    render() {
        return (
          <Router>
            <div className='App'>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={(routerProps) => (
                    <LoginPage
                      {...routerProps}
                      setDmId={this.setDmId}
                      dmId={this.state.dmId}
                    />
                  )}
                />
                <Route
                  path='/dmr'
                  render={(routerProps) => (
                    <DmRouter {...routerProps} dmId={this.state.dmId} />
                  )}
                />

                <Route path='*'>
                  <Error />
                </Route>
              </Switch>
            </div>
          </Router>
        );
    }
}

export default App;
