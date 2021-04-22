import React, { Component} from "react";
//styles
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CharacterCard from "./CharacterCard";
import { Paper, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blueGrey from "@material-ui/core/colors/blueGrey";
//pages

//import NoteForm from "./Notes/NoteForm";
import NoteCard from "./Notes/NoteCard";
import NoteForm from "./Notes/NoteForm";

const URL = "http://localhost:9393/campaign/";

class CampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campId: this.props.match.params.id,
      name: this.props.match.params.name,
      qNotes: [],
      cNotes: [],
      radio: "",
      text: "",
      helperText: "Select a field",
    };
  }

  componentDidMount() {
    fetch(URL + this.state.campId)
      .then((r) => r.json())
      .then((notes) => this.updateNotes(notes))
      .catch((e) => console.error("e:", e));
  }

  updateNotes = (notes) => {
    this.setState({
      qNotes: notes.qNotes,
      cNotes: notes.cNotes,
    });
  };

  render() {
    console.log(this.state.campId);
    const { classes } = this.props;
    return (
      <>
        <div>
          <h1>Now showing campaign {this.state.name} </h1>
        </div>
        <NoteForm
          radio={this.state.radio}
          helperText={this.state.helperText}
          handleSubmit={this.handleSubmit}
          handleTextChange={this.handleTextChange}
          handleRadioChange={this.handleRadioChange}
        />
        <Paper className={classes.root}>
          <GridList cellHeight='auto' className={classes.gridList} cols={1}>
            <h2>Campaign Notes</h2>

            {this.state.cNotes.map((note) => (
              <GridListTile cols={1}>
                <NoteCard key={note.id} note={note} />
              </GridListTile>
            ))}

            <h2>Quest Notes</h2>

            {this.state.qNotes.map((note) => (
              <GridListTile cols={1}>
                <NoteCard key={note.id} note={note} />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </>
    );
  }

  //Controls the text input
  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }
  //Controls the radio button
  handleRadioChange = (event) => {
    this.setState({
      radio: event.target.value
    });
  };

  //Will optimistically render and update our server
  handleSubmit = (event) => {
    event.preventDefault();
    let newNote = makeNote();
    let newNoteList =
      let helper = {
        'character': 
      }
    this.setState({

    })
  };

  makeNote = () => {
    let timeStamp = new Date().toDateString();
    let newNote = {
      text: this.state.text,
      title: this.state.radio,
      campId: this.props.match.params.id,
      created_at: timeStamp,
    }
    return newNote;
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
    top: "2vh",
    position: "absolute",
    background: "rgba(120, 144, 156, .3)",
  },
  gridList: {
    width: "30vw",
    height: "90vh",
    top: "3vh",
    position: "absolute",
    right: "1.5vw",
    textAlign: "left",
  },
});

export default withStyles(useStyles)(CampaignPage);
