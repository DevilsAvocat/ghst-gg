import React, {useContext, useEffect, useState} from 'react';
import { Container, Backdrop, CircularProgress, } from '@material-ui/core';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import Web3 from 'web3';
import Constants from '../../api/common/constants.js';
import thegraph from '../../api/thegraph';
import graphUtils from '../../utils/graphUtils';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';
import {SnackbarContext} from '../../contexts/SnackbarContext';

import RHSFields from './components/RHSFields';
import RHSContent from './components/RHSContent';

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.ABI, Constants.TOKEN_ADDRESS);

export default function RarityHuntSupport() {
    const classes = useStyles();
    const { showSnackbar } = useContext(SnackbarContext);

    const [gotchies, setGotchies] = useState([]);
    const [wearables, setWearables] = useState([]);

    const [userGotchies, setUserGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('totalRew');
    const [wearablesFilter, setWearablesFilter] = useState('desc');
    const [validAddresses, setValidAddresses] = useState([]);

    const [currentReward, setCurrentReward] = useState(0);
    const [backdropIsOpen, showBackdrop] = useState(false);

    useEffect(()=> {
        getAllGotchies();
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

    const getWearablesByAddresses = async (addresses) => {
        showBackdrop(true);
        try {
            const addressesCounter = addresses.length,
                responseArray = [];

            for (let i = 0; i < addressesCounter; i++) {
                await contract.methods.itemBalances(addresses[i]).call()
                    .then((response) => {
                        response.forEach((item)=> {
                            responseArray.push({...item, owners: [{id: addresses[i], qty: item.balance}]})
                        });
                    });
            }


            let combinedArray = responseArray.reduce((unique, item) => {
                const index = unique.findIndex(el => el.itemId === item.itemId);
                if(index !== -1){
                    unique[index].qty = +unique[index].qty + +item.balance;
                    unique[index].owners.push(item.owners[0]);
                } else {
                    unique.push({
                        itemId: item.itemId,
                        rarity: itemUtils.getItemRarityById(item.itemId),
                        rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                        qty: +item.balance,
                        owners: item.owners
                    });
                }
                return unique;
            }, []);

            setWearablesFilter('desc');
            setWearables(commonUtils.basicSort(combinedArray, 'rarityId', 'desc'));
            showBackdrop(false);
        } catch (error) {
            setWearables([]);
            showBackdrop(false);
        }
    };

    const loadData = (addresses) => {
        if(addresses.every((address) => Web3.utils.isAddress(address))) {
            showSnackbar('success', 'Leeroy Jenkins!');
            setValidAddresses(addresses);
            getGotchiesByAddresses(addresses);
            getWearablesByAddresses(addresses)
        } else {
            showSnackbar('error', 'One or more addresses are not correct!');
        }
    };

    const getGotchiesByAddresses = (addresses) => {
        let filtered = gotchies.filter((gotchi) => addresses.map((item)=>item.toLowerCase()).includes(gotchi.owner?.id));
        setUserGotchies(commonUtils.basicSort(filtered, gotchiesFilter));
        calculateCurrentRew(filtered);
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

    const calculateCurrentRew = (gotchies) => {
        let reward = gotchies.reduce((prev, next) => prev + next.totalRew, 0);
        setCurrentReward(reward);
    };

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
