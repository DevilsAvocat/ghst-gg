import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from "axios";
import {Container, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import RaffleTable from './components/RaffleTable';
import RaffleWearables from './components/RaffleWearables';
import {ticketsData} from './ticketsData';
import {useStyles} from './styles';
import { SnackbarContext } from "../../contexts/SnackbarContext";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function Raffle() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([...ticketsData]);
    const { showSnackbar } = useContext(SnackbarContext);
    const [snackbarShowsOnFirstLoading, setSnackbarShowsOnFirstLoading] = useState(true);
    const [lastTicketInfo, setLastTicketInfo] = useState('');
    const [commonQuantity, setCommonQuantity] = useState('');
    const [uncommonQuantity, setUncommonQuantity] = useState('');
    const [rareQuantity, setRareQuantity] = useState('');
    const [legendaryQuantity, setLegendaryQuantity] = useState('');
    const [mythicalQuantity, setMythicalQuantity] = useState('');
    const [godlikeQuantity, setGodlikeQuantity] = useState('');

    const getTicketQuantity = (type) => {
        const map = {
            'common': () => {
                return commonQuantity;
            },
            'uncommon': () => {
                return uncommonQuantity;
            },
            'rare': () => {
                return rareQuantity;
            },
            'legendary': () => {
                return legendaryQuantity;
            },
            'mythical': () => {
                return mythicalQuantity;
            },
            'godlike': () => {
                return godlikeQuantity;
            }
        };

        try {
            return map[type]();
        } catch (err) {
            return 0;
        }
    };

    const onFieldChange = () => {
        let ticketsRef = [...tickets];

        ticketsRef.forEach((ticket, i) => {
            let chance = getTicketQuantity(ticket.type) / ticket.supply * ticket.items;
            let percentage = (chance * 100).toFixed(1);
            let price = ticket.price;
            let cost = getTicketQuantity(ticket.type) * price;

            let wearables = countWearablesChance(ticket.wearables, ticket.items, chance.toFixed(2));

            ticketsRef[i] = {
                ...ticket,
                chance: chance > 1 ? chance.toFixed(2) : chance > 0 ? `${percentage}% for 1` : 0,
                cost: cost > price ? cost.toFixed(0) : price,
                wearables: wearables
            };
        });

        setTickets(ticketsRef);
    };

    const countWearablesChance = (wearables, itemsAmount, chance) => {
        wearables.forEach((wearable, i) => {
            let percentage = (wearable.amount * 100 / itemsAmount).toFixed(2)
            let wearableChance = percentage * chance / 100;
            wearable.chance = wearableChance > 1 ? `x${wearableChance.toFixed(2)}` : `${(wearableChance * 100).toFixed(1)}% for 1`;
        });
        return wearables;
    };

    const loadTickets = () => {
        axios.get('https://api.ghst.gg/baazaar/tickets').then((response) => {
            if (lastTicketInfo !== JSON.stringify(response.data)) {
                let ticketsActualSupply = Object.values(response.data);
                let ticketsRef = JSON.parse(JSON.stringify(tickets));

                ticketsActualSupply.forEach((supply, i) => {
                    ticketsRef[i].supply = supply;
                });

                setTickets(ticketsRef);
                setLastTicketInfo(JSON.stringify(response.data));
                setSnackbarShowsOnFirstLoading(false);
            }
        });
    };

    useEffect(() => {
        loadTickets();
    },[]);

    useEffect(() => {
        onFieldChange();
    }, [commonQuantity, uncommonQuantity, rareQuantity, legendaryQuantity, mythicalQuantity, godlikeQuantity]);

    useEffect(() => {
        onFieldChange();
        if (!snackbarShowsOnFirstLoading) {
            showSnackbar('success', 'Tickets supply was successfully updated!')
        }
    }, [lastTicketInfo]);

    useInterval(() => {
        loadTickets();
    }, 180000);

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            <Helmet>
                <title>Raffle #4 Calculator</title>
            </Helmet>
            <Typography variant='h1' align='center' className={classes.title}>Raffle #4 Calculator</Typography>
            <RaffleTable
                tickets={tickets}
                setCommonQuantity={setCommonQuantity}
                setUncommonQuantity={setUncommonQuantity}
                setRareQuantity={setRareQuantity}
                setLegendaryQuantity={setLegendaryQuantity}
                setMythicalQuantity={setMythicalQuantity}
                setGodlikeQuantity={setGodlikeQuantity}
            />
            <RaffleWearables tickets={tickets} />
        </Container>
    );
}