import React, { useState } from 'react';
import { Container, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStyles } from './styles';
import { Helmet } from "react-helmet";

import commonIcon from '../../assets/tickets/common.svg';
import uncommonIcon from '../../assets/tickets/uncommon.svg';
import rareIcon from '../../assets/tickets/rare.svg';
import legendaryIcon from '../../assets/tickets/legendary.svg';
import mythicalIcon from '../../assets/tickets/mythical.svg';
import godlikeIcon from '../../assets/tickets/godlike.svg';
import ghst from '../../assets/images/ghst-doubleside.gif';

export default function Raffle() {
    const classes = useStyles();

    const [tickets, setTickets] = useState([
        { type: 'common', icon: commonIcon, items: 6000, supply: 75320, price: 0.23, cost: 0.23, chance: 0 },
        { type: 'uncommon', icon: uncommonIcon, items: 3250, supply: 19513, price: 0.91, cost: 0.91, chance: 0 },
        { type: 'rare', icon: rareIcon, items: 1625, supply: 20264, price: 1.51, cost: 1.51, chance: 0 },
        { type: 'legendary', icon: legendaryIcon, items: 450, supply: 12320, price: 7.18, cost: 7.18, chance: 0 },
        { type: 'mythical', icon: mythicalIcon, items: 175, supply: 7603, price: 29.16, cost: 29.16, chance: 0 },
        { type: 'godlike', icon: godlikeIcon, items: 12, supply: 2969, price: 115.24, cost: 115.24, chance: 0 }
    ]);

    const onFieldChange = (event, i) => {
        var ticketsRef = [...tickets];
        var chance = event.target.value / ticketsRef[i].supply * ticketsRef[i].items;
        var percentage = (chance * 100).toFixed(1);
        var price = ticketsRef[i].price;
        var cost = event.target.value * price;

        var ticket = {
            ...ticketsRef[i],
            chance: chance > 1 ? chance.toFixed(2) : chance > 0 ? `${percentage}% for 1` : 0,
            cost: cost > price ? cost.toFixed(0) : price
        };

        ticketsRef[i] = ticket;
        setTickets(ticketsRef);
    };

    return (
        <Container maxWidth='xl' className={classes.raffle}>
            <Helmet>
                <title>Raffle #4 Calculator</title>
            </Helmet>
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
                                <Typography>There is still a time before the ruffle meaning more tickets will be minted</Typography>
                            </React.Fragment>
                        }
                    >
                        <Typography variant='h6' className={classes.subtitle}>
                            Tickets Supply
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Typography>
                        
                    </Tooltip>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classes.ticketBg}>
                                <img src={ticket.icon} alt={'ticket-' + ticket.type} />
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
                                <Typography>Average ticket price on Baazaar</Typography>
                            </React.Fragment>
                        }
                    >
                        <Typography variant='h6' className={classes.subtitle}>
                            Baazaar price
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
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
                                    className={classNames(classes.count, classes.price, ticket.type)}
                                >
                                    {ticket.cost}
                                    <img src={ghst} width='26' alt='GHST Token Icon' />
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
                                <Typography>How many items you will get on average</Typography>
                            </React.Fragment>
                        }
                    >
                        <Typography variant='h6' className={classes.subtitle}>
                            Your items
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Typography>
                    </Tooltip>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classNames(classes.chance, ticket.type, ticket.chance !== 0 ? 'highlighted' : '')}>
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