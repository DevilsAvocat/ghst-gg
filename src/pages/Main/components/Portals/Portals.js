import React, { useEffect, useState } from 'react';
import Constants from "./constants.js";
import Web3 from 'web3'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import openedPortal from '../../../../assets/images/portal-opened.gif';
import sealedPortal from '../../../../assets/images/portal-sealed.svg';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.MIN_ABI, Constants.TOKEN_ADDRESS);

const useStyles = makeStyles(() => ({
    wrap: {
        padding: '50px 0'
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
            spacing={2}
            className={classes.wrap}
        >
            <Grid item xs={4}>
                <Typography style={{ fontSize: '30px', textAlign: 'center' }}>
                  <span style={{ color: '#fd9af9' }}>{ eegg ? portals : 10000 - portals }</span> out of <span style={{ color: '#fd9af9' }}>10000</span><br /> Are {eegg ? 'sealed' : 'opened' }!
                </Typography>
            </Grid>
            <Grid style={{textAlign: 'center'}} item xs={2}>
                <img
                  src={eegg ? sealedPortal : openedPortal }
                  style={{ width: '150px', cursor: 'pointer' }}
                  onClick={onPortalClick}
                  alt='Portal'
                />
            </Grid>
            <Grid item xs={4}>
                <Typography align={"center"} style={{ fontSize: '30px' }}>
                  {eegg ? 'More are incoming...' : 'Ghosts spawned!' }
                </Typography>
            </Grid>
        </Grid>
    );
}