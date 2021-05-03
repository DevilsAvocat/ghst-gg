import React, {useState} from 'react';
import { Grid, Box, Typography, FormControl, Select, InputLabel, MenuItem, Paper, Button } from '@material-ui/core';
import {useStyles} from '../styles';
import thegraph from '../../../api/thegraph';
import graphUtils from '../../../utils/graphUtils';
import commonUtils from '../../../utils/commonUtils';
import classNames from 'classnames';
import ghst from '../../../assets/images/ghst-doubleside.gif';

import RHSGotchi from './RHSGotchi';
import RHSItem from './RHSItem';

export default function RHSContent({validAddresses, gotchies, gotchiesFilter, inventory, inventoryFilter,
                                       onGotchiesSort, onInventorySort, setIsRewardCalculating, isDataLoading}) {
    const classes = useStyles();
    const [totalReward, setTotalReward] = useState(0);
    const showPlaceholder = validAddresses[0].length !== 0 && !isDataLoading();

    const calculateReward = () => {
        setIsRewardCalculating(true);
        thegraph.getAllGotchies().then((allGotchies)=>{
            let rscLeaders = commonUtils.basicSort(allGotchies, 'withSetsRarityScore');
            let kinLeaders = commonUtils.basicSort(allGotchies, 'kinship');
            let expLeaders = commonUtils.basicSort(allGotchies, 'experience');

            gotchies.forEach((item, index)=>{
                let resRew = graphUtils.calculateRewards(rscLeaders.findIndex(x => x.id === item.id), 'RSC');
                let kinRew = graphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
                let expRew = graphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');

                gotchies[index] = {
                    ...item,
                    rscRew: resRew,
                    kinRew: kinRew,
                    expRew: expRew,
                    totalRew: resRew + kinRew + expRew
                }
            });

            setTotalReward(gotchies.reduce((prev, next) => prev + next.totalRew, 0));
            setIsRewardCalculating(false);
        });
    };

    const renderGotchiesHead = () => {
        if(gotchies.length !== 0) {
            return (
                <Grid container spacing={2} style={{marginBottom: 12}}>
                    <Grid item xs={6} md={3} style={{marginTop: 4}}>
                        <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                label={'Order by:'}
                                value={gotchiesFilter}
                                onChange={onGotchiesSort}
                            >
                                {/*<MenuItem value={'totalRew'}>Current reward</MenuItem>*/}
                                <MenuItem value={'withSetsRarityScore'}>RS (modified)</MenuItem>
                                <MenuItem value={'baseRarityScore'}>RS (base)</MenuItem>
                                <MenuItem value={'kinship'}>KIN</MenuItem>
                                <MenuItem value={'experience'}>EXP</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        } else if (showPlaceholder) {
            return (
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'primary'}
                >
                    To earn some prizes you should get at least 1 ghost!
                </Typography>
            )
        } else {
            return null;
        }
    }

    const renderInventoryHead = () => {
        if(inventory.length !== 0) {
            return (
                <Grid container spacing={2} style={{marginTop: 12, marginBottom: 8}}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>
                            Inventory items:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                label={'Order by:'}
                                value={inventoryFilter}
                                onChange={onInventorySort}
                            >
                                <MenuItem value={'desc'}>Rarity (godlike -> common)</MenuItem>
                                <MenuItem value={'asc'}>Rarity (common -> godlike)</MenuItem>
                                <MenuItem value={'qty'}>Quantity</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        } else if (showPlaceholder) {
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
        } else {
            return null;
        }
    }

    const renderRewardPaper = () => {
        if(totalReward !== 0) {
            return (
                <Grid item xs={12} md={6}>
                    <Paper variant='outlined' align='center' style={{padding: 12}}>
                        <Typography align={'center'} variant={'h6'}>
                            Total Reward >=>
                            <Box className={classNames(classes.textHighlight, classes.tokenValue)} component={'span'}>
                                {totalReward}
                                <img src={ghst} width='26' alt='GHST Token Icon' />
                            </Box>
                        </Typography>
                    </Paper>
                </Grid>
            )
        } else {
            return null;
        }
    }

    if (validAddresses.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container alignItems={'center'} spacing={2} style={{marginBottom: 12, minHeight: 74}}>
                <Grid item xs={12} md={6}>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        onClick={calculateReward}
                        style={{marginRight: 16}}
                    >
                        Calculate Reward
                    </Button>
                    <Button
                        disabled={true}
                        color={'primary'}
                        variant={'contained'}
                        size={'large'}
                    >
                        Get Support
                    </Button>
                </Grid>
                {renderRewardPaper()}
            </Grid>

            {renderGotchiesHead()}

            <Grid container spacing={2}>
                {
                    gotchies.map((gotchi, i)=>{
                        return <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <RHSGotchi gotchi={gotchi} validAddresses={validAddresses} />
                        </Grid>
                    })
                }
            </Grid>

            {renderInventoryHead()}

            <Grid container spacing={2}>
                {
                    inventory.map((item, i)=>{
                        return <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <RHSItem item={item} validAddresses={validAddresses}/>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    );
}