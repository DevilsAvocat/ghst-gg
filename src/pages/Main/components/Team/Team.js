import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Link, Typography } from '@material-ui/core';
import hoax from '../../../../assets/images/avatars/hoax.svg';
import theDude from '../../../../assets/images/avatars/the-dude.svg';
import bitchin from '../../../../assets/images/avatars/bitchin.svg';
import hopeUp from '../../../../assets/images/avatars/hope_up.svg';
import butch from '../../../../assets/images/avatars/butch.svg';
import arwen from '../../../../assets/images/avatars/arwen.svg';

const useStyles = makeStyles((theme) => ({
    mainTitle: {
        textAlign: 'center',
        margin: '30px 0'
    },
    teamMember: {
        width: '100%',
        height: '100%',
        color: theme.palette.common.white,
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
            filter: 'drop-shadow( 0px 0px 10px rgba(255,255,209,.5))'
        },
        '&:hover': {
            textDecoration: 'none',
            filter: 'drop-shadow( 0px 0px 5px rgba(255,255,209,.2))'
        }
    },
    aavegotchiName: {
        fontSize: 25,
        textAlign: 'center',
        padding: '25px 0'
    },
    aavegotchiYouName: {
        color: theme.palette.primary.main,
        fontWeight: 500
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
                <Typography className={classes.mainTitle} variant={'h4'}>CITADEL MEMBERS</Typography>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://www.aavegotchi.com/gotchi/590' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Hoax</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hoax } />
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://www.aavegotchi.com/gotchi/824' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>The Dude</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ theDude } />
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://www.aavegotchi.com/gotchi/1083' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Butch</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ butch } />
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://aavegotchi.com/gotchi/2104' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Arwen</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ arwen } />
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://www.aavegotchi.com/gotchi/4282' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Bitchin'</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ bitchin } />
                </Link>
            </Grid>
            <Grid item xs={2}>
                <Link href='https://discord.gg/9FqxjDTYYE' target='_blank' className={classes.teamMember}>
                    <Typography className={`${classes.aavegotchiName} ${classes.aavegotchiYouName}`} variant={'h3'}>You!</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                </Link>
            </Grid>
        </Grid>
    );
}