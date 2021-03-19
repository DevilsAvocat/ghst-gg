import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid, Link, Toolbar, Typography} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.svg';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '12px 32px',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start ',
            flexWrap: 'nowrap'
        }
    },
    highlight: {
        color: theme.palette.primary.main
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    logoText: {
        whiteSpace: 'nowrap'
    },
    logoWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        marginBottom: 12,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
            marginRight: 40,
            marginBottom: 0
        }
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
        '& > *': {
            margin: '0 15px',
            textDecoration: 'none'
        },
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
            marginBottom: 0
        }
    },
    navLink: {
        fontSize: 16,
        color: theme.palette.primary.main,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: '50%',
            opacity: .3,
            transform: 'translateX(-50%)',
            transition: 'all .3s ease-in-out',
            width: 0,
            height: 1,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main
        },
        '&:hover::after, &.active::after': {
            opacity: 1,
            width: '100%'
        }
    },
    socialLinkList: {
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    socialLink: {
        '&:hover': {
            textDecoration: 'none'
        }
    },
    iconButton: {
        color: '#fd9af9',
        '& img': {
            width: 26,
            height: 26
        }
    },
    iconButtonText: {
        marginLeft: '8px'
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <NavLink className={classes.logoWrapper} to='/'>
                <img className={classes.logo} src={logo} alt='logo' />
                <Typography className={classes.logoText}>
                    <Box component='span'>GHST</Box>
                    <Box component='span' className={classes.highlight}>_</Box>
                    <Box component='span'>GG</Box>
                </Typography>
            </NavLink>
            <nav className={classes.navigation}>
                <NavLink className={classes.navLink} to='/market'>
                    Market
                </NavLink>
                <NavLink className={classes.navLink} to='/explorer'>
                    Explorer
                </NavLink>
                <NavLink className={classes.navLink} to='/raffle-calculator'>
                    Raffle Calculator
                </NavLink>
            </nav>
            <Grid className={classes.socialLinkList} container>
                <Link href='https://discord.gg/NXEEETxSkC' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <img src={ discord } alt='' />
                        <Box component='span' className={classes.iconButtonText}>62</Box>
                    </Button>
                </Link>
                <Link href='https://t.me/joinchat/hTAWLbZgrKI4YWJk' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TelegramIcon />
                        <Box component='span' className={classes.iconButtonText}>19</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/ghst_gg' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>63</Box>
                    </Button>
                </Link>
            </Grid>
        </Toolbar>
    )
}