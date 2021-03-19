import React, { useRef } from 'react';
import { Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    raffle: {
        padding: '50px 16px',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            bottom: '100%',
            right: 0,
            left: 0,
            height: 1,
            background: 'linear-gradient(to right, transparent 0%, rgba(253, 154, 249, .25) 50%, transparent 100%)',
            zIndex: 9
        },
        [theme.breakpoints.up('sm')]: {
            padding: '50px 24px',
        }
    },
    title: {
        fontSize: 32,
        marginBottom: 32,
        [theme.breakpoints.up('md')]: {
            fontSize: 40,
        }
    },
    row: {
        marginBottom: 20
    },
    input: {
        '& input ': {
            fontWeight: 500
        },
        '& label:first-letter': {
            textTransform: 'uppercase'
        },
        '&.common': {
            '& input ': {
                color: theme.palette.rarity.common
            },
            '& label ': {
                color: theme.palette.rarity.common
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.common,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.common
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.common
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.common
            }
        },
        '&.uncommon': {
            '& input ': {
                color: theme.palette.rarity.uncommon
            },
            '& label ': {
                color: theme.palette.rarity.uncommon
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.uncommon,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.uncommon
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.uncommon
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.uncommon
            }
        },
        '&.rare': {
            '& input ': {
                color: theme.palette.rarity.rare
            },
            '& label ': {
                color: theme.palette.rarity.rare
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.rare,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.rare
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.rare
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.rare
            }
        },
        '&.legendary': {
            '& input ': {
                color: theme.palette.rarity.legendary
            },
            '& label ': {
                color: theme.palette.rarity.legendary
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.legendary,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.legendary
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.legendary
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.legendary
            }
        },
        '&.mythical': {
            '& input ': {
                color: theme.palette.rarity.mythical
            },
            '& label ': {
                color: theme.palette.rarity.mythical
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.mythical,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.mythical
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.mythical
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.mythical
            }
        },
        '&.godlike': {
            '& input ': {
                color: theme.palette.rarity.godlike
            },
            '& label ': {
                color: theme.palette.rarity.godlike
            },
            '& fieldset': {
                borderColor: theme.palette.rarity.godlike,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.rarity.godlike
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.rarity.godlike
            },
            '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.rarity.godlike
            }
        }
    },
    count: {
        '&.common': { color: theme.palette.rarity.common },
        '&.uncommon': { color: theme.palette.rarity.uncommon },
        '&.rare': { color: theme.palette.rarity.rare },
        '&.legendary': { color: theme.palette.rarity.legendary },
        '&.mythical': { color: theme.palette.rarity.mythical },
        '&.godlike': { color: theme.palette.rarity.godlike }
    }
}));

export default function Raffle() {
    const classes = useStyles();

    const commonField = useRef();
    const uncommonField = useRef();
    const rareField = useRef();
    const legendaryField = useRef();
    const mythicalField = useRef();
    const godlikeField = useRef();

    const tickets = [
        { type: 'common', items: 6000 },
        { type: 'uncommon', items: 3250 },
        { type: 'rare', items: 1625 },
        { type: 'legendary', items: 450 },
        { type: 'mythical', items: 175 },
        { type: 'godlike', items: 12 },
    ];

    const onFieldChange = (event) => {
        console.log(event.target.value);
    };

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            <Grid container alignItems={'center'} spacing={2} className={classes.row}>
                <Grid item xs={12}>
                    <Typography variant='h1' align='center' className={classes.title}>Raffle #4 Calculator</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' align='center'>Your Tickets</Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket) => {
                            return <Grid item xs={4} sm={true}>
                                <TextField
                                    type="number"
                                    variant='outlined'
                                    fullWidth
                                    className={classNames(classes.input, ticket.type)}
                                    inputRef={commonField}
                                    label={ticket.type}
                                    onChange={onFieldChange} />
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems={'center'} spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography variant='h5' align='center'>Items in Raffle</Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket) => {
                            return <Grid item xs={4} sm={true}>
                                <Typography
                                    variant='h6'
                                    align='center'
                                    className={classNames(classes.count, ticket.type)}
                                >
                                    {ticket.items}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
        </Container>
    );
}