import React, { useRef, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        alignContent: 'start',
        padding: 30
    },
    formControl: {
        width: '100%'
    },
    common: {
        color: theme.palette.rarity.common
    },
    uncommon: {
        color: theme.palette.rarity.uncommon
    },
    rare: {
        color: theme.palette.rarity.rare
    },
    legendary: {
        color: theme.palette.rarity.legendary
    },
    mythical: {
        color: theme.palette.rarity.mythical
    },
    godlike: {
        color: theme.palette.rarity.godlike
    }
}));

export default function BaazaarSidebar({loadBaazaarGoods}) {
    const classes = useStyles();
    const [type, setType] = useState('');
    const [rarity, setRarity] = useState('');
    // const [sortBy, setSortBy] = useState('asc');
    // const sortByRef = useRef();
    const fromRef = useRef();
    const toRef = useRef();
    const typeRef = useRef();
    const rarityRef = useRef();

    const onLoadClick = () => {
        loadBaazaarGoods({
            from: fromRef.current.value,
            to: toRef.current.value,
            type,
            rarity
        });
    };

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    }

    const onTypeChange = (event) => {
        setType(event.target.value);
    }

    return (
        <Grid className={classes.sidebar} container item xs={12} sm={4} md={3} lg={3} xl={2} spacing={2}>
            {/*<Grid item xs={12}>*/}
            {/*    <Typography variant={'caption'}>Sort by</Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12}>*/}
            {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
            {/*        <InputLabel>Sort by</InputLabel>*/}
            {/*        <Select*/}
            {/*            label="Sort by"*/}
            {/*            ref={rarityRef}*/}
            {/*            value={sortBy}*/}
            {/*            onChange={onRarityChange}*/}
            {/*        >*/}
            {/*            <MenuItem value={'asc'}>Price: lowest first</MenuItem>*/}
            {/*            <MenuItem value={'desc'}>Price: highest first</MenuItem>*/}
            {/*            <MenuItem value={'last'}>Last added</MenuItem>*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
                <Typography variant={'caption'}>Price</Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth inputRef={fromRef} label="From" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth inputRef={toRef} label="To" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Type</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        label="Type"
                        ref={typeRef}
                        value={type}
                        onChange={onTypeChange}
                    >
                        <MenuItem value={''}><em>All</em></MenuItem>
                        <MenuItem value={'wearable'}>Wearable</MenuItem>
                        <MenuItem value={'closed_portal'}>Closed portal</MenuItem>
                        <MenuItem value={'open_portal'}>Open portal</MenuItem>
                        <MenuItem value={'aavegotchi'}>Aavegotchi</MenuItem>
                        <MenuItem value={'consumable'}>Consumable</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Rarity</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Rarity</InputLabel>
                    <Select
                        label="Rarity"
                        ref={rarityRef}
                        value={rarity}
                        onChange={onRarityChange}
                    >
                        <MenuItem value={''}><em>All</em></MenuItem>
                        <MenuItem className={classes.common} value={'common'}>Common</MenuItem>
                        <MenuItem className={classes.uncommon} value={'uncommon'}>Uncommon</MenuItem>
                        <MenuItem className={classes.rare} value={'rare'}>Rare</MenuItem>
                        <MenuItem className={classes.legendary} value={'legendary'}>Legendary</MenuItem>
                        <MenuItem className={classes.mythical} value={'mythical'}>Mythical</MenuItem>
                        <MenuItem className={classes.godlike} value={'godlike'}>Godlike</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    onClick={() => onLoadClick()}
                >
                    Load
                </Button>
            </Grid>
        </Grid>
    );
}
