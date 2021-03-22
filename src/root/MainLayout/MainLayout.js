import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {Redirect, Route, Switch} from 'react-router';
import Main from "../../pages/Main/Main";
import NotFound from "../../pages/NotFound/NotFound";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Baazaar from "../../pages/Baazaar/Baazaar";
import Raffle from '../../pages/Raffle/Raffle';
import { Helmet } from 'react-helmet';

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

export default function Account() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.wrap}
        >
            <Helmet>
                <title>GHST_gg</title>
            </Helmet>
            <Header />
            <Grid item className={classes.content}>
                <Switch>
                    <Route exact path={`/`} component={ Main } />
                    <Route exact path={`/market`} component={ Baazaar } />
                    <Route exact path={`/raffle-calculator`} component={ Raffle } />
                    <Route exact path={`/404`} component={ NotFound } />
                    <Redirect from='*' to='/404' />
                </Switch>
            </Grid>
            <Footer />
        </Grid>
    );
}
