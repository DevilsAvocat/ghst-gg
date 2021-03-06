// react
import React from 'react';
import  { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// components
import Header from "./root/Header/Header";
import Main from './pages/Main/Main';
import NotFound from "./pages/NotFound/NotFound";

const useStyles = makeStyles((theme) => ({
    wrap: {
        background: theme.palette.background.default,
        flexDirection: 'column',
        minHeight: '100%'
    }
}));

export default function App() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.wrap}
        >
            <BrowserRouter>
                <Header />
                <Grid item container>
                    <Container>
                        <Switch>
                            <Route exact path='/' component={ Main } />
                            <Route exact path='/404' component={ NotFound } />
                            <Redirect from='*' to='/404' />
                        </Switch>
                    </Container>
                </Grid>
            </BrowserRouter>
        </Grid>
    );
}
