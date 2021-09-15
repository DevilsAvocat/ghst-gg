import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';
import commonUtils from '../../utils/commonUtils';

import ModalWrapper from '../ModalWrapper/ModalWrapper';

import useStyles from './styles';

const localStorage = window.localStorage;

export default function MetamaskLoginButton({size}) {
    const { connect, metaState } = useMetamask();
    const [modalOpen, setOpen] = useState(false);
    const [maticState, setMaticState] = useState(false);
    const [btnTxt, setBtnTxt] = useState('Connect');
    const classes = useStyles();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const connectWallet = useCallback(() => {
        if (!metaState.isConnected) {
            (async () => {
                try {
                    await connect(ethers.providers.Web3Provider, 'any');
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [connect, metaState]);

    const onButtonClick = () => {
        if(!metaState.isConnected) {
            connectWallet();
        } else if (!maticState) {
            switchNetwork();
        } else {
            handleOpen();
        }
    };

    const switchNetwork = () => {
        window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: '0x89'
            }]
        }).catch((err) => {
            window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x89',
                    chainName: 'MATIC',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    rpcUrls: [
                        'https://rpc-mainnet.matic.network',
                        'https://ws-matic-mainnet.chainstacklabs.com',
                        'https://rpc-mainnet.maticvigil.com/ws',
                        'https://rpc-mainnet.matic.quiknode.pro',
                        'https://matic-mainnet-full-ws.bwarelabs.com',
                        'https://matic-mainnet-archive-ws.bwarelabs.com'
                    ],
                    blockExplorerUrls: ['https://polygonscan.com/']
                }]
            })
        });
    };

    const checkConnect = () => {
        if(metaState.isConnected) {
            localStorage.setItem('isConnected', true);
            if(metaState.account[0]) setBtnTxt(commonUtils.cutAddress(metaState.account[0]));
            checkNetwork();
        } else {
            localStorage.setItem('isConnected', false);
            setBtnTxt('Connect');
        }
    }

    const checkNetwork = () => {
        if(metaState?.chain?.id == '137') setMaticState(true);
        else {
            setMaticState(false);
            setBtnTxt('Switch to Matic');
        };
    }

    useEffect( () => {
        if(localStorage.getItem('isConnected') === 'true') connectWallet();
    }, []);

    useEffect( () => {
        if (metaState.isAvailable) checkConnect();
    }, [metaState]);

    return (
        <Grid>
            <Button className={classes.button} variant='contained' color='primary' onClick={onButtonClick} size={size ? size : 'medium'}>
                {btnTxt}
            </Button>
            <ModalWrapper modalOpen={modalOpen} handleClose={handleClose} width={500}>
                <Typography variant='h5' paragraph={true}>Account</Typography>
                <Typography variant='body1' paragraph={true}>Connected via MetaMask</Typography>
                <Typography className={classes.address} variant='body1'>{metaState.account[0]}</Typography>
            </ModalWrapper>
        </Grid>
    );
}
