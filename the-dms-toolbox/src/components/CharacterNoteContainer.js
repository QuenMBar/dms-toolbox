import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CharacterNote from "./CharacterNote";
import AddCircleIcon from "@material-ui/icons/AddCircle";
// import tileData from "./tileData";

const useStyles = makeStyles((theme) => ({
    root: {
        "@global": {
            "*::-webkit-scrollbar": {
                height: "12px",
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 15px rgba(0,0,0,0.00)",
                "borderRadius": "15px",
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,96,100,.6)",
                borderRadius: "15px",
            },
        },
        "display": "flex",
        "flexWrap": "wrap",
        "justifyContent": "space-around",
        "overflow": "hidden",
        "backgroundColor": theme.palette.background.paper,
        "paddingBottom": "10px",
    },
    gridList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)",
        // height: "500px",
        width: "100%",
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
        fontSize: 60,
    },
}));

export default function CharacterNoteContainer(props) {
    const classes = useStyles();
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cellHeight="auto" cols={2.5}>
                {props.notes.map((note) => (
                    <GridListTile key={note.id} cols={1}>
                        {/* <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        /> */}
                        <CharacterNote note={note} deleteNote={props.deleteNote} />
                    </GridListTile>
                ))}
                <GridListTile cols={1}>
                    <IconButton aria-label="create note">
                        <AddCircleIcon className={classes.icon} />
                    </IconButton>
                </GridListTile>
            </GridList>
        </div>
    );
}
