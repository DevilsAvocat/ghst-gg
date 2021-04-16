import React, {useState} from 'react';
import { Grid, TextField, Button, IconButton } from '@material-ui/core';
import {useStyles} from '../styles';

import Close from '@material-ui/icons/Close';

export default function RHSFields({loadData}) {
    const classes = useStyles();
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
                                endAdornment: <IconButton disabled={addresses.length === 1} size={'small'} onClick={() => deleteField(i)}>
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
                    onClick={() => loadData(addresses)}
                >
                    Fetch data!
                </Button>
            </Grid>
        </Grid>
    )
}