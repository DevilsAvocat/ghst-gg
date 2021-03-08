import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import {Redirect, Route, Switch} from 'react-router';
import Grid from '@material-ui/core/Grid';
import Team from "../../pages/Team/Team";
import NotFound from "../../pages/NotFound/NotFound";
import Header from "../Header/Header";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({
    wrap: {
        background: 'background-image: radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)',
        flexDirection: 'column',
        minHeight: '100%'
    }
}));

export default function Account() {
    const classes = useStyles();
    let { url } = useRouteMatch();

    return (
        <Grid
            container
            className={classes.wrap}
        >
            <Header />
            <Container maxWidth='lg'>
                <Grid item container>
                    <Switch>
                        <Route exact path={`${url}/`} component={ Team } />
                        <Route exact path='/404' component={ NotFound } />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </Grid>
            </Container>
        </Grid>
    );
}
