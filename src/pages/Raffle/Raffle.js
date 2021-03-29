import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from "axios";
import {Button, Container, Grid, Link, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
import RaffleTable from './components/RaffleTable';
import RaffleWearables from './components/RaffleWearables';
import {ticketsData} from './data/ticketsData';
import {useStyles} from './styles';
import { SnackbarContext } from "../../contexts/SnackbarContext";
import thegraph from '../../api/thegraph';
import {commonQuery, godlikeQuery, legendaryQuery, mythicalQuery, rareQuery, uncommonQuery} from './data/queries';
import commonUtils from "../../utils/commonUtils";

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
    const [ticketsCache, setTicketsCache] = useState([...tickets]);
    const { showSnackbar } = useContext(SnackbarContext);
    const [snackbarShowsOnFirstLoading, setSnackbarShowsOnFirstLoading] = useState(true);
    const [supplySpinner, setSupplySpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);
    const [lastTicketInfo, setLastTicketInfo] = useState('');
    const [commonQuantity, setCommonQuantity] = useState('');
    const [uncommonQuantity, setUncommonQuantity] = useState('');
    const [rareQuantity, setRareQuantity] = useState('');
    const [legendaryQuantity, setLegendaryQuantity] = useState('');
    const [mythicalQuantity, setMythicalQuantity] = useState('');
    const [godlikeQuantity, setGodlikeQuantity] = useState('');
    const [enteredSupplyType, setEnteredSupplyType] = useState(true);

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
        countTicketsChance();
    };

    const getTicketSupply = (ticket) => {
        return enteredSupplyType ? ticket.entered : ticket.supply;
    }

    const countTicketsChance = () => {
        let ticketsLocalRef = [...tickets];

        ticketsLocalRef.forEach((ticket, i) => {
            let chance = getTicketQuantity(ticket.type) / getTicketSupply(ticket) * ticket.items;
            let percentage = (chance * 100).toFixed(1);
            let price = ticket.price;
            let cost = getTicketQuantity(ticket.type) * price;

            let wearables = countWearablesChance(ticket.wearables, ticket.items, chance.toFixed(2));

            ticketsLocalRef[i] = {
                ...ticket,
                chance: chance > 1 ? `x${chance.toFixed(2)}` : chance > 0 ? `${percentage}% for 1` : 0,
                cost: cost > price ? commonUtils.formatNumber(cost) : price,
                wearables: wearables
            };
        });

        setTickets(ticketsLocalRef);
    }

    const countWearablesChance = (wearables, itemsAmount, chance) => {
        wearables.forEach((wearable, i) => {
            let percentage = (wearable.amount * 100 / itemsAmount).toFixed(2)
            let wearableChance = percentage * chance / 100;
            wearable.chance = wearableChance > 1 ? `x${wearableChance.toFixed(2)}` : `${(wearableChance * 100).toFixed(1)}% for 1`;
        });
        return wearables;
    };

    const loadTickets = () => {
        setSupplySpinner(true);

        axios.get('https://api.ghst.gg/baazaar/tickets').then((response) => {
            let data = response.data;
            let supplyArray = [data.common, data.uncommon, data.rare, data.legendary, data.mythical, data.godlike];
            let enteredArray = [data.common_entered, data.uncommon_entered, data.rare_entered, data.legendary_entered, data.mythical_entered, data.godlike_entered];

            if (lastTicketInfo !== JSON.stringify(supplyArray)) {

                supplyArray.forEach((supply, i) => {
                    ticketsCache[i].supply = supply;
                    ticketsCache[i].entered = enteredArray[i];
                });

                setTicketsCache(ticketsCache);
                setTickets(ticketsCache);
                setLastTicketInfo(JSON.stringify(supplyArray));
                setSnackbarShowsOnFirstLoading(false);
            }
            setSupplySpinner(false);
        });
    };

    const getAveragePrices = () => {
        setPricesSpinner(true);

        thegraph.getJoinedData([commonQuery, uncommonQuery, rareQuery, legendaryQuery, mythicalQuery, godlikeQuery])
            .then((response) => {
                let averagePrices = response.map((item)=> {
                    let prices = item.data.erc1155Listings.map((wei)=> parseInt(wei.priceInWei));
                    let average = prices.reduce((a,b) => a + b, 0) / prices.length;
                    let price = average / 10**18;
                    return price.toFixed(2);
                });

                averagePrices.forEach((price, i) => {
                    ticketsCache[i].price = price;
                    ticketsCache[i].cost = price;
                });

                setTickets(ticketsCache);
                setPricesSpinner(false);
            });
    }

    useEffect(() => {
        loadTickets();
    },[]);

    useEffect(() => {
        countTicketsChance();
    },[enteredSupplyType]);

    useEffect(() => {
        getAveragePrices();
    },[ticketsCache]);

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
            <Grid container alignContent={'center'} className={classes.titleWrapper}>
                <Grid item xs={12} md={6}>
                    <Typography variant='h1' className={classes.title}>Raffle #4 Calculator</Typography>
                </Grid>
                <Grid item xs={12} md={6} className={classes.enterButtonWrapper}>
                    <Link href={'https://www.aavegotchi.com/raffle/3'} className={classes.enterButton} target={'_blank'}>
                        <Button variant={'contained'} color={'primary'} size={'large'}>
                            Enter Raffle
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            <RaffleTable
                tickets={tickets}
                supplySpinner={supplySpinner}
                pricesSpinner={pricesSpinner}
                setCommonQuantity={setCommonQuantity}
                setUncommonQuantity={setUncommonQuantity}
                setRareQuantity={setRareQuantity}
                setLegendaryQuantity={setLegendaryQuantity}
                setMythicalQuantity={setMythicalQuantity}
                setGodlikeQuantity={setGodlikeQuantity}
                enteredSupplyType={enteredSupplyType}
                setEnteredSupplyType={setEnteredSupplyType}
            />
            <RaffleWearables tickets={tickets} />
        </Container>
    );
}