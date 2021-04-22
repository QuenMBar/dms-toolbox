import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button, Divider, FormControl, InputLabel, Select, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CharacterNoteContainer from "./CharacterNoteContainer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = (theme) => ({
    root: {
        minWidth: 345,
    },
    media: {
        // height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    table: {
        minWidth: 300,
    },
    listDiv: {},
    listRoot: {
        display: "inline-block",
        maxWidth: "50%",
    },
    expandLabel: {
        textAlign: "right",
    },
    menuError: {
        "backgroundColor": "#f44336",
        "&:hover": {
            backgroundColor: "#d32f2f",
        },
    },
    actionButtons: {
        margin: "10px",
        display: "flex",
        justifyContent: "flex-end",
    },
    subBttn: {
        marginLeft: "20px",
    },
});

class CharacterCard extends Component {
    state = {
        expanded: false,
        anchorEl: null,
        createOrEdit: this.props.createBool,
        character: this.props.char,
        characterEdit: this.props.char,
    };

    dndClasses = [
        "Artificer",
        "Barbarian",
        "Bard",
        "Blood Hunter",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard",
    ];

    dndLanguages = [
        "Abyssal",
        "Celestial",
        "Common",
        "Deep Speech",
        "Draconic",
        "Dwarvish",
        "Elvish",
        "Giant",
        "Gnomish",
        "Goblin",
        "Halfling",
        "Infernal",
        "Orc",
        "Primordial",
        "Sylvan",
        "Undercommon",
    ];

