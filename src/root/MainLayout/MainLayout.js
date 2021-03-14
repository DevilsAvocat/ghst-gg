import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {Redirect, Route, Switch} from 'react-router';
import Main from "../../pages/Main/Main";
import NotFound from "../../pages/NotFound/NotFound";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Baazaar from "../../pages/Baazaar/Baazaar";

const useStyles = makeStyles(() => ({
    wrap: {
        backgroundPosition: '0px -30vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'radial-gradient(50% 50% at 50% 50%, rgba(253, 154, 249, 0.1) 0%, rgba(33, 36, 41, 0) 100%)',
        flexDirection: 'column',
        minHeight: '100%'
    }
}));

export default function Account() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.wrap}
        >
            <Header />
            <Switch>
                <Route exact path={`/`} component={ Main } />
                <Route exact path={`/market`} component={ Baazaar } />
                <Route exact path={`/404`} component={ NotFound } />
                <Redirect from='*' to='/404' />
            </Switch>
            <Footer />
        </Grid>
    );
}
