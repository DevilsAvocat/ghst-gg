// react
import React from 'react';
import  { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// material
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// components
import Header from './root/Header/Header';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Team from './pages/Team/Team';

const useStyles = makeStyles((theme) => ({
    wrap: {
        background: 'background-image: radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)',
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
            <Header />
            <Container maxWidth='lg'>
                <BrowserRouter>

                    <Grid item container>
                        <Switch>
                            {/*<Route exact path='/main' component={ Main } />*/}
                            <Route exact path='/team' component={ Team } />
                            <Route exact path='/404' component={ NotFound } />
                            <Redirect from='/' to='/team' />
                            <Redirect from='*' to='/404' />
                        </Switch>
                    </Grid>
                </BrowserRouter>
            </Container>
        </Grid>
    );
}
