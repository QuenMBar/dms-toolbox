import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
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

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Character Note
                    </Typography>
                }
                action={
                    <IconButton onClick={() => props.deleteNote(props.note.id)} aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {props.note.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
