import React, {useEffect, useState} from 'react';
import {Backdrop, Box, CircularProgress, Container, Grid, TextField, Tooltip, Typography} from '@material-ui/core';
import classNames from 'classnames';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStyles } from './styles';
import { Helmet } from 'react-helmet';

import {ticketsData} from './ticketsData';
import ghst from '../../assets/images/ghst-doubleside.gif';


export default function Raffle() {
    const classes = useStyles();
    const [backdropIsOpen, showBackdrop] = useState(false);
    const [tickets, setTickets] = useState(ticketsData);

    useEffect(() => {
        showBackdrop(true);
        fetch('https://api.ghst.gg/baazaar/tickets')
            .then(response => response.json())
            .then((data) => {
                let ticketsActualSupply = Object.values(data);
                let ticketsRef = [...tickets];

                ticketsActualSupply.forEach((supply, i) => {
                    ticketsRef[i].supply = supply;
                });

                setTickets(ticketsRef);
                showBackdrop(false);
            });
    },[]);

    const onFieldChange = (event, i) => {
        var ticketsRef = [...tickets];
        var chance = event.target.value / ticketsRef[i].supply * ticketsRef[i].items;
        var percentage = (chance * 100).toFixed(1);
        var price = ticketsRef[i].price;
        var cost = event.target.value * price;

        console.log(ticketsRef[i].wearables)

        var ticket = {
            ...ticketsRef[i],
            chance: chance > 1 ? chance.toFixed(2) : chance > 0 ? `${percentage}% for 1` : 0,
            cost: cost > price ? cost.toFixed(0) : price
        };

        ticketsRef[i] = ticket;
        setTickets(ticketsRef);
    };

    const countWearablesChance = (wearables) => {
        console.log(wearables);
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
                                    className={classNames(classes.textHighlight, ticket.type)}
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
                        enterTouchDelay={false}
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
                                    className={classNames(classes.textHighlight, ticket.type)}
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
                        enterTouchDelay={false}
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
                                    className={classNames(classes.textHighlight, classes.price, ticket.type)}
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
                        enterTouchDelay={false}
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
                                    className={classNames(classes.textHighlight, ticket.type)}
                                >
                                    {ticket.chance}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            {
                tickets.map((ticket, i) => {
                    if(ticket.chance !== 0) return <Grid container className={classes.row} key={i}>
                        <Grid item xs={12}>
                            <Typography className={classNames(classes.textHighlight, ticket.type)}>
                                {ticket.type} items chance
                            </Typography>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                            {
                                ticket.wearables.map((wearable) => {
                                    return <Grid item xs={4} sm={3} md={2}>
                                        <Box className={classNames(classes.wearable, ticket.type)}>
                                            <Typography>{wearable.name}</Typography>
                                            <Typography>Available: {wearable.amount}</Typography>
                                            <Typography className={classNames(classes.textHighlight, ticket.type)}>10%</Typography>
                                        </Box>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Grid>

                    return null;
                })
            }
            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
}