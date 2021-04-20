import React, { Component } from "react";
//router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";

// Check for logged in, if not, reroute to login page
// todo[] If logged in query database for dm info, and the campaigns they run
// todo[] Populate a drop down with the campaigns they can chose from
// todo[] On selection, navigate to the correct page

const URL = "http://localhost:9393/dm/";
export default class DmPage extends Component {
  state = {
    id: 8,
    camps: []
  };

  componentDidMount() {
    //fetch using the url+id of the dm that is in props
    //return the campaign names and campaign ids
    fetch(`${URL}${this.state.id}`)
      .then((res) => res.json())
      .then(data => this.setState({
        camps: data
      }))
      .catch((e) => console.error("e:", e));
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch/>
          <div className='App'>
            {this.state.camps.map((camp, i) => (
              <Route
                key={i}
                path={`/dm/${camp.name}/${camp.id}`}
                render={(routerProps) => (
                  <CampaignPage {...routerProps} camp={camp} />
                )}
              />
            ))}
          </div>
          <Switch/>
        </Router>
        <CampList camps={this.state.camps}/>
      </>
    );
  }
}
