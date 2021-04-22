import React from 'react'


import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function NoteCard(props) {
    const classes = useStyles();
    const date = props.note.created_at.split('T1')[0]
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Note
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {props.note.title}
          </Typography>
          <Typography variant='body2' component='p'>
            {props.note.text}
            <br />
            {date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Edit</Button>
          <Button size='small'>Delete</Button>
        </CardActions>
      </Card>
    );
}