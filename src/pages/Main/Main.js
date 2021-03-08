import React from 'react';
import Grid from "@material-ui/core/Grid";
import Portals from './components/Portals/Portals';
import Team from './components/Team/Team';

export default function Main() {

    return (
        <Grid item>
            <Portals />
            <Team />
        </Grid>
    );
}