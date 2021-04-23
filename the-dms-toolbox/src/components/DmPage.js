import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//styles
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";
import Error from "./Error";

const URL = "http://localhost:9393/dm/";
const campURL = "http://localhost:9393/campaign/";

class DmPage extends Component {
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

  addCamp = () => {
    const newCamp = {
      id: 0,
      name: "Add a name",
    };
    this.setState({
      camps: [...this.state.camps, newCamp],
    });
  };

  handleSave = (id, name) => {
      console.log(id)
      if (id != 0) {
      this.handleCamp(campURL, id, name, "PATCH");
    } else {
      this.handleCamp(URL, this.state.id, name, "POST");
    }
  };

    handleCamp = (url, id, name, method) => {
      console.log(id)
    const configObj = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        dmId: this.state.id,
      }),
    };

    fetch(url + id, configObj)
      .then((r) => r.json())
      .then(this.getDM())
      .catch((e) => console.error("e:", e));
  };

  handleDele = (id) => {
    this.setState(
      {
        camps: this.state.camps.filter((c) => c.id !== id),
      },
      this.persistDele(id)
    );
  };

  persistDele = (id) => {
    fetch(campURL + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(this.getDM)
      .catch((e) => console.error("e:", e));
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.props.dmId === undefined ? <Redirect to='/' /> : null}
        <Navbar logout={this.props.logout} />
        <Switch>
          <Route path='/dm/:name/:id' component={CampaignPage}></Route>

          <List
            className={classes.root}
            component='nav'
            aria-label='available campaigns'
          >
            {this.state.camps.map((c) => {
              return (
                <CampList
                  handleSave={this.handleSave}
                  handleDele={this.handleDele}
                  camp={c}
                />
              );
            })}
            <Fab className={classes.add} color='primary' aria-label='add'>
              <AddIcon onClick={this.addCamp} />
            </Fab>
          </List>

          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    width: "33vw",
    left: "33vw",
    height: "fit-content",
    background: "rgba(120, 144, 156, .3)",
    marginTop: 100,
    marginBottom: 200,
    paddingBottom: 50,
    position: "absolute",
  },
  add: { marginTop: 25 },
});

export default withStyles(useStyles)(DmPage);
