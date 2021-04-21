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
        "right": "1vw",
        "background": "rgba(120, 144, 156, .3)",
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

class CharacterContainer extends Component {
    state = {
        characters: [],
    };

    // TODO: Replace with camp id
    componentDidMount() {
        fetch(`http://127.0.0.1:9393/characters?campId=14`)
            .then((res) => res.json())
            .then((characters) => {
                this.setState({ characters: characters });
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {this.state.characters.map((char, i) => (
                        <GridListTile key={i} cols={1}>
                            <CharacterCard char={char} />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(CharacterContainer);
