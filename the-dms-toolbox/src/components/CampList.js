import React from "react";

import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

const listItemTextField = (name) => {
    return <TextField id="standard-basic" defaultValue={name} label="Standard" />;
};

export default function CampList(props) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <h1> Your Campaigns!</h1>
            {props.camps.map((camp) => {
                return (
                    <div className={classes.root} key={camp.id}>
                        <Divider />
                        <ListItem>
                            <ListItemText primary={listItemTextField(camp.name)} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <SaveIcon onClick={() => props.handleEdit(camp.id)} />
                                </IconButton>
                                <IconButton edge="end" aria-label="comments">
                                    <OpenInBrowserIcon
                                        onClick={() => {
                                            history.push(`/dm/${camp.name}/${camp.id}`);
                                        }}
                                    />
                                </IconButton>
                                <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon onClick={() => props.handleDele(camp.id)} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                );
            })}
        </div>
    );
}
