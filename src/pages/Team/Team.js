import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Typography} from '@material-ui/core';
import hoax from '../../assets/images/avatars/hoax.svg';
import theDude from '../../assets/images/avatars/the-dude.svg';
import bitchin from '../../assets/images/avatars/bitchin.svg';
import hopeUp from '../../assets/images/avatars/hope_up.svg';
import butch from '../../assets/images/avatars/butch.svg'
import Portals from '../../root/Portals/Portals';

const useStyles = makeStyles((theme) => ({
    mainTitle: {
        textAlign: 'center',
        margin: '30px 0'
    },
    teamMember: {
        width: '100%',
        height: '100%',

        // borderColor: theme.palette.primary.main,
        borderWidth: 0,
        background: 'transparent',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        boxShadow: 'none',
        '& img': {
            filter: 'drop-shadow( 0px 0px 10px rgba(255,255,209,.8))'
        }
    },
    aavegotchiName: {
        fontSize: 25,
        textAlign: 'center',
        padding: '25px 0'
    },
    aavegotchiAvatar: {
        width: 150,
        height: 150,
        marginBottom: 25,
        '& > img': {
            width: 100,
            height: 100
        }
    }
}));

export default function Team() {
    const classes = useStyles();

    return (
        <Grid item container spacing={3}>
            <Grid item xs={12}>
                <Portals />
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.mainTitle} variant={'h4'}>DEVELOPED BY GHOSTS</Typography>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Hoax</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hoax } />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>The Dude</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ theDude } />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Butch</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ butch } />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>The Dude</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ theDude } />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Bitchin'</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ bitchin } />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>You!</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                </Paper>
            </Grid>
        </Grid>
    );
}