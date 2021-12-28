import React, { useContext } from 'react';
import {Link, Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip, Grid  } from '@mui/material';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import Wearable from '../../../components/Items/Wearable/Wearable';
import Consumable from '../../../components/Items/Consumable/Consumable';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

function getQuant(_type, raffleWarehouse){
    //const {raffleWarehouse} = useContext(ClientContext);
    let quant = 0;

    raffleWarehouse.map((item, i)=>{
        if(item.rarity == _type){
            quant+=item.balance;
        }
    });

    return quant;
}

export default function ClientRaffleWarehouse() {
    const classes = routersStyles();
    const { raffleWarehouse, warehouseFilter, loadingGotchis, loadingRaffleWarehouse, sortData } = useContext(ClientContext);

    if(loadingRaffleWarehouse || loadingGotchis || !raffleWarehouse.length) {
        return <Box textAlign='center' paddingTop={'32px'}>
            <GhostLoader
                animate={loadingRaffleWarehouse || loadingGotchis || !raffleWarehouse.length}
                text={!loadingRaffleWarehouse && !loadingGotchis && !raffleWarehouse.length ? 'No wearables here :(' : null}
            />
        </Box>
    }

    return (
        <>
        <Box textAlign='center' paddingTop={'8px'} paddingBottom={'16px'}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Commons entered: {getQuant('common',raffleWarehouse)}
                    </item>
                </Grid> 
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Uncommons entered: {getQuant('uncommon',raffleWarehouse)}
                    </item>
                </Grid> 
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Rares entered: {getQuant('rare',raffleWarehouse)}
                    </item>
                </Grid> 
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Legendaries entered: {getQuant('legendary',raffleWarehouse)}
                    </item>
                </Grid> 
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Mythicals entered: {getQuant('mythical',raffleWarehouse)}
                    </item>
                </Grid> 
                <Grid item xs={2} sm={4} md={4}>
                    <item>
                        Godlikes entered: {getQuant('godlike',raffleWarehouse)}
                    </item>
                </Grid> 
            </Grid> 
        </Box>
              
            <Box className={classes.list}>
                {
                    raffleWarehouse.map((item, i)=>{
                        return <div className={classes.listItem} key={i}>
                            {item.category === 2 ? (
                                <Consumable consumable={item} />
                            ) : (
                                
                                    <Wearable wearable={item} />
                                
                            )}
                        </div>
                    })
                }
            </Box>
        </>
    );
}