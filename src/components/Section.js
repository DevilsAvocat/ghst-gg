import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
        padding: '50px 0',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            bottom: '100%',
            right: 0,
            left: 0,
            height: 1,
            background: 'linear-gradient(to right, transparent 0%, rgba(253, 154, 249, .25) 50%, transparent 100%)',
            zIndex: 9
        },
        [theme.breakpoints.up('md')]: {
            padding: '75px 0',
        }
    }
}));

export default function Section({children, backgroundColor}) {
    const classes = useStyles();

    return (
        <Grid container className={classes.section} style={{ backgroundColor: backgroundColor }}>
            <Container maxWidth='lg'>
                {children}
            </Container>
        </Grid>
    );
}