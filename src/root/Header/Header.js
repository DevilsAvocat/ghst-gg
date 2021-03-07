import React from 'react';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/images/logo.png';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import discord from '../../assets/images/discord.svg';

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
        borderBottom: '1px solid rgba(0,0,0, .3)',
        padding: '5px 30px'
    },
    toolbar: {
        width: '100%',
        justifyContent: 'space-between',
        padding: 0
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        '& > *': {
            margin: '0 15px',
            textDecoration: 'none'
        }
    },
    navLink: {
        '&.active': {
            textDecoration: 'underline'
        }
    },
    navLinkText: {
        fontSize: 18,
        color: theme.palette.common.white
    },
    iconButton: {
        color: '#fd9af9',
        '& img': {
            width: 24,
            height: 24
        }
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <Grid item container className={classes.headerWrapper}>
            <Toolbar className={classes.toolbar}>
                <img className={classes.logo} src={logo} alt="logo" />
                <Typography>GHST_GG</Typography>
                <nav className={classes.navigation}>
                    {/*<NavLink className={classes.navLink} to="/main" href="#">*/}
                    {/*    <Typography className={classes.navLinkText}>Main</Typography>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink className={classes.navLink} to="/team" href="#">*/}
                    {/*    <Typography className={classes.navLinkText}>Team</Typography>*/}
                    {/*</NavLink>*/}
                </nav>
                <IconButton className={classes.iconButton} aria-label="add an alarm">
                    <img src={ discord } alt="" />
                </IconButton>
                <IconButton className={classes.iconButton} color="secondary" aria-label="add an alarm">
                    <TelegramIcon />
                </IconButton>
                <IconButton className={classes.iconButton} color="secondary" aria-label="add an alarm">
                    <TwitterIcon />
                </IconButton>
            </Toolbar>
        </Grid>
    )
}