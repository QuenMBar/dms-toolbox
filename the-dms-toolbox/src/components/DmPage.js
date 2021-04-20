import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CampaignPage from "./CampaignPage";

// Check for logged in, if not, reroute to login page
// If logged in query database for dm info, and the campaigns they run
// Populate a drop down with the campaigns they can chose from
// On selection, navigate to the correct page

export default class DmPage extends Component {
    dummyData = [
        { name: "camp1", id: 0 },
        { name: "camp2", id: 1 },
        { name: "camp3", id: 2 },
    ];
    render() {
        return (
            <Router>
                <div className="App">
                    {this.props.dmId ? this.props.dmId : "Null"}
                    {/* localhost:3000/:dm_id/:campaign_id/:subpages */}
                    {this.dummyData.map((camp, i) => (
                        <Route
                            key={i}
                            path={`/dm/${camp.id}`}
                            render={(routerProps) => <CampaignPage {...routerProps} camp={camp} />}
                        />
                    ))}
                </div>
            </Router>
        );
    }
}
