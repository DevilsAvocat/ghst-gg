import React, {useEffect, useState} from 'react';
import {Backdrop, CircularProgress, Container, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';

import RaffleTable from './components/RaffleTable';
import RaffleWearables from './components/RaffleWearables';
import {ticketsData} from './ticketsData';
import {useStyles} from './styles';

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
        let ticketsRef = [...tickets];
        let chance = event.target.value / ticketsRef[i].supply * ticketsRef[i].items;
        let percentage = (chance * 100).toFixed(1);
        let price = ticketsRef[i].price;
        let cost = event.target.value * price;

        let wearables = countWearablesChance(ticketsRef[i].wearables, ticketsRef[i].items, chance.toFixed(2));

        ticketsRef[i] = {
            ...ticketsRef[i],
            chance: chance > 1 ? chance.toFixed(2) : chance > 0 ? `${percentage}% for 1` : 0,
            cost: cost > price ? cost.toFixed(0) : price,
            wearables: wearables
        };
        setTickets(ticketsRef);
    };

    const countWearablesChance = (wearables, itemsAmount, chance) => {
        wearables.forEach((wearable, i) => {
            let percentage = (wearable.amount * 100 / itemsAmount).toFixed(2)
            let wearableChance = percentage * chance / 100;
            wearable.chance = wearableChance > 1 ? wearableChance.toFixed(2) : `${(wearableChance * 100).toFixed(1)}% for 1`;
        });
        return wearables;
    };

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            <Helmet>
                <title>Raffle #4 Calculator</title>
            </Helmet>
            <Typography variant='h1' align='center' className={classes.title}>Raffle #4 Calculator</Typography>
            <RaffleTable tickets={tickets} onFieldChange={onFieldChange}/>
            <RaffleWearables tickets={tickets} />
            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color='inherit' />
            </Backdrop>
        </Container>
    );
}