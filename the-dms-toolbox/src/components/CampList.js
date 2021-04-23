import React, { useState } from "react";

import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

const URL = "http://localhost:9393/campaign/";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CampList(props) {
    const [textField, setText] = useState(props.camp.name);
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root} key={props.camp.id}>
            <Divider />
            <ListItem>
                <TextField
                    id="standard-basic"
                    defaultValue={props.camp.name}
                    onChange={(e) => setText(e.target.value)}
                    value={textField}
                    label="edit"
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                        <SaveIcon onClick={() => props.handleSave(props.camp.id, textField)} />
                    </IconButton>
                    <IconButton edge="end" aria-label="comments">
                        <OpenInBrowserIcon
                            onClick={() => {
                                history.push(`/dm/${props.camp.name}/${props.camp.id}`);
                            }}
                        />
                    </IconButton>
                    <IconButton edge="end" aria-label="comments">
                        <DeleteIcon onClick={() => props.handleDele(props.camp.id)} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </div>
    );
}
