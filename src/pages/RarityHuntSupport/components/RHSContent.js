import React, {useState} from 'react';
import { Grid, Box, Typography, FormControl, Select, InputLabel, MenuItem, Paper } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';
import ghst from '../../../assets/images/ghst-doubleside.gif';

import RHSGotchi from './RHSGotchi';
import RHSWearable from './RHSWearable';

export default function RHSContent({validAddresses, userGotchies, gotchiesFilter, onGotchiesSort, currentReward, wearables}) {
    const classes = useStyles();

    const renderGotchiesHead = () => {
        if(userGotchies.length !== 0) {
            return (
                <Grid container spacing={2} style={{marginBottom: 12}}>
                    <Grid item xs={6}>
                        <Paper variant='outlined' style={{padding: '12px 0'}}>
                            <Typography align={'center'} variant={'h6'}>
                                Current Reward >=>
                                <Box className={classNames(classes.textHighlight, classes.tokenValue)} component={'span'}>
                                    {currentReward}
                                    <img src={ghst} width='26' alt='GHST Token Icon' />
                                </Box>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper variant='outlined' style={{padding: '12px 0'}}>
                            <Typography align={'center'} variant={'h6'}>
                                Possible Reward >=>
                                <Box className={classes.textHighlight} component={'span'}>
                                    Coming soon...
                                </Box>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3} style={{marginTop: 8}}>
                        <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                label={'Order by:'}
                                value={gotchiesFilter}
                                onChange={onGotchiesSort}
                            >
                                <MenuItem value={'totalRew'}>Current reward</MenuItem>
                                <MenuItem value={'modifiedRarityScore'}>RS (modified)</MenuItem>
                                <MenuItem value={'baseRarityScore'}>RS (base)</MenuItem>
                                <MenuItem value={'kinship'}>KIN</MenuItem>
                                <MenuItem value={'experience'}>EXP</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'primary'}
                >
                    To earn some prizes you should get at least 1 ghost!
                </Typography>
            )
        }
    }

    const renderWearablesHead = () => {
        if(wearables.length !== 0) {
            return (
                <Typography
                    variant={'h6'}
                    style={{marginTop: 20}}
                >
                    Inventory items:
                </Typography>
            )
        } else {
            return (
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'primary'}
                    style={{marginTop: 20}}
                >
                    Your inventory is empty :(
                </Typography>
            )
        }
    }

    if (validAddresses.length === 0) {
        return null;
    }

    return (
        <Box>
            {renderGotchiesHead()}

            <Grid container spacing={2}>
                {
                    userGotchies.map((gotchi, i)=>{
                        return <Grid item xs={2} key={i}>
                            <RHSGotchi gotchi={gotchi} validAddresses={validAddresses} />
                        </Grid>
                    })
                }
            </Grid>

            {renderWearablesHead()}

            <Grid container spacing={2}>
                {
                    wearables.map((wearable, i)=>{
                        return <Grid item xs={2} key={i}>
                            <RHSWearable wearable={wearable} validAddresses={validAddresses}/>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    );
}