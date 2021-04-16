import React, {useContext, useEffect, useState} from 'react';
import { Grid, Container, CircularProgress, Typography } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import Web3 from 'web3';
import thegraph from '../../api/thegraph';
import graphUtils from '../../utils/graphUtils';

import RHSGotchi from './components/RHSGotchi';
import RHSFields from './components/RHSFields';
import {SnackbarContext} from '../../contexts/SnackbarContext';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);
    const [gotchies, setGotchies] = useState([]);
    const [userGotchies, setUserGotchies] = useState([]);
    const [dataSpinner, setDataSpinner] = useState(false);

    useEffect(()=> {
        getAllGotchies();
    }, []);

    // Get all gotchies from TheGraph and calculate rewards
    const getAllGotchies = () => {
        setDataSpinner(true);
        thegraph.getAllGotchies()
            .then((gotchies) => {
                let brsLeaders = graphUtils.sortGotchies(gotchies, 'modifiedRarityScore');
                let kinLeaders = graphUtils.sortGotchies(gotchies, 'kinship');
                let expLeaders = graphUtils.sortGotchies(gotchies, 'experience');

                gotchies.forEach((item, index)=>{
                    gotchies[index] = {
                        ...item,
                        brsRew: graphUtils.calculateRewards(brsLeaders.indexOf(gotchies[index]) + 1, 'BRS'),
                        kinRew: graphUtils.calculateRewards(kinLeaders.indexOf(gotchies[index]) + 1, 'KIN'),
                        expRew: graphUtils.calculateRewards(expLeaders.indexOf(gotchies[index]) + 1, 'EXP')
                    }
                });

                setGotchies(gotchies);
                setDataSpinner(false);
            });
    }

    const loadData = (addresses) => {
        if(addresses.every((address) => Web3.utils.isAddress(address))) {
            showSnackbar('success', 'Leeroy Jenkins!');
            filterGotchiesByAddresses(addresses);
        } else {
            showSnackbar('error', 'One or more addresses are not correct!');
        }
    };

    const filterGotchiesByAddresses = (addresses) => {
        setUserGotchies(gotchies.filter((gotchi) => addresses.includes(gotchi.owner?.id)));
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
                    <RHSFields loadData={loadData} />
                </Grid>
            )}

            <Grid container>
                {
                    userGotchies.map((gotchi, i)=>{
                        return <Grid item xs={2} key={i} >
                            <RHSGotchi gotchi={gotchi}  />
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    );
}