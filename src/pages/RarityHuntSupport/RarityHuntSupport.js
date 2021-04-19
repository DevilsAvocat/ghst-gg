import React, {useContext, useEffect, useState} from 'react';
import { Grid, Container, Box, CircularProgress, Typography, FormControl, Select, InputLabel, MenuItem, Paper } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import Web3 from 'web3';
import Constants from '../../api/common/constants.js';
import thegraph from '../../api/thegraph';
import graphUtils from '../../utils/graphUtils';
import {SnackbarContext} from '../../contexts/SnackbarContext';

import RHSGotchi from './components/RHSGotchi';
import RHSFields from './components/RHSFields';
import commonUtils from '../../utils/commonUtils';
import RHSWearable from './components/RHSWearable';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.ABI, Constants.TOKEN_ADDRESS);

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);

    const [gotchies, setGotchies] = useState([]);
    const [wearables, setWearables] = useState([]);

    const [userGotchies, setUserGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('totalRew');
    const [validAddresses, setValidAddresses] = useState([]);

    const [currentReward, setCurrentReward] = useState(0);
    const [dataSpinner, setDataSpinner] = useState(false);

    useEffect(()=> {
        getAllGotchies();
        // getWearables();
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

    const getWearablesByAddresses = async (addresses) => {
        try {
            const addressesCounter = addresses.length,
                responseArray = [];

            for (let i = 0; i < addressesCounter; i++) {
                await contract.methods.itemBalances(addresses[i]).call()
                    .then((response) => {
                        response.forEach((item)=> {
                            responseArray.push({...item, owners: [{id: addresses[i], qty: item.balance}]})
                        });
                    });
            }

            let combinedArray = responseArray.reduce((acc, val) => {
                const index = acc.findIndex(el => el.itemId === val.itemId);
                if(index !== -1){
                    acc[index].owners.push(val.owners[0]);
                } else {
                    acc.push({itemId: val.itemId, owners: val.owners});
                }
                return acc;
            }, []);

            console.log(combinedArray)

            setWearables(combinedArray);
        } catch (error) {
            setWearables([]);
        }
    };

    const loadData = (addresses) => {
        if(addresses.every((address) => Web3.utils.isAddress(address))) {
            showSnackbar('success', 'Leeroy Jenkins!');
            setValidAddresses(addresses);
            getGotchiesByAddresses(addresses);
            getWearablesByAddresses(addresses)
        } else {
            showSnackbar('error', 'One or more addresses are not correct!');
        }
    };

    const getGotchiesByAddresses = (addresses) => {
        let filtered = gotchies.filter((gotchi) => addresses.map((item)=>item.toLowerCase()).includes(gotchi.owner?.id));
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
                wearables={wearables}
            />

        </Container>
    );
}

function RenderContent({ validAddresses, userGotchies, gotchiesFilter, onGotchiesSort, currentReward, wearables }) {
    const classes = useStyles();

    const renderGotchiesHead = () => {
        if(userGotchies.length !== 0) {
            return (
                <Grid container spacing={2} style={{marginBottom: 12}}>
                    <Grid item xs={3}>
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
            <Grid container spacing={2} style={{marginBottom: 20}}>
                <Grid item xs={6}>
                    <Paper variant='outlined' style={{padding: '12px 0'}}>
                        <Typography align={'center'} variant={'h6'}>
                            Current Reward >=>
                            <Box className={classes.textHighlight} component={'span'}>
                                {currentReward}
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
            </Grid>

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