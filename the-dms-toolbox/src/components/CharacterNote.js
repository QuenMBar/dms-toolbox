import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#e0f2f1",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CharacterNote(props) {
    const classes = useStyles();
    const [isEditing, setEdit] = useState(false);
    const [newText, setText] = useState(props.note.text);

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Character Note
                    </Typography>
                }
                action={
                    isEditing || props.create ? null : (
                        <IconButton onClick={() => props.deleteNote(props.note.id)} aria-label="delete">
                            <CloseIcon />
                        </IconButton>
                    )
                }
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {isEditing || props.create ? (
                        <TextField
                            id={`note-basic${props.note.id}`}
                            label="Text"
                            multiline
                            value={newText}
                            onChange={(e) => setText(e.target.value)}
                        />
                    ) : (
                        props.note.text
                    )}
                </Typography>
            </CardContent>
            <CardActions>
                {props.create ? (
                    <Button
                        onClick={() => {
                            props.saveNote(newText, props.note.created_at);
                        }}
                        size="small"
                    >
                        save
                    </Button>
                ) : isEditing ? (
                    <Button
                        onClick={() => {
                            setEdit(false);
                            props.editNote(props.note.id, newText);
                        }}
                        size="small"
                    >
                        save
                    </Button>
                ) : (
                    <Button onClick={() => setEdit(true)} size="small">
                        Edit
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
