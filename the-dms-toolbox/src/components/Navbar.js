import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginRight: 10,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        {location.pathname.split("/")[2] === undefined
                            ? "The Dungeon Master's ToolKit"
                            : `The Dungeon Master's ToolKit: ${location.pathname.split("/")[2]}`}
                    </Typography>
                    <Button
                        onClick={() => props.logout()}
                        variant="outlined"
                        className={classes.button}
                        color="inherit"
                    >
                        Log Out
                    </Button>
                    <Button onClick={() => history.push(`/dm`)} variant="outlined" color="inherit">
                        Campaign List
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
