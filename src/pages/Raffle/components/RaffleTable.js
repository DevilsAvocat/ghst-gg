
import React from 'react';
import {Grid, TextField, Tooltip, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {useStyles} from '../styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import ghst from '../../../assets/images/ghst-doubleside.gif';

export default function RaffleTable({tickets, onFieldChange}) {
    const classes = useStyles();

    return (
        <Grid item>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
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
                        enterTouchDelay={0}
                        title={
                            <React.Fragment>
                                <Typography>The number of tickets is updated every 3 minutes</Typography>
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
                        enterTouchDelay={0}
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
                        enterTouchDelay={0}
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
        </Grid>
    );
}