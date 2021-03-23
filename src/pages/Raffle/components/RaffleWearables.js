
import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {useStyles} from '../styles';

export default function RaffleWearables({tickets}) {
    const classes = useStyles();

    const getWearableIconPath = (iconId) => {
        return require(`../../../assets/wearables/${iconId}.svg`).default;
    };

    return (
        <Grid container direction='column-reverse'>
            {
                tickets.map((ticket, i) => {
                    if(ticket.chance !== 0) return <Grid container className={classes.row} key={i}>
                        <Grid item xs={12}>
                            <Typography variant='h6' className={classNames(classes.textHighlight, classes.wearablesTitle, ticket.type)}>
                                {ticket.type} chances
                            </Typography>
                            <Grid container spacing={2}>
                                {
                                    ticket.wearables.map((wearable, i) => {
                                        return <Grid item xs={6} sm={4} md={2} key={i}>
                                            <Box className={classNames(classes.wearable, ticket.type, wearable.mystery ? 'mystery' : '')}>
                                                <img src={getWearableIconPath(wearable.icon)} alt={wearable.name} width={65} height={65} />
                                                <Typography
                                                    variant={'subtitle1'}
                                                    className={classNames(classes.textHighlight, ticket.type)}
                                                >
                                                    {wearable.name}
                                                </Typography>
                                                <Typography variant='body2'>Available: {wearable.amount}</Typography>
                                                <Typography
                                                    variant={'subtitle1'}
                                                    className={classNames(classes.textHighlight, ticket.type)}
                                                >
                                                    {wearable.chance}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    return null;
                })
            }
        </Grid>
    );
}