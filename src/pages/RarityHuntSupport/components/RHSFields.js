import React, {useContext, useState} from 'react';
import { Grid, TextField, Button, IconButton } from '@material-ui/core';
import {useStyles} from '../styles';
import {SnackbarContext} from '../../../contexts/SnackbarContext';
import Web3 from 'web3';

import Close from '@material-ui/icons/Close';

export default function RHSFields({setValidAddresses}) {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);
    const [addresses, setAddresses] = useState(['']);

    const fillAddress = (value, index) => {
        let addressesCache = [...addresses];
        addressesCache[index] = value.toLowerCase();
        setAddresses(addressesCache);
    };

    const deleteField = (index) => {
        let addressesCache = [...addresses];
        addressesCache.splice(index, 1);
        setAddresses(addressesCache);
    };

    const addMoreFields = () => {
        if(addresses.length < 10) {
            setAddresses([...addresses, '']);
        }
    };

    const loadAddresses = () => {
        // TODO: handle last input (correct every time)
        let addressesCorrect = false;

        addresses.forEach((address) => {
            if(Web3.utils.isAddress(address)) {
                addressesCorrect = true;
                showSnackbar('success', 'Leeroy Jenkins!');
            } else {
                addressesCorrect = false;
                showSnackbar('error', 'One or more addresses are not correct!');
            }
        });

        if(addressesCorrect) {
            setValidAddresses(addresses);
        }
    };

    return (
        <Grid container spacing={2} style={{marginBottom: 20}}>
            {
                addresses.map((address, i)=>{
                    return <Grid item xs={3} key={i}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={`address ${i + 1}`}
                            value={address}
                            onChange={(event) => {
                                fillAddress(event.target.value, i);
                            }}
                            InputProps={{
                                endAdornment: <IconButton size={'small'} onClick={() => deleteField(i)}>
                                    <Close/>
                                </IconButton>
                            }}
                        />
                    </Grid>
                })
            }
            <Grid item xs={1}>
                <Button
                    className={classes.fieldsButton}
                    disabled={addresses.length > 9}
                    variant={'outlined'}
                    color={'primary'}
                    fullWidth
                    onClick={addMoreFields}
                >
                    Add
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    className={classes.fieldsButton}
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    onClick={loadAddresses}
                >
                    Summon data!
                </Button>
            </Grid>
        </Grid>
    )
}