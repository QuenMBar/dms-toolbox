import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Button, Paper, TextField } from "@material-ui/core";
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
        "bottom": "1.2vh",
        "position": "absolute",
        "left": "33vw",
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
        height: "calc(98% - 75px)",
        top: "2%",
        position: "relative",
        left: "5.5%",
        textAlign: "left",
        paddingBottom: 20,
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

    componentDidMount() {
        this.getMonsters();
    }

    getMonsters = () => {
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
