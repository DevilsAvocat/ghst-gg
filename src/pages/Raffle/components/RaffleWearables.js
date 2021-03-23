
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
        <Grid container spacing={2}>
            {
                tickets.slice(0).reverse().map((ticket, i) => {
                    if(ticket.chance !== 0) return ticket.wearables.map((wearable, i) => {
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
                    return null;
                })
            }
        </Grid>
    );
}