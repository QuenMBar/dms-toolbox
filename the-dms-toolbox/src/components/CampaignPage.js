import React, { Component, Fragment } from "react";
//styles

import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Paper } from "@material-ui/core";
import CharacterContainer from "./CharacterContainer";

//pages

import NoteCard from "./Notes/NoteCard";
import NoteForm from "./Notes/NoteForm";

const URL = "http://localhost:9393/campaign/";
const noteURL = "http://localhost:9393/note/";

class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campId: this.props.match.params.id,
            name: this.props.match.params.name,
            charNotes: [],
            qNotes: [],
            cNotes: [],
            radio: "campaign",
            text: "",
            helperText: "Select a field",
        };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        fetch(URL + this.state.campId)
            .then((r) => r.json())
            .then((notes) =>
                this.setState({
                    helperText: "Select a field",
                    qNotes: notes.qNotes,
                    cNotes: notes.cNotes,
                })
            )
            .catch((e) => console.error("e:", e));
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {/* <div>
                    <h1>Now showing campaign {this.state.name} </h1>
                </div> */}
                <div className={classes.notesDiv}>
                    <NoteForm
                        radio={this.state.radio}
                        helperText={this.state.helperText}
                        text={this.state.text}
                        handleSubmit={this.handleSubmit}
                        handleTextChange={this.handleTextChange}
                        handleRadioChange={this.handleRadioChange}
                    />
                    <Paper className={classes.root}>
                        <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                            <h2>Campaign Notes</h2>

                            {this.state.cNotes.map((note) => (
                                <GridListTile key={note.id} cols={1}>
                                    <NoteCard handleDele={this.handleDele} note={note} />
                                </GridListTile>
                            ))}

                            <h2>Quest Notes</h2>

                            {this.state.qNotes.map((note) => (
                                <GridListTile key={note.id} cols={1}>
                                    <NoteCard handleDele={this.handleDele} note={note} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Paper>
                </div>

                <CharacterContainer campId={this.state.campId} />
            </Fragment>
        );
    }

    //*deletes from the database and filters it out of state
    handleDele = (note) => {
        fetch(noteURL + note.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then(console.log)
            .catch((e) => console.error("e:", e));

        this.setState({
            qNotes: this.state.qNotes.filter((n) => n.id !== note.id),
            cNotes: this.state.cNotes.filter((n) => n.id !== note.id),
        });
    };

    //*Controls the radio button
    handleRadioChange = (event) => {
        this.setState({
            radio: event.target.value,
        });
    };

    //*Will optimistically render and update our server
    handleSubmit = (event, text) => {
        event.preventDefault();
        let newNote = this.makeNote(text);
        let value = this.state.radio;
        if (value == "quest") {
            let newNoteList = [...this.state.qNotes, newNote];
            this.setState(
                {
                    helperText: "Fetch the Scribe! I have a Quest!",
                    qNotes: newNoteList,
                },
                this.updateNote(newNote, event)
            );
        } else if (value == "campaign") {
            let newNoteList = [...this.state.cNotes, newNote];
            this.setState(
                {
                    helperText: "Interesting choice",
                    cNotes: newNoteList,
                },
                this.updateNote(newNote, event)
            );
        } else {
            let newNoteList = [...this.state.charNotes, newNote];
            this.setState({
                charNotes: newNoteList,
            });
        }
    };
    
    //*Post to our server and then resets the form
    updateNote = (newNote, event) => {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        };

        fetch(noteURL, configObj)
            .then((r) => r.json)
            .then(() => {
                this.getNotes();
                event.target.reset();
            })
            .catch((e) => console.error("e:", e));
    };
    //*creates a note obj that we can use for any of the char/camp/quest notes
    makeNote = (text) => {
        let timeStamp = new Date().toDateString();
        let newNote = {
            id: 0,
            text: text,
            title: this.state.radio,
            campId: this.props.match.params.id,
            created_at: timeStamp,
        };
        return newNote;
    };
}

const useStyles = (theme) => ({
    root: {
        "@global": {
            "*::-webkit-scrollbar": {
                width: "6px",
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
                "borderRadius": "5px",
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,96,100,.6)",
                borderRadius: "5px",
            },
        },
        "width": "95%",
        "height": "calc(99% - 170px)",
        "marginTop": 12,
        "position": "relative",
        "margin": "auto",
        "background": "rgba(120, 144, 156, .3)",
    },
    gridList: {
        width: "90%",
        height: "96%",
        top: "2%",
        position: "relative",
        left: "5.5%",
        textAlign: "left",
    },
    notesDiv: {
        width: "32vw",
        top: "80px",
        bottom: "1vh",
        position: "absolute",
        left: "1vw",
    },
});

export default withStyles(useStyles)(CampaignPage);
