import React, {useEffect, useState, useContext} from 'react';
import {Button, Container, Grid, Link, Typography} from '@material-ui/core';
import {Helmet} from 'react-helmet';
// import RaffleTable from './components/RaffleTable'; TODO: temporary solution, read more in RaffleDropTable.js
import RaffleDropTable from './components/RaffleDropTable';
import RaffleWearables from './components/RaffleWearables';
import {ticketsData} from './data/ticketsData';
import {useStyles} from './styles';
import { SnackbarContext } from "../../contexts/SnackbarContext";
import thegraph from '../../api/thegraph';
import {raffle5TotalEnteredQuery, rafflePortalsPriceQuery, raffleTicketPriceQuery} from './data/queries';
import useInterval from '../../hooks/useInterval';
import Countdown from '../../components/Countdown/Countdown'

export default function Raffle() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([...ticketsData]);
    const [ticketsCache, setTicketsCache] = useState([...tickets]);
    const { showSnackbar } = useContext(SnackbarContext);
    const [snackbarShowsOnFirstLoading, setSnackbarShowsOnFirstLoading] = useState(true);
    const [supplySpinner, setSupplySpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);
    const [lastTicketInfo, setLastTicketInfo] = useState('');
    const [dropQuantity, setDropQuantity] = useState('');
    const [enteredCombined, setEnteredCombined] = useState(true);
    // const [commonQuantity, setCommonQuantity] = useState('');
    // const [uncommonQuantity, setUncommonQuantity] = useState('');
    // const [rareQuantity, setRareQuantity] = useState('');
    // const [legendaryQuantity, setLegendaryQuantity] = useState('');
    // const [mythicalQuantity, setMythicalQuantity] = useState('');
    // const [godlikeQuantity, setGodlikeQuantity] = useState('');
    // const [enteredSupplyType, setEnteredSupplyType] = useState(true);


    // const dateToFormat = '1976-04-19T12:59-0500';

    const getTicketQuantity = (type) => {
        const map = {
            // 'common': () => {
            //     return commonQuantity;
            // },
            // 'uncommon': () => {
            //     return uncommonQuantity;
            // },
            // 'rare': () => {
            //     return rareQuantity;
            // },
            // 'legendary': () => {
            //     return legendaryQuantity;
            // },
            // 'mythical': () => {
            //     return mythicalQuantity;
            // },
            // 'godlike': () => {
            //     return godlikeQuantity;
            // },
            'drop': () => {
                return dropQuantity;
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
        return ticket.entered;
    }

    const countTicketsChance = () => {
        let ticketsLocalRef = [...tickets];

        ticketsLocalRef.forEach((ticket, i) => {
            let combinedSupply = enteredCombined ? +getTicketSupply(ticket) + +dropQuantity : getTicketSupply(ticket);
            let chance = getTicketQuantity(ticket.type) / combinedSupply * ticket.items;
            let percentage = (chance * 100).toFixed(1);
            let price = ticket.price;
            let cost = getTicketQuantity(ticket.type) * price;

            let wearables = countWearablesChance(ticket.wearables, ticket.items, chance.toFixed(2));

            ticketsLocalRef[i] = {
                ...ticket,
                chanceEcho: chance.toFixed(2),
                chance: chance > 1 ? `x${chance.toFixed(2)}` : chance > 0 ? `${percentage}% for 1` : 0,
                cost: cost > price ? cost : price,
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

        thegraph.getRaffleData(raffle5TotalEnteredQuery()).then((response)=> {
            let enteredTickets = response.data.total.totalDrop;

            ticketsCache[0].entered = enteredTickets;

            setTicketsCache(ticketsCache);
            setTickets(ticketsCache);
            setSnackbarShowsOnFirstLoading(false);
            setSupplySpinner(false);
        }).catch(error => console.log(error))

        // axios.get('https://api.ghst.gg/baazaar/tickets').then((response) => {
        //     let data = response.data;
        //     let supplyArray = [data.common, data.uncommon, data.rare, data.legendary, data.mythical, data.godlike];
        //     let enteredArray = [data.common_entered, data.uncommon_entered, data.rare_entered, data.legendary_entered, data.mythical_entered, data.godlike_entered];

        //     if (lastTicketInfo !== JSON.stringify(supplyArray)) {

        //         supplyArray.forEach((supply, i) => {
        //             ticketsCache[i].supply = supply;
        //             ticketsCache[i].entered = enteredArray[i];
        //         });

        //         setTicketsCache(ticketsCache);
        //         setTickets(ticketsCache);
        //         setLastTicketInfo(JSON.stringify(supplyArray));
        //         setSnackbarShowsOnFirstLoading(false);
        //     }
        //     setSupplySpinner(false);
        // });
    };

    const getAveragePrices = () => {
        setPricesSpinner(true);

        // thegraph.getJoinedData([raffleTicketPriceQuery(0), raffleTicketPriceQuery(1), raffleTicketPriceQuery(2), raffleTicketPriceQuery(3), raffleTicketPriceQuery(4), raffleTicketPriceQuery(5)]) // raffle 4 queries
        thegraph.getJoinedData([raffleTicketPriceQuery(6), rafflePortalsPriceQuery()])
            .then((response) => {
                let ticketsWeiPrices = response[0].data.erc1155Listings.map((wei)=> parseInt(wei.priceInWei));
                let portalsWeiPrices = response[1].data.erc721Listings.map((wei)=> parseInt(wei.priceInWei));

                let ticketsFloorPrice = (ticketsWeiPrices.reduce((a,b) => a + b, 0) / ticketsWeiPrices.length) / 10**18;
                let portalsFloorPrice = (portalsWeiPrices.reduce((a,b) => a + b, 0) / portalsWeiPrices.length) / 10**18;

                ticketsCache[0].price = ticketsFloorPrice.toFixed(5);
                ticketsCache[0].cost = ticketsFloorPrice.toFixed(5);
                ticketsCache[0].portalsPrice = portalsFloorPrice.toFixed(0);

                setTickets(ticketsCache);
                setPricesSpinner(false);
            });
    }

    useEffect(() => {
        loadTickets();
    },[]);

    useEffect(() => {
        countTicketsChance();
    },[enteredCombined]);

    useEffect(() => {
        getAveragePrices();
    },[ticketsCache]);

    useEffect(() => {
        onFieldChange();
    }, [dropQuantity]);

    useEffect(() => {
        onFieldChange();
        if (!snackbarShowsOnFirstLoading) {
            showSnackbar('success', 'Tickets supply was successfully updated!')
        }
    }, [lastTicketInfo]);

    useInterval(() => {
        loadTickets();
    }, 180000);
    

    const date = new Date(2021, 10, 11, 20, 17);

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            {/* <Moment>{ts}</Moment> */}
            {/* {ts} */}
            <Helmet>
                <title>Raffle #5 Calculator</title>
            </Helmet>
            
            <Grid container alignContent={'center'} className={classes.titleWrapper}>
                <Grid item xs={12} md={7}>
                    <Typography variant='h4' className={classes.title}>
                        <Countdown date={date} format='dd:hh:mm:ss' />
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} className={classes.enterButtonWrapper}>
                    <Link href={'https://www.aavegotchi.com/raffle/4'} className={classes.enterButton} target={'_blank'}>
                        <Button variant={'contained'} color={'primary'} size={'large'}>
                            Enter Raffle
                        </Button>
                    </Link>
                </Grid>
                
            </Grid>
            <RaffleDropTable
                tickets={tickets}
                supplySpinner={supplySpinner}
                pricesSpinner={pricesSpinner}
                dropQuantity={dropQuantity}
                setDropQuantity={setDropQuantity}
                enteredCombined={enteredCombined}
                setEnteredCombined={setEnteredCombined}
            />
            <RaffleWearables tickets={tickets} />
        </Container>
    );
}