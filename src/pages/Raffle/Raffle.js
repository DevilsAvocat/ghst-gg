import React, { useState } from 'react';
import { Container, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStyles } from './styles';

export default function Raffle() {
    const classes = useStyles();

    const [tickets, setTickets] = useState([
        { type: 'common', items: 6000, supply: 51713, chance: 0 },
        { type: 'uncommon', items: 3250, supply: 14200, chance: 0 },
        { type: 'rare', items: 1625, supply: 19180, chance: 0 },
        { type: 'legendary', items: 450, supply: 11153, chance: 0 },
        { type: 'mythical', items: 175, supply: 6455, chance: 0 },
        { type: 'godlike', items: 12, supply: 2836, chance: 0 }
    ]);

    const onFieldChange = (event, i) => {
        var ticketsRef = [...tickets];
        var supply = ticketsRef[i].supply * 0.8; // 80% of current supply amount
        var formula = event.target.value / supply * ticketsRef[i].items;
        var ticket = {
            ...ticketsRef[i],
            chance: formula.toFixed(3)
        };

        ticketsRef[i] = ticket;
        setTickets(ticketsRef);
    };

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12}>
                    <Typography variant='h1' align='center' className={classes.title}>Raffle #4 Calculator</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant='h6' className={classes.subtitle}>Your Tickets</Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <TextField
                                    type='number'
                                    variant='outlined'
                                    fullWidth
                                    className={classNames(classes.input, ticket.type)}
                                    label={ticket.type}
                                    onChange={(e) => onFieldChange(e, i)}
                                />
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={3}>
                    <Typography variant='h6' className={classes.subtitle}>Items in Raffle</Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
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
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={3}>
                    <Tooltip
                        placement='right'
                        arrow
                        title={
                            <React.Fragment>
                                <Typography>80% of the current total number of tickets in circulation, since not all tickets will be submitted to the ruffle</Typography>
                            </React.Fragment>
                        }
                    >
                        <Typography variant='h6' className={classes.subtitle}>
                            Tickets Supply
                            <HelpOutlineIcon fontSize='small' color='error' className={classes.subtitleIcon} />
                        </Typography>
                        
                    </Tooltip>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Typography
                                    variant='h6'
                                    align='center'
                                    className={classNames(classes.count, ticket.type)}
                                >
                                    {ticket.supply}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={3}>
                    <Tooltip
                            placement='right'
                            arrow
                            title={
                                <React.Fragment>
                                    <Typography>Chance is represented by amount of items that you can get</Typography>
                                </React.Fragment>
                            }
                        >
                            <Typography variant='h6' className={classes.subtitle}>
                                Items chance
                                <HelpOutlineIcon fontSize='small' color='error' className={classes.subtitleIcon} />
                            </Typography>
                    </Tooltip>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Typography
                                    variant='h6'
                                    align='center'
                                    className={classNames(classes.count, ticket.type)}
                                >
                                    {ticket.chance}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
        </Container>
    );
}