import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//styles 
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

//pages
import CampaignPage from "./CampaignPage";
import Navbar from "./Navbar";
import CampList from "./CampList";
import Error from "./Error";
import CharacterContainer from "./CharacterContainer";

const URL = "http://localhost:9393/dm/";

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

  handleEdit = (id) => {
    console.log(id);
  };

  handleDele = (id) => {
    console.log(id);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.props.dmId === undefined ? <Redirect to='/' /> : null}
        <Navbar />
        <Switch>
          <Route path='/dm/:name/:id' component={CampaignPage}></Route>

          <List
            className={classes.root}
            component='nav'
            aria-label='availible campaigns'
          >
            <CampList
              handleEdit={this.handleEdit}
              handleDele={this.handleDele}
              camps={this.state.camps}
            />
            <Divider />
            <Fab color='primary' aria-label='add'>
              <AddIcon onClick={this.addCamp} />
            </Fab>
          </List>

          <Route path='*'>
            <Error />
          </Route>
        </Switch>

        {/* <CharacterContainer /> */}
      </Fragment>
    );
  }
}


const useStyles = (theme) => ({
  root: {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "6px",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        borderRadius: "5px",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,96,100,.6)",
        borderRadius: "5px",
      },
    },
    width: "33vw",
    height: "96vh",
    position: "absolute",
    background: "rgba(120, 144, 156, .3)",
    left: "50%",
    top: "60vh",
    transform: "translate(-50%, -50%)",
  },
});

export default withStyles(useStyles)(DmPage);