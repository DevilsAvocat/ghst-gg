import React, {useEffect, useState} from 'react';
import { Grid, Container, CircularProgress, Typography } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import thegraph from '../../api/thegraph';
import graphUtils from '../../utils/graphUtils';

import RHSGotchi from './components/RHSGotchi';
import RHSFields from './components/RHSFields';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const [gotchies, setGotchies] = useState([]);
    const [userGotchies, setUserGotchies] = useState([]);
    const [validAddresses, setValidAddresses] = useState([]);
    const [dataSpinner, setDataSpinner] = useState(false);

    useEffect(()=> {
        getAllGotchies();
    }, []);

    useEffect(()=> {
        loadData();
    }, [validAddresses]);

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

    const loadData = () => {
        let filteredGotchies = gotchies.filter((gotchi) => validAddresses.includes(gotchi.owner?.id));

        setUserGotchies(filteredGotchies);
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Rarity Hunt Support</title>
            </Helmet>

            {dataSpinner ? (
                <Grid container justify={'center'}>
                    <Typography variant={'body2'}>Summoning all ghosts ...</Typography>
                    <CircularProgress color='primary' size={20} style={{marginLeft: 5}} />
                </Grid>
            ) : (
                <Grid>
                    <Typography variant={'body1'} style={{marginBottom: 12}}>Fill up to 10 addresses</Typography>
                    <RHSFields setValidAddresses={setValidAddresses} />
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