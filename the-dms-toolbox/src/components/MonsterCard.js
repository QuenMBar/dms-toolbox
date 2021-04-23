import React from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem } from "@material-ui/core";

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

export default function MonsterCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar alt="M" src={props.mon.img_url} aria-label="mon img" />}
                title={props.mon.name}
                subheader={props.mon.meta}
            />
            <CardContent>
                <List dense={true}>
                    <ListItem>Stats: {props.mon.stats.split(",").join(", ")}</ListItem>
                    <ListItem>AC: {props.mon.armor_class}</ListItem>
                    <ListItem>Hit Points: {props.mon.hit_points}</ListItem>
                    <ListItem>Challenge: {props.mon.challenge}</ListItem>
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
                    <Typography paragraph>Speed:</Typography>
                    <Typography paragraph>{props.mon.speed}</Typography>
                    <Typography paragraph>Senses:</Typography>
                    <Typography paragraph>{props.mon.senses}</Typography>
                    <Typography paragraph>Languages:</Typography>
                    <Typography paragraph>{props.mon.languages}</Typography>
                    <Typography paragraph>Traits:</Typography>
                    <Typography paragraph>
                        <div dangerouslySetInnerHTML={{ __html: props.mon.traits }} />
                    </Typography>
                    <Typography paragraph>Actions:</Typography>
                    <Typography paragraph>
                        <div dangerouslySetInnerHTML={{ __html: props.mon.actions }} />
                    </Typography>
                    <Typography paragraph>Legendary Actions:</Typography>
                    <Typography paragraph>
                        <div dangerouslySetInnerHTML={{ __html: props.mon.legendary_actions }} />
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
