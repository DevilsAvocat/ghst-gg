import React from 'react';
import useStyles from './styles';
import { Avatar, Grid, Link, Typography } from '@material-ui/core';
import classNames from 'classnames';
import hoax from '../../../../assets/images/avatars/hoax.svg';
import dudendy from '../../../../assets/images/avatars/dudendy.svg';
import bitchin from '../../../../assets/images/avatars/bitchin.svg';
import hopeUp from '../../../../assets/images/avatars/hope_up.svg';
import butch from '../../../../assets/images/avatars/butch.svg';
import arwen from '../../../../assets/images/avatars/arwen.svg';

export default function Team() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.mainTitle} variant={'h4'}>CITADEL MEMBERS</Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://www.aavegotchi.com/gotchi/590' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Hoax</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hoax } />
                </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://www.aavegotchi.com/gotchi/8005' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Dudendy</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ dudendy } />
                </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://www.aavegotchi.com/gotchi/1083' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Butch</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ butch } />
                </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://aavegotchi.com/gotchi/2104' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Arwen</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ arwen } />
                </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://www.aavegotchi.com/gotchi/4282' target='_blank' className={classes.teamMember}>
                    <Typography className={classes.aavegotchiName} variant={'h3'}>Bitchin'</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ bitchin } />
                </Link>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://discord.gg/NXEEETxSkC' target='_blank' className={classes.teamMember}>
                    <Typography className={classNames(classes.aavegotchiName, classes.aavegotchiYouName)} variant={'h3'}>You!</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                </Link>
            </Grid>
        </Grid>
    );
}