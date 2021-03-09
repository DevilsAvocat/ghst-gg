import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: '5px 30px'
    },
    highlight: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 4,
        padding: '4px 8px',
        color: theme.palette.primary.main,
        marginRight: 8
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid item container className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <Typography>
                    <Box component='span' className={classes.highlight}>v0</Box>
                    <Box component='span'>the most entertaining outcome is the most likely</Box>
                </Typography>
            </Toolbar>
        </Grid>
    )
}