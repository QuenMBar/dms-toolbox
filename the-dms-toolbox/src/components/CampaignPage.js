import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Maybe check for logged in.  Using the dm id and campaign id, grab the correct campaign info
// Load in all the campaign components and stuff

const URL = "http://localhost:9393/campaign/";

const getCampaign = (id) => {
  fetch(URL+id)
    .then((r) => r.json())
    .then(console.log)
    .catch((e) => console.error("e:", e));
};

const CampaignPage = () => {
  const [name, setName] = useState("default name");
  const { id } = useParams();

  useEffect((id) => {
    getCampaign(id);
  }, []);

  return <div>Now showing campaign {name}</div>;
};

export default CampaignPage;
