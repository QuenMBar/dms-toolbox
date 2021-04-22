import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "95%",
        height: 170,
        // padding: 5,
        // display: "inline-block",
        margin: "auto",
        background: "#cfd8dc",
    },
    formControl: {
        margin: theme.spacing(3, 3, 1, 3),
    },
    button: {
        margin: theme.spacing(3, 3, 1, 3),
        display: "inline-block",
        height: "fit-content",
        padding: 10,
    },
    radials: { margin: theme.spacing(1.5, 3, 1, 3) },
    textGroup: { margin: theme.spacing(3, 3, 1, 3), display: "inline-block" },
    group: { display: "flex" },
    title: { color: "black" },
}));

export default function ErrorRadios(props) {
    const [textField, setTextField] = useState("");
    const classes = useStyles();

    return (
        <Paper
            component="form"
            onSubmit={(e) => {
                props.handleSubmit(e, textField);
                setTextField("");
            }}
            className={classes.root}
        >
            <FormControl component="fieldset" className={classes.formControl}>
                <Typography className={classes.title}>Add A Note</Typography>
                <div className={classes.group}>
                    <RadioGroup
                        aria-label="addNote"
                        name="addNote"
                        value={props.radio}
                        onChange={(e) => props.handleRadioChange(e)}
                        className={classes.radials}
                    >
                        <FormControlLabel value="campaign" control={<Radio />} label="Campaign" />
                        <FormControlLabel value="quest" control={<Radio />} label="Quest" />
                        {/* <FormControlLabel value="character" control={<Radio />} label="Character" /> */}
                    </RadioGroup>
                    <div className={classes.textGroup}>
                        <TextField
                            fullWidth={true}
                            id="filled-textarea"
                            label="Note"
                            placeholder="Type Note Here"
                            multiline
                            variant="filled"
                            value={textField}
                            onChange={(e) => setTextField(e.target.value)}
                        />
                        <FormHelperText>{props.helperText}</FormHelperText>
                    </div>

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Create Note
                    </Button>
                </div>
            </FormControl>
        </Paper>
    );
}
