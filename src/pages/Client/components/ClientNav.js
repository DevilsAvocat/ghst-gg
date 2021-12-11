import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';

import { NavLink } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';

import gotchiPlaceholder from '../../../assets/images/logo.png';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';
import ContentLoader from 'react-content-loader';

import { clientNavStyles } from '../styles';

export default function ClientNav() {
    const match = useRouteMatch();
    const classes = clientNavStyles();
    const theme = useTheme();

    const { 
        clientActive,
        gotchis, loadingGotchis,
        warehouse, loadingWarehouse,
        raffleWarehouse, loadingRaffleWarehouse,
        tickets, loadingTickets,
        realm, loadingRealm
     } = useContext(ClientContext);

    return (
        <div className={classes.container}>
            

            <Button
                disabled={!warehouse.length}
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/warehouse`, search: `?address=${clientActive}` }}
            >
                Your Wearables
                {
                    loadingGotchis || loadingWarehouse ? (
                        <ContentLoader
                            speed={2}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                            className={classes.buttonLoader}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{warehouse.length}]</span>
                    )
                }
            </Button>

            <Button
                
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/raffleWarehouse`, search: `?address=${clientActive}` }}
            >
                Entered Wearables
                {
                    loadingGotchis || loadingRaffleWarehouse ? (
                        <ContentLoader
                            speed={2}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                            className={classes.buttonLoader}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{raffleWarehouse.length}]</span>
                    )
                }
            </Button>

            <Button
                
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/winnings`, search: `?address=${clientActive}` }}
            >
                Check Winnings
                
            </Button>

            
        </div>
    );
}