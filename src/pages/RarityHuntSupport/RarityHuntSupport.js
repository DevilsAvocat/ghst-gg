import React, {useContext, useEffect, useState} from 'react';
import { Container, Backdrop, CircularProgress, } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import graphUtils from '../../utils/graphUtils';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';
import {SnackbarContext} from '../../contexts/SnackbarContext';

import RHSFields from './components/RHSFields';
import RHSContent from './components/RHSContent';

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);

    const [gotchies, setGotchies] = useState([]);
    const [wearables, setWearables] = useState([]);

    const [userGotchies, setUserGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('modifiedRarityScore');
    const [wearablesFilter, setWearablesFilter] = useState('desc');
    const [validAddresses, setValidAddresses] = useState(localStorage.getItem('loggedAddresses').split(',') || []);

    const [currentReward, setCurrentReward] = useState(0);
    const [backdropIsOpen, showBackdrop] = useState(false);

    useEffect(()=> {
        if(validAddresses.length !== 0) {
            loadData(validAddresses)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get all gotchies from TheGraph and calculate rewards
    const getAllGotchies = () => {
        showBackdrop(true);
        thegraph.getAllGotchies()
            .then((gotchies) => {
                let rscLeaders = commonUtils.basicSort(gotchies, 'modifiedRarityScore');
                let kinLeaders = commonUtils.basicSort(gotchies, 'kinship');
                let expLeaders = commonUtils.basicSort(gotchies, 'experience');

                gotchies.forEach((item, index)=>{
                    gotchies[index] = {
                        ...item,
                        rscRew: graphUtils.calculateRewards(rscLeaders.indexOf(gotchies[index]) + 1, 'RSC'),
                        kinRew: graphUtils.calculateRewards(kinLeaders.indexOf(gotchies[index]) + 1, 'KIN'),
                        expRew: graphUtils.calculateRewards(expLeaders.indexOf(gotchies[index]) + 1, 'EXP'),
                        totalRew: graphUtils.calculateRewards(rscLeaders.indexOf(gotchies[index]) + 1, 'RSC') + graphUtils.calculateRewards(kinLeaders.indexOf(gotchies[index]) + 1, 'KIN') + graphUtils.calculateRewards(expLeaders.indexOf(gotchies[index]) + 1, 'EXP')
                    }
                });

                setGotchies(gotchies);
                showBackdrop(false);
            });
    }

    const getGotchiesByAddresses = (addresses) => {
        thegraph.getGotchiesByAddresses(addresses).then((response)=>{
            let combinedGotchies = [];
            response.forEach((item)=>{
                combinedGotchies.push(...item.data.user.gotchisOwned);
            });

            console.log('----GOTCHIES-----');
            console.log(combinedGotchies);

            setUserGotchies(commonUtils.basicSort(combinedGotchies, gotchiesFilter));
        });
    };

    const getInventoryByAddresses = (addresses) => {
        web3.getInventoryByAddresses(addresses).then((response)=>{
            let combinedArray = [];

            for (let i = 0; i < response.length; i++) {
                response[i].items.forEach((item)=> {
                    let index = combinedArray.findIndex(el => el.itemId === item.itemId);
                    let owner = { id: response[i].owner, qty: +item.balance };

                    if(index !== -1){
                        combinedArray[index].qty = +combinedArray[index].qty + +item.balance;
                        combinedArray[index].owners.push(owner);
                    } else {
                        combinedArray.push({
                            itemId: item.itemId,
                            rarity: itemUtils.getItemRarityById(item.itemId),
                            rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                            qty: +item.balance,
                            owners: [owner]
                        });
                    }
                });
            }

            console.log('----INVENTORY-----');
            console.log(combinedArray);

            setWearablesFilter('desc');
            setWearables(commonUtils.basicSort(combinedArray, 'rarityId', 'desc'));
        });
    };

    const loadData = (addresses) => {
        if(addresses.every((address) => web3.isAddressValid(address))) {
            showSnackbar('success', 'Leeroy Jenkins!');
            setValidAddresses(addresses);
            getGotchiesByAddresses(addresses);
            getInventoryByAddresses(addresses);
            localStorage.setItem('loggedAddresses', addresses);
        } else {
            showSnackbar('error', 'One or more addresses are not correct!');
        }
    };

    const onGotchiesSort = (event) => {
        // TODO: add filter by owner
        setUserGotchies(commonUtils.basicSort(userGotchies, event.target.value));
        setGotchiesFilter(event.target.value);
    };

    const onWearablesSort = (event) => {
        if(event.target.value === 'asc') {
            setWearables(commonUtils.basicSort(wearables, 'rarityId', 'asc'));
        } else if(event.target.value === 'desc') {
            setWearables(commonUtils.basicSort(wearables, 'rarityId', 'desc'));
        } else {
            setWearables(commonUtils.basicSort(wearables, event.target.value, 'desc'));
        }
        setWearablesFilter(event.target.value);
    };

    // const calculateCurrentRew = (gotchies) => {
    //     let reward = gotchies.reduce((prev, next) => prev + next.totalRew, 0);
    //     setCurrentReward(reward);
    // };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Rarity Hunt Support</title>
            </Helmet>

            <RHSFields loadData={loadData} validAddresses={validAddresses} />

            <RHSContent
                validAddresses={validAddresses}
                userGotchies={userGotchies}
                gotchiesFilter={gotchiesFilter}
                onGotchiesSort={onGotchiesSort}
                wearablesFilter={wearablesFilter}
                onWearablesSort={onWearablesSort}
                currentReward={currentReward}
                wearables={wearables}
            />

            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color='primary' />
            </Backdrop>

        </Container>
    );
}
