import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CharacterCard from "./CharacterCard";
import { IconButton, Paper } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
        "width": "30vw",
        "top": "80px",
        "bottom": "1.2vh",
        "position": "absolute",
        "right": "1vw",
        "background": "rgba(120, 144, 156, .3)",
        ["@media (max-width:760px)"]: {
            width: "92vw",
            top: "30px",
            // bottom: "1vh",
            height: "fit-content",
            position: "relative",
            left: "2.5vw",
            marginBottom: 20,
        },
    },
    gridList: {
        width: "90%",
        height: "96%",
        top: "2%",
        position: "relative",
        left: "5.5%",
        textAlign: "left",
    },
    icon: {
        fontSize: 60,
    },
});

class CharacterContainer extends Component {
    state = {
        characters: [],
        newCharacters: [],
    };

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

    updateCharacter = (newCharacter, extraNotes = undefined) => {
        return new Promise((resolve) => {
            newCharacter = this.unSanitize(newCharacter);
            fetch(`http://127.0.0.1:9393/characters/${newCharacter.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCharacter),
            })
                .then((response) => response.json())
                .then((character) => {
                    character = this.sanitizeResponse([character])[0];
                    if (extraNotes !== undefined) {
                        character = { ...character, notes: [...character.notes, ...extraNotes] };
                    }
                    let currentPos = this.state.characters.findIndex((char) => char.id === character.id);
                    this.setState(
                        {
                            characters: [
                                ...this.state.characters.slice(0, currentPos),
                                character,
                                ...this.state.characters.slice(currentPos + 1),
                            ],
                        },
                        resolve("done")
                    );
                })
                .catch((error) => {
                    // TODO: Handle errors better
                    console.error("Error:", error);
                });
        });
    };

    deleteCharacter = (id) => {
        fetch(`http://127.0.0.1:9393/characters/${id}/`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.length === 0) {
                    let currentPos = this.state.characters.findIndex((char) => char.id === id);
                    this.setState({
                        characters: [
                            ...this.state.characters.slice(0, currentPos),
                            ...this.state.characters.slice(currentPos + 1),
                        ],
                    });
                } else {
                    // TODO: Throw Error?
                }
            })
            .catch((error) => {
                // TODO: Handle errors better
                console.error("Error:", error);
            });
    };

    createCharacter = () => {
        let newTemp = {
            tempId: Date.now(),
            name: "",
            klass: "Artificer",
            language: "Abyssal",
            race: "",
            alignment: "Chaotic Evil",
            armor_class: 9,
            level: 1,
            strength: 6,
            dexterity: 6,
            constitution: 6,
            intelligence: 6,
            wisdom: 6,
            charisma: 6,
            background: "",
            campaign_id: this.props.campId,
            items: [],
            notes: [],
        };
        this.setState({
            newCharacters: [...this.state.newCharacters, newTemp],
        });
    };

    postCharacter = (newCharacter) => {
        // TODO: Validate Values
        newCharacter = this.unSanitize(newCharacter);
        fetch(`http://127.0.0.1:9393/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCharacter),
        })
            .then((response) => response.json())
            .then((character) => {
                character = this.sanitizeResponse([character])[0];
                let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === newCharacter.tempId);
                this.setState({
                    characters: [...this.state.characters, character],
                    newCharacters: [
                        ...this.state.newCharacters.slice(0, currentPos),
                        ...this.state.newCharacters.slice(currentPos + 1),
                    ],
                });
            })
            .catch((error) => {
                // TODO: Handle errors better
                console.error("Error:", error);
            });
    };

    cancelCreate = (tempId) => {
        let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === tempId);

        this.setState({
            newCharacters: [
                ...this.state.newCharacters.slice(0, currentPos),
                ...this.state.newCharacters.slice(currentPos + 1),
            ],
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {this.state.characters.map((char, i) => (
                        <GridListTile key={char.id} cols={1}>
                            <CharacterCard
                                char={char}
                                deleteNote={this.deleteNote}
                                createBool={false}
                                updateCharacter={this.updateCharacter}
                                deleteCharacter={this.deleteCharacter}
                                deleteCharacterItem={this.deleteCharacterItem}
                            />
                        </GridListTile>
                    ))}
                    {this.state.newCharacters.map((char) => (
                        <GridListTile key={char.tempId} cols={1}>
                            <CharacterCard
                                char={char}
                                deleteNote={this.deleteNote}
                                createBool={true}
                                isCreate={true}
                                updateCharacter={this.updateCharacter}
                                deleteCharacter={this.deleteCharacter}
                                cancelCreate={this.cancelCreate}
                                createCharacter={this.postCharacter}
                            />
                        </GridListTile>
                    ))}
                    <GridListTile cols={1}>
                        <IconButton onClick={this.createCharacter} aria-label="create-character">
                            <AddCircleIcon className={classes.icon} />
                        </IconButton>
                    </GridListTile>
                </GridList>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(CharacterContainer);
