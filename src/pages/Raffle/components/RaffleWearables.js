
import React from 'react';
import {Box, Grid, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {useStyles} from '../styles';

export default function RaffleWearables({tickets}) {
    const classes = useStyles();

    // const getWearableIconPath = (iconId) => {
    //     return require(`../../../assets/wearables/${iconId}.svg`).default;
    // };

    // TODO: temporary solution for raffle #5
    const getWearableIconPath = (iconId) => {
        return require(`../../../assets/images/${iconId}.svg`).default;
    };

    return (
        <Box>
            {
                tickets.slice(0).reverse().map((ticket, i) => {
                    if(ticket.chance !== 0) return ticket.wearables.map((wearable, i) => {
                            return <Box maxWidth={200} margin='auto' key={i}>
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
                            </Box>
                        })
                    return null;
                })
            }
        </Box>
    );
}