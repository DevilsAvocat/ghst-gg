import React, {useState} from 'react';
import { Grid, TextField, Button, IconButton, Typography, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    addressField: {
        '&.highlighted.color-1': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color1,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color1,
                },
            },
        },
        '&.highlighted.color-2': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color2,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color2,
                },
            },
        },
        '&.highlighted.color-3': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color3,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color3,
                },
            },
        },
        '&.highlighted.color-4': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color4,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color4,
                },
            },
        },
        '&.highlighted.color-5': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color5,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color5,
                },
            },
        },
        '&.highlighted.color-6': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color6,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color6,
                },
            },
        },
        '&.highlighted.color-7': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color7,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color7,
                },
            },
        },
        '&.highlighted.color-8': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color8,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color8,
                },
            },
        },
        '&.highlighted.color-9': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color9,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color9,
                },
            },
        },
        '&.highlighted.color-10': {
            '& label.Mui-focused': {
                color: theme.palette.accounts.color10,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.accounts.color10,
                },
            },
        }
    },
    fieldsButton: {
        padding: '7px 15px'
    }
}));

export default function ClientFields({validAddresses, loadData}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useState(validAddresses);

    const fillAddress = (value, index) => {
        let addressesCache = [...addresses];
        addressesCache[index] = value;
        setAddresses(addressesCache);
    };

    const deleteField = (index) => {
        let addressesCache = [...addresses];
        addressesCache.splice(index, 1);
        addresses.length === 1 ? setAddresses(['']) : setAddresses(addressesCache);
    };

    const addMoreFields = () => {
        if(addresses.length < 10) {
            setAddresses([...addresses, '']);
        }
    };

    return (
        <Grid container spacing={2} style={{marginBottom: 12}}>
            <Grid item xs={12}>
                <Typography variant={'body1'}>Fill up to 10 addresses</Typography>
            </Grid>
            {
                addresses.map((address, i)=>{
                    return <Grid item xs={12} sm={6} md={3} key={i}>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            size={'small'}
                            label={`address ${i + 1}`}
                            value={address}
                            disabled={validAddresses[i]?.length !== 0 && address === validAddresses[i]}
                            className={classNames(classes.addressField, `color-${i + 1}`, address === validAddresses[i] && 'highlighted')}
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
            <Grid container item xs={12} sm={6} md={3} style={{marginLeft: 'auto'}}>
                <Grid item xs={4}>
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
                <Grid item xs={8} style={{paddingLeft: 16}}>
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