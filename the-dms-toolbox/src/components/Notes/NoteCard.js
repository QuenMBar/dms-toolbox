import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const noteURL = "http://localhost:9393/note/";

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
  const [input, setInput] = useState("");
  const [textHelper, setTextHelper] = useState("Edit");
  const classes = useStyles();
  const date = props.note.created_at.split("T")[0];


  const handleEdit = () => {

    const updatedNote = {
      text: input
    }

    const configObj = {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(updatedNote)
    }

    fetch(noteURL+props.note.id, configObj)
      .then((r) => r.json())
      .then(console.log)
      .catch((e) => console.error("e:", e));
  };


  const handleChange = (e) => {
      console.log(props.note.id);
    setInput(e.target.value);
    setTextHelper("Save")
  }
  
  const handleBlur = () => {
    setTextHelper("Edit");
  }

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <TextField
          id='outlined-multiline-static'
          label={`${props.note.title} notes`}
          multiline
          rows={6}
          fullWidth={true}
          defaultValue={`${props.note.text}`}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur()}
        />
        <FormHelperText>{date}</FormHelperText>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleEdit(props.note)} size='small'>
          {textHelper}
        </Button>
        <Button onClick={() => props.handleDele(props.note)} size='small'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

// export default function NoteCard(props) {
//     const classes = useStyles();
//  
//     return (
//       <Card className={classes.root}>
//         <CardContent>
//           <Typography
//             className={classes.title}
//             color='textSecondary'
//             gutterBottom
//           >
//             Note
//           </Typography>
//           <Typography className={classes.pos} color='textSecondary'>
//             {props.note.title}
//           </Typography>
//           <Typography variant='body2' component='p'>
//             {props.note.text}
//             <br />
//             {date}
//           </Typography>
//         </CardContent>
//         <CardActions>

//         </CardActions>
//       </Card>
//     );
// }
