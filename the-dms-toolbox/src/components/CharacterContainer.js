import React, { Component, Fragment } from "react";
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
        "width": "33vw",
        "height": "96vh",
        "top": "2vh",
        "position": "absolute",
        "right": "2vw",
        "background": "rgba(120, 144, 156, .3)",
    },
    gridList: {
        width: "90%",
        height: "93%",
        top: "3.5%",
        position: "relative",
        left: "5%",
        textAlign: "left",
    },
});

class CharacterContainer extends Component {
    state = {
        characters: [],
    };

    // TODO: Replace with camp id
    componentDidMount() {
        fetch(`http://127.0.0.1:9393/characters?campId=${this.props.campId}`)
            .then((res) => res.json())
            .then((characters) => {
                characters = this.sanitizeResponse(characters);
                this.setState({ characters: characters });
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    }

    sanitizeResponse = (characters) => {
        for (let o of characters) {
            if (typeof o !== "object") continue;
            for (let k in o) {
                if (k == "items" || k == "notes") {
                    for (let o2 of o[k]) {
                        if (typeof o2 !== "object") continue;
                        for (let k2 in o2) {
                            if (!o2.hasOwnProperty(k2)) continue;
                            let v2 = o2[k2];
                            if (v2 === null || v2 === undefined) {
                                o2[k2] = "";
                            }
                        }
                    }
                } else {
                    if (!o.hasOwnProperty(k)) continue;
                    let v = o[k];
                    if (v === null || v === undefined) {
                        o[k] = "";
                    }
                }
            }
        }
        return characters;
    };

    unSanitize = (newCharacter) => {
        for (let k in newCharacter) {
            if (k == "items" || k == "notes") {
                for (let o2 of newCharacter[k]) {
                    if (typeof o2 !== "object") continue;
                    for (let k2 in o2) {
                        if (!o2.hasOwnProperty(k2)) continue;
                        let v2 = o2[k2];
                        if (v2 === "" || v2 === undefined) {
                            o2[k2] = null;
                        }
                    }
                }
            } else {
                if (!newCharacter.hasOwnProperty(k)) continue;
                let v = newCharacter[k];
                if (v === "" || v === undefined) {
                    newCharacter[k] = null;
                }
            }
        }

        return newCharacter;
    };

    updateCharacter = (newCharacter) => {
        newCharacter = this.unSanitize(newCharacter);
        fetch(`http://127.0.0.1:9393/characters/${newCharacter.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCharacter),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    deleteNote = (noteId) => {
        console.log(noteId);
        // TODO: Once note controller is done
    };

    createNote = (text) => {};

    updateNote = (noteId, newText) => {};

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {this.state.characters.map((char, i) => (
                        <GridListTile key={i} cols={1}>
                            <CharacterCard
                                char={char}
                                deleteNote={this.deleteNote}
                                createBool={false}
                                updateCharacter={this.updateCharacter}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(CharacterContainer);
