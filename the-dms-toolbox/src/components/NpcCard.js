import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem, Table } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
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
}));

export default function NpcCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton onClick={() => props.deleteNpcs(props.npc.id)} aria-label="close">
                        <DeleteForeverIcon color="secondary" />
                    </IconButton>
                }
                title={props.npc.name}
                subheader={props.npc.appearance}
            />
            <CardContent>
                <List dense={true}>
                    <ListItem>Good at: {props.npc.best_ability}</ListItem>
                    <ListItem>Bad at: {props.npc.worst_ability}</ListItem>
                    <ListItem>Mannerism: {props.npc.mannerism}</ListItem>
                    <ListItem>Trait: {props.npc.trait}</ListItem>
                    <ListItem>Bond: {props.npc.bond}</ListItem>
                    <ListItem>Ideal: {props.npc.ideal}</ListItem>
                    <ListItem>Flaw: {props.npc.flaw}</ListItem>
                    <ListItem>Talent: {props.npc.talent}</ListItem>
                </List>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="left">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.npc.items.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Collapse>
        </Card>
    );
}
