import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function ErrorRadios(props) {
     const classes = useStyles();
  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <FormControl
        component='fieldset'
        className={classes.formControl}
      >
        <FormLabel component='legend'>Add A Note</FormLabel>
        <RadioGroup
          aria-label='addNote'
          name='addNote'
          value={props.radio}
          onChange={(e) => props.handleRadioChange(e)}
        >
          <FormControlLabel
            value='campaign'
            control={<Radio />}
            label='Campaign'
          />
          <FormControlLabel value='quest' control={<Radio />} label='Quest' />
          <FormControlLabel
            value='character'
            control={<Radio />}
            label='Character'
          />
        </RadioGroup>
        <TextField
          fullWidth={true}
          id='filled-textarea'
          label='Note'
          placeholder='Type Note Here'
          multiline
          variant='filled'
          onChange={(e) => props.handleTextChange(e)}
        />
        <FormHelperText>{props.helperText}</FormHelperText>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          className={classes.button}
        >
          Create Note
        </Button>
      </FormControl>
    </form>
  );
}
