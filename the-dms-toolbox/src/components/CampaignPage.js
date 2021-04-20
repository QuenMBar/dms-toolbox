import React, { Component } from "react";
import { useParams } from "react-router-dom";
// Maybe check for logged in.  Using the dm id and campaign id, grab the correct campaign info
// Load in all the campaign components and stuff

const CampaignPage =()=> {
    console.log(useParams());
        return (
          <div>
            <h1>Hello</h1>
          </div>
        );
    
}

export default CampaignPage;