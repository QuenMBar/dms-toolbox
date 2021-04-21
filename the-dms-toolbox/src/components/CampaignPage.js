import React, { Component, Fragment } from "react";
import { useParams } from "react-router-dom";
// Maybe check for logged in.  Using the dm id and campaign id, grab the correct campaign info
// Load in all the campaign components and stuff

const URL = "http://localhost:9393/campaign/";



class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campId: this.props.match.params.id,
      name: "Default",
    };
  }

  componentDidMount() {
    if (this.state.campId !== undefined) {
      this.getCampaign();
    }
  }

  getCampaign = (id) => {
    fetch(URL + id)
      .then((r) => r.json())
      .then(console.log)
      .catch((e) => console.error("e:", e));
  };

  render() {
    
    return <div>Now showing campaign {this.state.name} </div>;
  }
}

export default CampaignPage;
