import React, { Component } from "react";
// Maybe check for logged in.  Using the dm id and campaign id, grab the correct campaign info
// Load in all the campaign components and stuff

export default class CampaignPage extends Component {
    render() {
        return <div>{this.props.camp.name}</div>;
    }
}
