import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: 20
    }
}));

export default function GhostsExplorer() {
    const classes = useStyles();

    return (
        <Grid container justify={'center'}>
            <Button
                variant='contained'
                color='primary'
                size='large'
                className={classes.button}
            >
                GHOSTS EXPLORER
            </Button>
        </Grid>
    );
}