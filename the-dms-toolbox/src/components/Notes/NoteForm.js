import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "95%",
        height: 175,
        margin: "auto",
        background: "#cfd8dc",
        ["@media (max-width:1260px)"]: {
            height: 225,
        },
    },
    formControl: {
        margin: theme.spacing(3, 0, 1, 0),
        width: "100%",
    },
    button: {
        margin: theme.spacing(3, 3, 1, 3),
        display: "inline-block",
        height: "fit-content",
        padding: 10,
        width: "20%",
        ["@media (max-width:1260px)"]: {
            display: "inline",
            width: "50%",
            margin: theme.spacing(0),
        },
    },
    radials: {
        margin: theme.spacing(1.5, 3, 1, 3),
        width: "20%",
        ["@media (max-width:1260px)"]: {
            display: "inline",
            margin: theme.spacing(0),
        },
    },
    textGroup: {
        margin: theme.spacing(3, 3, 1, 3),
        ["@media (max-width:1260px)"]: {
            margin: theme.spacing(0),
        },
        display: "inline-block",
        width: "60%",
    },
    group: {
        width: "100%",
        ["@media (min-width:1260px)"]: {
            display: "flex",
        },
    },
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
