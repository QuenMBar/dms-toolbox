import React, { Component, Fragment } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CharacterCard from "./CharacterCard";
import { Button, IconButton, Paper, TextField, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blueGrey from "@material-ui/core/colors/blueGrey";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MonsterCard from "./MonsterCard";

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
        "width": "16.5vw",
        "top": "80px",
        "bottom": "1.5vh",
        "position": "absolute",
        "left": "33vw",
        "background": "rgba(120, 144, 156, .3)",
        ["@media (max-width:760px)"]: {
            width: "98vw",
            top: "30px",
            // bottom: "1vh",
            height: "fit-content",
            position: "relative",
            left: "1vw",
            marginBottom: 20,
        },
    },
    gridList: {
        width: "90%",
        height: "calc(98% - 75px)",
        top: "2%",
        position: "relative",
        left: "5.5%",
        textAlign: "left",
    },
    icon: {
        fontSize: 60,
    },
    control: {
        width: "100%",
        display: "flex",
        margin: 10,
    },
    bttn: { width: "30%", display: "inline-block" },
    textF: { marginLeft: "5%", width: "65%", display: "inline-block" },
});

class MonsterContainer extends Component {
    state = {
        monsters: [],
        search: "",
    };

    // TODO: Replace with camp id
    componentDidMount() {
        this.getMonsters();
    }

    getMonsters = () => {
        // console.log("here");
        fetch(`http://127.0.0.1:9393/monster?search=${this.state.search}`)
            .then((res) => res.json())
            .then((monsters) => {
                if (Array.isArray(monsters)) {
                    this.setState({ monsters: monsters });
                }
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    };

    updateItem = (e) => {
        this.setState({ search: e.target.value }, this.getMonsters);
    };

    refresh = () => {
        this.getMonsters();
    };

    // updateCharacter = (newCharacter, extraNotes = undefined) => {
    //     return new Promise((resolve) => {
    //         newCharacter = this.unSanitize(newCharacter);
    //         fetch(`http://127.0.0.1:9393/characters/${newCharacter.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(newCharacter),
    //         })
    //             .then((response) => response.json())
    //             .then((character) => {
    //                 character = this.sanitizeResponse([character])[0];
    //                 if (extraNotes !== undefined) {
    //                     character = { ...character, notes: [...character.notes, ...extraNotes] };
    //                 }
    //                 let currentPos = this.state.characters.findIndex((char) => char.id === character.id);
    //                 this.setState(
    //                     {
    //                         characters: [
    //                             ...this.state.characters.slice(0, currentPos),
    //                             character,
    //                             ...this.state.characters.slice(currentPos + 1),
    //                         ],
    //                     },
    //                     resolve("done")
    //                 );
    //             })
    //             .catch((error) => {
    //                 // TODO: Handle errors better
    //                 console.error("Error:", error);
    //             });
    //     });
    // };

    // deleteCharacter = (id) => {
    //     // TODO: Confirm
    //     fetch(`http://127.0.0.1:9393/characters/${id}/`, {
    //         method: "DELETE",
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             if (response.length === 0) {
    //                 let currentPos = this.state.characters.findIndex((char) => char.id === id);
    //                 this.setState({
    //                     characters: [
    //                         ...this.state.characters.slice(0, currentPos),
    //                         ...this.state.characters.slice(currentPos + 1),
    //                     ],
    //                 });
    //             } else {
    //                 // TODO: Throw Error?
    //             }
    //         })
    //         .catch((error) => {
    //             // TODO: Handle errors better
    //             console.error("Error:", error);
    //         });
    // };

    // createCharacter = () => {
    //     let newTemp = {
    //         tempId: Date.now(),
    //         name: "",
    //         klass: "Artificer",
    //         language: "Abyssal",
    //         race: "",
    //         alignment: "Chaotic Evil",
    //         armor_class: 9,
    //         level: 1,
    //         strength: 6,
    //         dexterity: 6,
    //         constitution: 6,
    //         intelligence: 6,
    //         wisdom: 6,
    //         charisma: 6,
    //         background: "",
    //         campaign_id: this.props.campId,
    //         items: [],
    //         notes: [],
    //     };
    //     this.setState({
    //         newCharacters: [...this.state.newCharacters, newTemp],
    //     });
    // };

    // postCharacter = (newCharacter) => {
    //     // TODO: Validate Values
    //     newCharacter = this.unSanitize(newCharacter);
    //     fetch(`http://127.0.0.1:9393/characters`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newCharacter),
    //     })
    //         .then((response) => response.json())
    //         .then((character) => {
    //             character = this.sanitizeResponse([character])[0];
    //             let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === newCharacter.tempId);
    //             this.setState({
    //                 characters: [...this.state.characters, character],
    //                 newCharacters: [
    //                     ...this.state.newCharacters.slice(0, currentPos),
    //                     ...this.state.newCharacters.slice(currentPos + 1),
    //                 ],
    //             });
    //         })
    //         .catch((error) => {
    //             // TODO: Handle errors better
    //             console.error("Error:", error);
    //         });
    // };

    // cancelCreate = (tempId) => {
    //     let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === tempId);

    //     this.setState({
    //         newCharacters: [
    //             ...this.state.newCharacters.slice(0, currentPos),
    //             ...this.state.newCharacters.slice(currentPos + 1),
    //         ],
    //     });
    // };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.control}>
                    <Button className={classes.bttn} onClick={this.refresh} variant="contained" color="primary">
                        Refresh
                    </Button>
                    <TextField
                        className={classes.textF}
                        label="Search"
                        value={this.state.search}
                        onChange={this.updateItem}
                    />
                </div>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {this.state.monsters.map((mon, i) => (
                        <GridListTile cols={1}>
                            <MonsterCard mon={mon} />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(MonsterContainer);
