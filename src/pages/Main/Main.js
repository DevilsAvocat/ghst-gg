import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import Portals from '../../root/Portals/Portals';

export default function Main() {
    return (
        <Grid
            item
            container
            direction={'row'}
            xs={12}
            spacing={2}
        >
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color='primary'
                >
                    Aave
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant='contained'
                    color='secondary'
                >
                    Gotchi
                </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Portals />
            </Grid>
        </Grid>

    )
}