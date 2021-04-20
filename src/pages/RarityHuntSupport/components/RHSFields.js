import React, {useState} from 'react';
import { Grid, TextField, Button, IconButton, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';

import Close from '@material-ui/icons/Close';

export default function RHSFields({validAddresses, loadData}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useState(['']);

    const fillAddress = (value, index) => {
        let addressesCache = [...addresses];
        addressesCache[index] = value;
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

    return (
        <Grid container spacing={2} style={{marginBottom: 20}}>
            <Grid item xs={12}>
                <Typography variant={'body1'}>Fill up to 10 addresses</Typography>
            </Grid>
            <Grid container item spacing={2} xs={9}>
                {
                    addresses.map((address, i)=>{
                        return <Grid item xs={4} key={i}>
                            <TextField
                                type='text'
                                variant='outlined'
                                fullWidth
                                size={'small'}
                                label={`address ${i + 1}`}
                                value={address}
                                disabled={address === validAddresses[i]}
                                className={classNames(classes.addressField, `color-${i + 1}`, address === validAddresses[i] && 'highlighted')}
                                onChange={(event) => {
                                    fillAddress(event.target.value, i);
                                }}
                                InputProps={{
                                    endAdornment: <IconButton disabled={addresses.length === 1} size={'small'} onClick={() => deleteField(i)}>
                                        <Close/>
                                    </IconButton>
                                }}
                            />
                        </Grid>
                    })
                }
            </Grid>
            <Grid container item xs={3} spacing={2}>
                <Grid item xs={4} className={classes.buttonsAlignment}>
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
                <Grid item xs={8}>
                    <Button
                        className={classes.fieldsButton}
                        variant={'contained'}
                        color={'primary'}
                        fullWidth
                        onClick={() => loadData(addresses)}
                    >
                        Fetch data!
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}