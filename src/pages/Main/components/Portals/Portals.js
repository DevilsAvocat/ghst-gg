import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
        fontSize: 24
    },
    portalsImage: {
        cursor: 'pointer',
        width: 150,
        height: 150
    },
    explorerLink: {
        display: 'inline-block',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: '50%',
            opacity: .3,
            transform: 'translateX(-50%)',
            transition: 'all .3s ease-in-out',
            width: 0,
            height: 1,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main
        },
        '&:hover::after': {
            opacity: 1,
            width: '100%'
        }
    },
    highlight: {
        color: theme.palette.primary.main
    }
}));

export default function Portals() {
    const classes = useStyles();
    const [portals, setPortals] = useState(0);
    const [eegg, setEegg] = useState(false);
    const history = useHistory();

    useEffect(() => {
        contract.methods.balanceOf(Constants.WALLET_ADDRESS).call()
            .then(function (value) {
                var portalsNumber = Math.round(web3.utils.fromWei(value) * 10000);
                setPortals(portalsNumber);
            });
    });
    
    const getOpenedPortals = () => {
        return 10000 - portals;
    };
    
    const getPortalsPerc = () => {
        var num = (getOpenedPortals() / 10000 * 100).toFixed(2);
        return num + '%';
    };

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
                    <Box component='span' className={classes.highlight}>{ eegg ? portals : getPortalsPerc() }</Box>
                    <Box component='span'>{ eegg ? '/10000 are sealed!' : ' portals are opened!' }</Box>
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
            <Grid item justify='center' xs={12} md={4}>
                <Typography align='center' className={classes.portalsDescr}>
                    <Box component='span' className={classes.highlight}>4 619</Box>
                    <Box component='span'> gotchis are sumonned </Box>
                    <Link className={classes.explorerLink} onClick={() => history.push('/explorer')}>Aavegotchi Explorer</Link>
                </Typography>
            </Grid>
        </Grid>
    );
}