    dndAlignments = [
        "Chaotic Evil",
        "Chaotic Good",
        "Chaotic Neutral",
        "Lawful Evil",
        "Lawful Good",
        "Lawful Neutral",
        "Neutral Evil",
        "Neutral Good",
        "True Neutral",
    ];

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };
    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    updateEdit = (event, stat) =>
        this.setState({ characterEdit: { ...this.state.characterEdit, [`${stat}`]: event.target.value } });
    updateItem = (event, stat, i) =>
        this.setState({
            characterEdit: {
                ...this.state.characterEdit,
                items: [
                    ...this.state.characterEdit.items.slice(0, i),
                    { ...this.state.characterEdit.items[i], [`${stat}`]: event.target.value },
                    ...this.state.characterEdit.items.slice(i + 1),
                ],
            },
        });

    createData = (stat, modifier, raw) => {
        return { stat, modifier, raw };
    };

    rows = [
        this.createData(
            "Strength",
            Math.floor((this.state.character.strength - 10) / 2),
            this.state.character.strength
        ),
        this.createData(
            "Dexterity",
            Math.floor((this.state.character.dexterity - 10) / 2),
            this.state.character.dexterity
        ),
        this.createData(
            "Constitution",
            Math.floor((this.state.character.constitution - 10) / 2),
            this.state.character.constitution
        ),
        this.createData("Wisdom", Math.floor((this.state.character.wisdom - 10) / 2), this.state.character.wisdom),
        this.createData(
            "Intelligence",
            Math.floor((this.state.character.intelligence - 10) / 2),
            this.state.character.intelligence
        ),
        this.createData(
            "Charisma",
            Math.floor((this.state.character.charisma - 10) / 2),
            this.state.character.charisma
        ),
    ];

    handleEdit = () => {
        this.setState({ createOrEdit: true });
        this.handleClose();
    };

    handleCancel = () => {
        this.setState({
            characterEdit: this.state.character,
            createOrEdit: false,
        });
    };

    handleSub = () => {
        if (this.state.character.id !== undefined) {
            this.props.updateCharacter(this.state.characterEdit);
            this.setState({
                // TODO: Figure Out Why It Doesnt Update
                character: this.state.characterEdit,
                createOrEdit: false,
            });
        } else {
            // Create the thing
        }
    };

    handleDelete = () => {
        this.handleClose();
        this.props.deleteCharacter(this.state.character.id);
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    // TODO: Add class photo
                    // avatar={
                    //     <Avatar aria-label="recipe" >
                    //         R
                    //     </Avatar>
                    // }
                    action={
                        this.state.createOrEdit ? null : (
                            <div>
                                <IconButton onClick={this.handleClick} aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                                    <MenuItem onClick={this.handleDelete} className={classes.menuError}>
                                        <DeleteForeverIcon />
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </div>
                        )
                    }
                    title={
                        this.state.createOrEdit ? (
                            <TextField
                                id="name-basic"
                                label="Name"
                                value={this.state.characterEdit.name}
                                onChange={(e) => this.updateEdit(e, "name")}
                            />
                        ) : (
                            <Typography variant="h5" color="textSecondary" component="p">
                                {this.state.character.name}
                            </Typography>
                        )
                    }
                    subheader={
                        <Fragment>
                            {this.state.createOrEdit ? (
                                <TextField
                                    id="race-basic"
                                    label="Race"
                                    value={this.state.characterEdit.race}
                                    onChange={(e) => this.updateEdit(e, "race")}
                                />
                            ) : (
                                `Race: ${this.state.character.race}`
                            )}
                            <br />
                            {this.state.createOrEdit ? (
                                <FormControl>
                                    <InputLabel id="class">Class</InputLabel>
                                    <Select
                                        labelId="class"
                                        id="class-select"
                                        value={this.state.characterEdit.klass}
                                        onChange={(e) => this.updateEdit(e, "klass")}
                                    >
                                        {this.dndClasses.map((c, i) => (
                                            <MenuItem key={i} value={c}>
                                                {c}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                `Class: ${this.state.character.klass}`
                            )}
                        </Fragment>
                    }
                />
                {/* <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" /> */}
                <CardContent>
                    {/* TODO: Add Gender, walking speed, and Proficiencies if theres time */}

                    <Typography variant="h6" color="textSecondary" component="p">
                        Quick Stats:
                    </Typography>
                    {/* Level: Proficiency Bonus: Ac: Init: Passive Perception: alignment: */}
                    <div className={classes.listDiv}>
                        <List dense={true} className={classes.listRoot}>
                            <ListItem>
                                <ListItemText>
                                    {this.state.createOrEdit ? (
                                        <TextField
                                            id="level-basic"
                                            label="Level"
                                            type="number"
                                            value={this.state.characterEdit.level}
                                            onChange={(e) => this.updateEdit(e, "level")}
                                        />
                                    ) : (
                                        `Level: ${this.state.character.level}`
                                    )}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {this.state.createOrEdit ? (
                                        <TextField
                                            id="armor-basic"
                                            label="Armor"
                                            type="number"
                                            value={this.state.characterEdit.armor_class}
                                            onChange={(e) => this.updateEdit(e, "armor_class")}
                                        />
                                    ) : (
                                        `Armor Class: ${this.state.character.armor_class}`
                                    )}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`Initiative: ${
                                        Math.sign(this.rows[1].modifier) === -1 ? "-" : "+"
                                    }${Math.abs(this.rows[1].modifier)}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {this.state.createOrEdit ? (
                                        <FormControl>
                                            <InputLabel id="language">Language</InputLabel>
                                            <Select
                                                labelId="language"
                                                id="language-select"
                                                value={this.state.characterEdit.language}
                                                onChange={(e) => this.updateEdit(e, "language")}
                                            >
                                                {this.dndLanguages.map((l, i) => (
                                                    <MenuItem key={i} value={l}>
                                                        {l}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        `Language: ${this.state.character.language}`
                                    )}
                                </ListItemText>
                            </ListItem>
                        </List>
                        <List dense={true} className={classes.listRoot}>
                            <ListItem>
                                <ListItemText
                                    primary={`Proficiency Bonus: +${
                                        Math.floor((this.state.character.level - 1) / 4) + 2
                                    }`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {this.state.createOrEdit ? (
                                        <FormControl>
                                            <InputLabel id="alignment">Alignment</InputLabel>
                                            <Select
                                                labelId="alignment"
                                                id="alignment-select"
                                                value={this.state.characterEdit.alignment}
                                                onChange={(e) => this.updateEdit(e, "alignment")}
                                            >
                                                {this.dndAlignments.map((a, i) => (
                                                    <MenuItem key={i} value={a}>
                                                        {a}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        `Alignment: ${this.state.character.alignment}`
                                    )}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Passive Perception: ${10 + this.rows[3].modifier}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {this.state.createOrEdit ? (
                                        <TextField
                                            id="background-basic"
                                            label="Background"
                                            value={this.state.characterEdit.background}
                                            onChange={(e) => this.updateEdit(e, "background")}
                                        />
                                    ) : (
                                        `Background: ${this.state.character.background}`
                                    )}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>

                    <Divider />
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Stat</TableCell>
                                <TableCell align="center">Modifier</TableCell>
                                <TableCell align="center">Raw Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rows.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {row.stat}
                                    </TableCell>
                                    <TableCell align="center">
                                        {`${Math.sign(row.modifier) === -1 ? "-" : "+"}${Math.abs(row.modifier)}`}
                                    </TableCell>
                                    <TableCell align="center">
                                        {this.state.createOrEdit ? (
                                            <TextField
                                                id="stat-basic"
                                                label={row.stat}
                                                value={this.state.characterEdit[row.stat.toLowerCase()]}
                                                type="number"
                                                onChange={(e) => this.updateEdit(e, row.stat.toLowerCase())}
                                            />
                                        ) : (
                                            row.raw
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="left">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.createOrEdit
                                ? this.state.characterEdit.items.map((item, i) => (
                                      <TableRow key={item.id}>
                                          <TableCell component="th" scope="row">
                                              <TextField
                                                  id={`item-name-basic${i}`}
                                                  label="Name"
                                                  value={item.name}
                                                  onChange={(e) => this.updateItem(e, "name", i)}
                                              />
                                          </TableCell>
                                          <TableCell align="left">
                                              <TextField
                                                  id={`item-desc-basic${i}`}
                                                  label="Description"
                                                  value={item.description}
                                                  onChange={(e) => this.updateItem(e, "description", i)}
                                              />
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : this.state.character.items.map((item, i) => (
                                      <TableRow key={i}>
                                          <TableCell component="th" scope="row">
                                              {item.name}
                                          </TableCell>
                                          <TableCell align="left">{item.description}</TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                    {this.state.createOrEdit ? (
                        <div className={classes.actionButtons}>
                            <Button onClick={this.handleCancel} variant="contained" color="secondary">
                                Cancel
                            </Button>
                            <Button
                                onClick={this.handleSub}
                                className={classes.subBttn}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </div>
                    ) : null}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.expandLabel}>
                            Notes
                        </Typography>
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CharacterNoteContainer notes={this.state.character.notes} deleteNote={this.props.deleteNote} />
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(useStyles)(CharacterCard);
