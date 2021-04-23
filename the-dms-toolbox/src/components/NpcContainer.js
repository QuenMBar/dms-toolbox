import React, { Component, Fragment } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CharacterCard from "./CharacterCard";
import { Button, IconButton, Paper, TextField, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blueGrey from "@material-ui/core/colors/blueGrey";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NpcCard from "./NpcCard";
import { LoremIpsum } from "lorem-ipsum";

const useStyles = (theme) => ({
    root: {
        "@global": {
            "*::-webkit-scrollbar": {
                width: "6px",
            },
            "*::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
                "borderRadius": "5px",
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,96,100,.6)",
                borderRadius: "5px",
            },
        },
        "width": "17.5vw",
        "top": "80px",
        "bottom": "1.2vh",
        "position": "absolute",
        "right": "32vw",
        "background": "rgba(120, 144, 156, .3)",
        ["@media (max-width:760px)"]: {
            width: "92vw",
            top: "30px",
            // bottom: "1vh",
            height: "fit-content",
            position: "relative",
            left: "2.5vw",
            marginBottom: 20,
        },
    },
    gridList: {
        width: "90%",
        height: "calc(98% - 65px)",
        top: "2%",
        position: "relative",
        left: "5.5%",
        textAlign: "left",
        paddingBottom: 20,
    },
    icon: {
        fontSize: 60,
    },
    control: {
        width: "100%",
        display: "flex",
        margin: 10,
    },
    bttn: { marginLeft: "7%", marginRight: "10%", width: "80%", display: "inline-block" },
});

class NpcContainer extends Component {
    state = {
        npcs: [],
    };

    // TODO: Replace with camp id
    componentDidMount() {
        this.getNpcs();
    }

    lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4,
        },
        wordsPerSentence: {
            max: 16,
            min: 4,
        },
    });

    getNpcs = () => {
        fetch(`http://127.0.0.1:9393/npc/${this.props.campId}`)
            .then((res) => res.json())
            .then((npcs) => {
                if (Array.isArray(npcs)) {
                    this.setState({ npcs: npcs });
                }
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    };

    postNpcs = (data) => {
        fetch(`http://127.0.0.1:9393/npc`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((npc) => {
                if (typeof npc === "object") {
                    this.setState({ npcs: [...this.state.npcs, npc] });
                }
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    };

    deleteNpcs = (id) => {
        fetch(`http://127.0.0.1:9393/npc/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                let currentPos = this.state.npcs.findIndex((npc) => npc.id === id);
                this.setState({
                    npcs: [...this.state.npcs.slice(0, currentPos), ...this.state.npcs.slice(currentPos + 1)],
                });
            })
            .catch((e) => {
                console.error("e: ", e);
            });
    };

    // updateItem = (e) => {
    //     this.setState({ search: e.target.value }, this.getMonsters);
    // };

    generateNpc = () => {
        let appearences = [
            "Distinctive jewelry: earrings, necklace, circlet, bracelets",
            "Piercings",
            "Flamboyant or outlandish clothes",
            "Formal, clean clothes",
            "Ragged, dirty clothes",
            "Pronounced scar",
            "Missing teeth",
            "Missing fingers",
            "Unusual eye color (or two different colors)",
            "Tattoos",
            "Birthmark",
            "Unusual skin color",
            "Bald",
            "Braided beard or hair",
            "Unusual hair color",
            "Nervous eye twitch",
            "Distinctive nose",
            "Distinctive posture (crooked or rigid)",
            "Exceptionally beautiful",
            "Exceptionally ugly",
        ];

        let high_abilitys = [
            "Strength — powerful, brawny, strong as an ox",
            "Dexterity — lithe, agile, graceful",
            "Constitution — hardy, hale, healthy",
            "Intelligence — studious, learned, inquisitive",
            "Wisdom — perceptive, spiritual, insightful",
            "Charisma — persuasive, forceful, born leader",
        ];

        let low_abilitys = [
            "Strength — feeble, scrawny",
            "Dexterity — clumsy, fumbling",
            "Constitution — sickly, pale",
            "Intelligence — dim-witted, slow",
            "Wisdom — oblivious, absentminded",
            "Charisma — dull, boring",
        ];

        let talents = [
            "Plays a musical instrument",
            "Speaks several languages fluently",
            "Unbelievably lucky",
            "Perfect memory",
            "Great with animals",
            "Great with children",
            "Great at solving puzzles",
            "Great at one game",
            "Great at impersonations",
            "Draws beautifully",
            "Paints beautifully",
            "Sings beautifully",
            "Drinks everyone under the table",
            "Expert carpenter",
            "Expert cook",
            "Expert dart thrower and rock skipper",
            "Expert juggler",
            "Skilled actor and master of disguise",
            "Skilled dancer",
            "Knows thieves’ cant",
        ];

        let mannerisms = [
            "Prone to singing, whistling, or humming quietly",
            "Speaks in rhyme or some other peculiar way",
            "Particularly low or high voice",
            "Slurs words, lisps, or stutters",
            "Enunciates overly clearly",
            "Speaks loudly",
            "Whispers",
            "Uses flowery speech or long words",
            "Frequently uses the wrong word",
            "Uses colorful oaths and exclamations",
            "Makes constant jokes or puns",
            "Prone to predictions of doom",
            "Fidgets",
            "Squints",
            "Stares into the distance",
            "Chews something",
            "Paces",
            "Taps fingers",
            "Bites fingernails",
            "Twirls hair or tugs beard",
        ];

        let traits = [
            "Argumentative",
            "Arrogant",
            "Blustering",
            "Rude",
            "Curious",
            "Friendly",
            "Honest",
            "Hot tempered",
            "Irritable",
            "Ponderous",
            "Quiet",
            "Suspicious",
        ];

        let ideals = [
            "Beauty",
            "Domination",
            "Charity",
            "Greed",
            "Greater good",
            "Might",
            "Life",
            "Pain",
            "Respect",
            "Retribution",
            "Self-sacrifice",
            "Slaughter",
            "Community",
            "Change",
            "Fairness",
            "Creativity",
            "Honor",
            "Freedom",
            "Logic",
            "Independence",
            "Responsibility",
            "No limits",
            "Tradition",
            "Whimsy",
            "Balance",
            "Aspiration",
            "Knowledge",
            "Discovery",
            "Live and let live ",
            "Glory",
            "Moderation",
            "Nation",
            "Neutrality",
            "Redemption",
            "People",
            "Self-knowledge",
        ];

        let bonds = [
            "Dedicated to fulfilling a personal life goal",
            "Protective of close family members",
            "Protective of colleagues or compatriots",
            "Loyal to a benefactor, patron, or employer",
            "Captivated by a romantic interest",
            "Drawn to a special place",
            "Protective of a sentimental keepsake",
            "Protective of a valuable possession",
            "Out for revenge",
        ];

        let flaws = [
            "Forbidden love or susceptibility to romance",
            "Enjoys decadent pleasures",
            "Arrogance",
            "Envies another creature’s possessions or station",
            "Overpowering greed",
            "Prone to rage",
            "Has a powerful enemy",
            "Specific phobia",
            "Shameful or scandalous history",
            "Secret crime or misdeed",
            "Possession of forbidden lore",
            "Foolhardy bravery",
        ];

        let firstName = ["A", "Be", "De", "El", "Fa", "Jo", "Ki", "La", "Ma", "Na", "O", "Pa", "Re", "Si", "Ta", "Va"];

        let middleName = [
            "bar",
            "ched",
            "dell",
            "far",
            "gran",
            "hal",
            "jen",
            "kel",
            "lim",
            "mor",
            "net",
            "penn",
            "quill",
            "rond",
            "sark",
            "shen",
            "tur",
            "vash",
            "yor",
            "zen",
        ];

        let lastName = [
            "a",
            "ac",
            "ai",
            "al",
            "am",
            "an",
            "ar",
            "ea",
            "el",
            "er",
            "ess",
            "ett",
            "ic",
            "id",
            "il",
            "in",
            "is",
            "or",
            "us",
        ];

        let items = [];
        for (let i = 0; i < Math.floor(Math.random() * 6); i++) {
            items.push({ name: this.lorem.generateWords(3), description: this.lorem.generateParagraphs(1) });
        }

        let newCharacter = {
            name: [
                firstName[Math.floor(Math.random() * firstName.length)],
                middleName[Math.floor(Math.random() * middleName.length)],
                lastName[Math.floor(Math.random() * lastName.length)],
            ].join(""),
            appearance: appearences[Math.floor(Math.random() * appearences.length)],
            best_ability: high_abilitys[Math.floor(Math.random() * high_abilitys.length)],
            worst_ability: low_abilitys[Math.floor(Math.random() * low_abilitys.length)],
            talent: talents[Math.floor(Math.random() * talents.length)],
            ideal: ideals[Math.floor(Math.random() * ideals.length)],
            mannerism: mannerisms[Math.floor(Math.random() * mannerisms.length)],
            trait: traits[Math.floor(Math.random() * traits.length)],
            bond: bonds[Math.floor(Math.random() * bonds.length)],
            flaw: flaws[Math.floor(Math.random() * flaws.length)],
            items: items,
            campaign_id: this.props.campId,
        };

        this.postNpcs(newCharacter);
    };

    // updateCharacter = (newCharacter, extraNotes = undefined) => {
    //     return new Promise((resolve) => {
    //         newCharacter = this.unSanitize(newCharacter);
    //         fetch(`http://127.0.0.1:9393/characters/${newCharacter.id}`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(newCharacter),
    //         })
    //             .then((response) => response.json())
    //             .then((character) => {
    //                 character = this.sanitizeResponse([character])[0];
    //                 if (extraNotes !== undefined) {
    //                     character = { ...character, notes: [...character.notes, ...extraNotes] };
    //                 }
    //                 let currentPos = this.state.characters.findIndex((char) => char.id === character.id);
    //                 this.setState(
    //                     {
    //                         characters: [
    //                             ...this.state.characters.slice(0, currentPos),
    //                             character,
    //                             ...this.state.characters.slice(currentPos + 1),
    //                         ],
    //                     },
    //                     resolve("done")
    //                 );
    //             })
    //             .catch((error) => {
    //                 // TODO: Handle errors better
    //                 console.error("Error:", error);
    //             });
    //     });
    // };

    // deleteCharacter = (id) => {
    //     // TODO: Confirm
    //     fetch(`http://127.0.0.1:9393/characters/${id}/`, {
    //         method: "DELETE",
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             if (response.length === 0) {
    //                 let currentPos = this.state.characters.findIndex((char) => char.id === id);
    //                 this.setState({
    //                     characters: [
    //                         ...this.state.characters.slice(0, currentPos),
    //                         ...this.state.characters.slice(currentPos + 1),
    //                     ],
    //                 });
    //             } else {
    //                 // TODO: Throw Error?
    //             }
    //         })
    //         .catch((error) => {
    //             // TODO: Handle errors better
    //             console.error("Error:", error);
    //         });
    // };

    // createCharacter = () => {
    //     let newTemp = {
    //         tempId: Date.now(),
    //         name: "",
    //         klass: "Artificer",
    //         language: "Abyssal",
    //         race: "",
    //         alignment: "Chaotic Evil",
    //         armor_class: 9,
    //         level: 1,
    //         strength: 6,
    //         dexterity: 6,
    //         constitution: 6,
    //         intelligence: 6,
    //         wisdom: 6,
    //         charisma: 6,
    //         background: "",
    //         campaign_id: this.props.campId,
    //         items: [],
    //         notes: [],
    //     };
    //     this.setState({
    //         newCharacters: [...this.state.newCharacters, newTemp],
    //     });
    // };

    // postCharacter = (newCharacter) => {
    //     // TODO: Validate Values
    //     newCharacter = this.unSanitize(newCharacter);
    //     fetch(`http://127.0.0.1:9393/characters`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newCharacter),
    //     })
    //         .then((response) => response.json())
    //         .then((character) => {
    //             character = this.sanitizeResponse([character])[0];
    //             let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === newCharacter.tempId);
    //             this.setState({
    //                 characters: [...this.state.characters, character],
    //                 newCharacters: [
    //                     ...this.state.newCharacters.slice(0, currentPos),
    //                     ...this.state.newCharacters.slice(currentPos + 1),
    //                 ],
    //             });
    //         })
    //         .catch((error) => {
    //             // TODO: Handle errors better
    //             console.error("Error:", error);
    //         });
    // };

    // cancelCreate = (tempId) => {
    //     let currentPos = this.state.newCharacters.findIndex((char) => char.tempId === tempId);

    //     this.setState({
    //         newCharacters: [
    //             ...this.state.newCharacters.slice(0, currentPos),
    //             ...this.state.newCharacters.slice(currentPos + 1),
    //         ],
    //     });
    // };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.control}>
                    <Button className={classes.bttn} onClick={this.generateNpc} variant="contained" color="primary">
                        Create New Npc
                    </Button>
                    {/* <TextField
                        className={classes.textF}
                        label="Search"
                        value={this.state.search}
                        onChange={this.updateItem}
                    /> */}
                </div>
                <GridList cellHeight="auto" className={classes.gridList} cols={1}>
                    {this.state.npcs.map((npc, i) => (
                        <GridListTile cols={1} key={npc.id}>
                            <NpcCard npc={npc} deleteNpcs={this.deleteNpcs} />
                        </GridListTile>
                    ))}
                </GridList>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(NpcContainer);
