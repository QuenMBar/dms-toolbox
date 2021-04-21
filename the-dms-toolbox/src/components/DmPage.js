import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";
import Error from "./Error";
import CharacterContainer from "./CharacterContainer";

const URL = "http://localhost:9393/dm/";

export default class DmPage extends Component {
    constructor(props) {
        super(props);
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
        //Todo[]make a button that will add a campaign
        return (
            <Fragment>
                {this.props.dmId === undefined ? <Redirect to="/" /> : null}
                <Navbar />
                <Switch>
                    <Route path="/dm/:id" component={CampaignPage}></Route>
                    <CampList camps={this.state.camps} />
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
                {/* <CharacterContainer /> */}
            </Fragment>
        );
    }
}
