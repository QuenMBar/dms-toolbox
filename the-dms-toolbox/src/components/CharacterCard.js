import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CharacterNoteContainer from "./CharacterNoteContainer";

const useStyles = makeStyles((theme) => ({
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
    avatar: {
        backgroundColor: red[500],
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
    collapseable: {
        // height: "500px",
    },
}));

function createData(stat, modifier, raw) {
    return { stat, modifier, raw };
}

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const rows = [
        createData("Strength", Math.floor((props.char.strength - 10) / 2), props.char.strength),
        createData("Dexterity", Math.floor((props.char.dexterity - 10) / 2), props.char.dexterity),
        createData("Constitution", Math.floor((props.char.constitution - 10) / 2), props.char.constitution),
        createData("Wisdom", Math.floor((props.char.wisdom - 10) / 2), props.char.wisdom),
        createData("Intelligence", Math.floor((props.char.intelligence - 10) / 2), props.char.intelligence),
        createData("Charisma", Math.floor((props.char.charisma - 10) / 2), props.char.charisma),
    ];

    return (
        <Card className={classes.root}>
            <CardHeader
                // TODO: Add class photo
                // avatar={
                //     <Avatar aria-label="recipe" className={classes.avatar}>
                //         R
                //     </Avatar>
                // }
                title={
                    <Typography variant="h5" color="textSecondary" component="p">
                        {props.char.name}
                    </Typography>
                }
                subheader={
                    <Fragment>
                        {`Race: ${props.char.race}`}
                        <br />
                        {`Class: ${props.char.klass}`}
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
                            <ListItemText primary={`Level: ${props.char.level}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Armor Class: ${props.char.armor_class}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={`Initiative: ${Math.sign(rows[1].modifier) === -1 ? "-" : "+"}${
                                    rows[1].modifier
                                }`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Language: ${props.char.language}`} />
                        </ListItem>
                    </List>
                    <List dense={true} className={classes.listRoot}>
                        <ListItem>
                            <ListItemText
                                primary={`Proficiency Bonus: +${Math.floor((props.char.level - 1) / 4) + 2}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Alignment: ${props.char.alignment}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Passive Perception: ${10 + rows[3].modifier}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Background: ${props.char.background}`} />
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
                        {rows.map((row) => (
                            <TableRow key={row.stat}>
                                <TableCell component="th" scope="row">
                                    {row.stat}
                                </TableCell>
                                <TableCell align="center">{row.modifier}</TableCell>
                                <TableCell align="center">{row.raw}</TableCell>
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
                        {props.char.items.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="left">{item.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.expandLabel}>
                        Notes
                    </Typography>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.collapseable}>
                    {/* <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add
                        chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
                        minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan.
                        Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often
                        until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                        chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
                        stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                        reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring,
                        until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels
                        that don’t open.)
                    </Typography>
                    <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography> */}
                    <CharacterNoteContainer notes={props.char.notes} deleteNote={props.deleteNote} />
                </CardContent>
            </Collapse>
        </Card>
    );
}
