import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core';
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

export default function BaazaarSidebar({loadBaazaarGoods, defaultGoodsType, defaultOrdering}) {
    const classes = useStyles();
    const [type, setType] = useState(defaultGoodsType);
    const [rarity, setRarity] = useState('');
    const [ordering, setOrdering] = useState(defaultOrdering);
    const fromRef = useRef();
    const toRef = useRef();

    const onLoadClick = () => {
        loadBaazaarGoods({
            from: fromRef.current.value,
            to: toRef.current.value,
            type,
            rarity,
            ordering
        });
    };

    const onRarityChange = (event) => {
        setRarity(event.target.value);
    };

    const onTypeChange = (event) => {
        setType(event.target.value);
    };

    const onSortByChange = (event) => {
        setOrdering(event.target.value);
    };

    return (
        <Grid className={classes.sidebar} container item xs={12} sm={4} md={3} lg={3} xl={2} spacing={2}>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Sort by</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        label='Sort by'
                        value={ordering}
                        onChange={onSortByChange}
                    >
                        <MenuItem value={'priceInWei-asc'}>Price: lowest first</MenuItem>
                        <MenuItem value={'priceInWei-desc'}>Price: highest first</MenuItem>
                        <MenuItem value={'timeCreated-desc'}>Latest</MenuItem>
                        <MenuItem value={'timeCreated-asc'}>Oldest</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Price</Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth inputRef={fromRef} label='From' variant='outlined' />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth inputRef={toRef} label='To' variant='outlined' />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Type</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        label='Type'
                        value={type}
                        onChange={onTypeChange}
                    >
                        <MenuItem value={'erc721Listings-0'}>Closed portal</MenuItem>
                        <MenuItem value={'erc721Listings-2'}>Open portal</MenuItem>
                        <MenuItem value={'erc721Listings-3'}>Aavegotchi</MenuItem>
                        <MenuItem value={'erc1155Listings-0'}>Wearable</MenuItem>
                        <MenuItem value={'erc1155Listings-2'}>Consumable</MenuItem>
                        <MenuItem value={'erc1155Listings-3'}>Tickets</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'caption'}>Rarity</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel>Rarity</InputLabel>
                    <Select
                        label='Rarity'
                        value={rarity}
                        onChange={onRarityChange}
                    >
                        <MenuItem value={''}><em>All</em></MenuItem>
                        <MenuItem className={classes.common} value={'0'}>Common</MenuItem>
                        <MenuItem className={classes.uncommon} value={'1'}>Uncommon</MenuItem>
                        <MenuItem className={classes.rare} value={'2'}>Rare</MenuItem>
                        <MenuItem className={classes.legendary} value={'3'}>Legendary</MenuItem>
                        <MenuItem className={classes.mythical} value={'4'}>Mythical</MenuItem>
                        <MenuItem className={classes.godlike} value={'5'}>Godlike</MenuItem>
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
