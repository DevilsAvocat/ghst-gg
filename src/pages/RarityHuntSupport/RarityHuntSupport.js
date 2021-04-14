import React, {useContext, useEffect, useState} from 'react';
import { Grid, Container, TextField, CircularProgress, Button, Typography } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import thegraph from '../../api/thegraph';
import {ownedGotchiesQuery} from './data/queries';
import RHSGotchi from './components/RHSGotchi';
import {SnackbarContext} from '../../contexts/SnackbarContext';
import graphUtils from '../../utils/graphUtils';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);
    const [gotchies, setGotchies] = useState([]);
    const [userGotchies, setUserGotchies] = useState([]);
    const [currentAddress, setCurrentAddress] = useState('');
    const [dataSpinner, setDataSpinner] = useState(false);
    const [gotchiesSpinner, setGotchiesSpinner] = useState(false);

    useEffect(()=> {
        getAllGotchies();
    }, []);

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

    // Get gotchis by owner address
    const getGraphData = (address) => {
        setGotchiesSpinner(true);
        thegraph.getData(ownedGotchiesQuery(address))
            .then((response) => {
                if(response.data.user) {
                    setUserGotchies(response.data.user.gotchisOwned);
                } else {
                    setUserGotchies([]);
                    showSnackbar('error', 'Address is not correct!');
                }
                setGotchiesSpinner(false);
            });
    };

    // Find specific gotchis from list by id
    const getGotchiFromList = (gotchi) => {
        return gotchies.find(x => x.id === gotchi.id);
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
                <Grid container alignItems={'center'} justify={'center'} spacing={2} style={{marginBottom: 20}}>
                    <Grid item xs={6}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={'Address'}
                            onChange={(event) => {
                                setCurrentAddress(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth
                            onClick={() => {
                                getGraphData(currentAddress);
                            }}
                        >
                            Fire!
                        </Button>
                    </Grid>
                </Grid>
            )}
            {gotchiesSpinner ? (
                <Grid container justify={'center'}>
                    <CircularProgress color='primary' size={20} />
                </Grid>
            ) : (
                <Grid container>
                    {
                        userGotchies.map((gotchi, i)=>{
                            return <Grid item xs={2} key={i} >
                                <RHSGotchi gotchi={getGotchiFromList(gotchi)}  />
                            </Grid>
                        })
                    }
                </Grid>
            )}
        </Container>
    );
}