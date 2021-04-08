import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SnackbarContextProvider from "./contexts/SnackbarContext";
import Header from './root/Header/Header';
import Footer from './root/Footer/Footer';

import Main from './pages/Main/Main';
import Baazaar from './pages/Baazaar/Baazaar';
import Raffle from './pages/Raffle/Raffle';
import GhostExplorer from './pages/GhostExplorer/GhostExplorer';
import NotFound from './pages/NotFound/NotFound';

const useStyles = makeStyles(() => ({
    wrap: {
        backgroundPosition: '0px -30vh',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        minHeight: '100%'
    },
    content: {
        flexGrow: 1
    }
}));

export default function App() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <SnackbarContextProvider>
            <Helmet>
                <title>GHST_gg</title>
            </Helmet>
            <Grid
                container
                className={classes.wrap}
            >
                <Header />
                <Grid item className={classes.content}>
                    <Switch>
                        <Route exact path={`/`} component={ Main } />
                        <Route exact path={`/market`} component={ Baazaar } />
                        <Route exact path={`/raffle-calculator`} component={ Raffle } />
                        <Route exact path={`/explorer`} component={ GhostExplorer } />
                        <Route exact path={`/404`} component={ NotFound } />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </Grid>
                {location.pathname !== '/explorer' && <Footer />}
            </Grid>
        </SnackbarContextProvider>
    );
}
