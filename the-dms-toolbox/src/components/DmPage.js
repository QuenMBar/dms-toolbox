import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";
import Error from "./Error";

const URL = "http://localhost:9393/dm/";

export default class DmPage extends Component {
    constructor(props) {
        super(props);
        console.log(props.dmId);

        this.state = {
            id: props.dmId,
            camps: [],
        };
    }

    componentDidMount() {
        if (this.state.id !== undefined) {
            this.getDM();
        }
    }

    getDM = () => {
        fetch(`${URL}${this.state.id}`)
            .then((res) => res.json())
            .then((data) =>
                this.setState({
                    camps: data,
                })
            )
            .catch((e) => console.error("e:", e));
    };

    render() {
        //Todo[]make list prettier
        return (
            <div>
                {this.props.dmId === undefined ? <Redirect to="/" /> : null}
                <Navbar />
                <Switch>
                    <Route path="/campaign/:id" children={<CampaignPage />}></Route>
                    <CampList camps={this.state.camps} />
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </div>
        );
    }
}
