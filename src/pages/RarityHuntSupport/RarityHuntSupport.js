import React, {useContext, useState} from 'react';
import { Grid, Container, TextField, CircularProgress, Button } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import thegraph from '../../api/thegraph';
import {ownedGotchiesQuery} from './data/queries';
import RHSGotchi from './components/RHSGotchi';
import {SnackbarContext} from '../../contexts/SnackbarContext';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);
    const [gotchiList, setGotchiList] = useState([]);
    const [currentAddress, setCurrentAddress] = useState('');
    const [dataSpinner, setDataSpinner] = useState(false);

    const getGraphData = (address) => {
        setDataSpinner(true);
        thegraph.getData(ownedGotchiesQuery(address))
            .then((response) => {
                if(response.data.user) {
                    console.log(response.data.user.gotchisOwned);
                    setGotchiList(response.data.user.gotchisOwned);
                } else {
                    setGotchiList([]);
                    showSnackbar('error', 'Address is not correct!');
                }
                setDataSpinner(false);
            });
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Rarity Hunt Support</title>
            </Helmet>
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
            {dataSpinner ? (
                <Grid container justify={'center'}>
                    <CircularProgress color='primary' size={20} />
                </Grid>
            ) : (
                <Grid container>
                    {
                        gotchiList.map((gotchi, i)=>{
                            return <Grid item xs={2} key={i} >
                                <RHSGotchi gotchi={gotchi} />
                            </Grid>
                        })
                    }
                </Grid>
            )}
        </Container>
    );
}