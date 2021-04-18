import React, {useContext, useEffect, useState} from 'react';
import { Grid, Container, Box, CircularProgress, Typography, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import Web3 from 'web3';
import thegraph from '../../api/thegraph';
import graphUtils from '../../utils/graphUtils';
import {SnackbarContext} from '../../contexts/SnackbarContext';

import RHSGotchi from './components/RHSGotchi';
import RHSFields from './components/RHSFields';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);
    const [gotchies, setGotchies] = useState([]);
    const [userGotchies, setUserGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('totalRew');
    const [validAddresses, setValidAddresses] = useState([]);
    const [currentReward, setCurrentReward] = useState(0);
    const [dataSpinner, setDataSpinner] = useState(false);

    useEffect(()=> {
        getAllGotchies();
    }, []);

    // Get all gotchies from TheGraph and calculate rewards
    const getAllGotchies = () => {
        setDataSpinner(true);
        thegraph.getAllGotchies()
            .then((gotchies) => {
                let rscLeaders = graphUtils.sortGotchies(gotchies, 'modifiedRarityScore');
                let kinLeaders = graphUtils.sortGotchies(gotchies, 'kinship');
                let expLeaders = graphUtils.sortGotchies(gotchies, 'experience');

                gotchies.forEach((item, index)=>{
                    gotchies[index] = {
                        ...item,
                        rscRew: graphUtils.calculateRewards(rscLeaders.indexOf(gotchies[index]) + 1, 'RSC'),
                        kinRew: graphUtils.calculateRewards(kinLeaders.indexOf(gotchies[index]) + 1, 'KIN'),
                        expRew: graphUtils.calculateRewards(expLeaders.indexOf(gotchies[index]) + 1, 'EXP'),
                        totalRew: graphUtils.calculateRewards(rscLeaders.indexOf(gotchies[index]) + 1, 'RSC') + graphUtils.calculateRewards(kinLeaders.indexOf(gotchies[index]) + 1, 'KIN') + graphUtils.calculateRewards(expLeaders.indexOf(gotchies[index]) + 1, 'EXP')
                    }
                });

                setGotchies(gotchies);
                setDataSpinner(false);
            });
    }

    const loadData = (addresses) => {
        if(addresses.every((address) => Web3.utils.isAddress(address))) {
            showSnackbar('success', 'Leeroy Jenkins!');
            setValidAddresses(addresses);
            getGotchiesByAddresses(addresses);
        } else {
            showSnackbar('error', 'One or more addresses are not correct!');
        }
    };

    const getGotchiesByAddresses = (addresses) => {
        let filtered = gotchies.filter((gotchi) => addresses.includes(gotchi.owner?.id));
        setUserGotchies(graphUtils.sortGotchies(filtered, gotchiesFilter));
        calculateCurrentRew(filtered);
    };

    const onGotchiesSort = (event) => {
        setUserGotchies(graphUtils.sortGotchies(userGotchies, event.target.value));
        setGotchiesFilter(event.target.value);
    };

    const calculateCurrentRew = (gotchies) => {
        let reward = gotchies.reduce((prev, next) => prev + next.totalRew, 0);
        setCurrentReward(reward);
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Rarity Hunt Support</title>
            </Helmet>

            {dataSpinner ? (
                <Grid container justify={'center'}>
                    <Typography variant={'body1'}>Summoning all ghosts ...</Typography>
                    <CircularProgress color='primary' size={20} style={{marginLeft: 5}} />
                </Grid>
            ) : (
                <Grid>
                    <Typography variant={'body1'} style={{marginBottom: 12}}>Fill up to 10 addresses</Typography>
                    <RHSFields loadData={loadData} validAddresses={validAddresses} />
                </Grid>
            )}

            <RenderContent
                validAddresses={validAddresses}
                userGotchies={userGotchies}
                gotchiesFilter={gotchiesFilter}
                onGotchiesSort={onGotchiesSort}
                currentReward={currentReward}
            />

        </Container>
    );
}

function RenderContent({ validAddresses, userGotchies, gotchiesFilter, onGotchiesSort, currentReward }) {
    const classes = useStyles();

    if (validAddresses.length === 0) {
        return null;
    }

    return (
        <Box>
            <Grid container spacing={2} style={{marginBottom: 20}}>
                <Grid item xs={6}>
                    <Typography align={'center'} variant={'h6'}>
                        Current Reward >=>
                        <Box className={classes.textHighlight} component={'span'}>
                            {currentReward}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align={'center'} variant={'h6'}>
                        Possible Reward >=>
                        <Box className={classes.textHighlight} component={'span'}>
                            Coming soon...
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{marginBottom: 12}}>
                <Grid item xs={3}>
                    <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                        <InputLabel>Filter by:</InputLabel>
                        <Select
                            label={'Filter by:'}
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

            <Grid container spacing={2}>
                {
                    userGotchies.map((gotchi, i)=>{
                        return <Grid item xs={2} key={i}>
                            <RHSGotchi gotchi={gotchi} validAddresses={validAddresses} />
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    );
}