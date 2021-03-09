import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3'
import Constants from './constants.js';

import openedPortal from '../../../../assets/images/portal-opened.gif';
import sealedPortal from '../../../../assets/images/portal-sealed.svg';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.MIN_ABI, Constants.TOKEN_ADDRESS);

const useStyles = makeStyles((theme) => ({
    portalsColumn: {
        marginBottom: 30,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        }
    },
    portalsDescr: {
        fontSize: 24,
        [theme.breakpoints.up('md')]: {
            fontSize: 30
        }
    },
    portalsImage: {
        cursor: 'pointer',
        width: '150px'
    },
    highlight: {
        color: theme.palette.primary.main
    }
}));

export default function Portals() {
    const classes = useStyles();
    const [portals, setPortals] = useState(0);
    const [eegg, setEegg] = useState(false);

    useEffect(() => {
        contract.methods.balanceOf(Constants.WALLET_ADDRESS).call()
            .then(function (value) {
                var portalsNumber = Math.round(web3.utils.fromWei(value) * 10000);
                setPortals(portalsNumber);
            });
    });

    function onPortalClick() {
        setEegg(!eegg);
    }

    return (
        <Grid
            container
            direction={'row'}
            alignItems={'center'}
            justify={'center'}
        >
            <Grid className={classes.portalsColumn} item xs={12} md={4}>
                <Typography align='center' className={classes.portalsDescr}>
                    <Box component='span' className={classes.highlight}>{ eegg ? portals : 10000 - portals }</Box>
                    <Box component='span' m={2}>out of</Box>
                    <Box component='span' className={classes.highlight}>10000</Box>
                </Typography>
                <Typography align='center' className={classes.portalsDescr}>
                    Are {eegg ? 'sealed' : 'opened' }!
                </Typography>
            </Grid>
            <Grid className={classes.portalsColumn} container item justify='center' xs={12} md={2}>
                <img
                  src={eegg ? sealedPortal : openedPortal }
                  className={classes.portalsImage}
                  onClick={onPortalClick}
                  alt='Portal'
                />
            </Grid>
            <Grid container item justify='center' xs={12} md={4}>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    className={classes.portalsButton}
                >
                    Ghosts Explorer
                </Button>
            </Grid>
        </Grid>
    );
}