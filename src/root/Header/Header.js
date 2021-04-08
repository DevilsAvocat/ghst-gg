import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid, Link, Toolbar, Typography} from '@material-ui/core';
import {NavLink, useLocation} from 'react-router-dom';
import classNames from 'classnames';

import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.svg';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '11px 32px',
        background: theme.palette.background.default,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
            flexWrap: 'nowrap'
        },
        boxShadow: '0px 4px 16px rgba(29, 32, 37, 0.67)',
        '&.sticky': {
            position: 'fixed',
            top: 0,
            zIndex: theme.zIndex.appBar
        }
    },
    highlight: {
        color: theme.palette.primary.main
    },
    logo: {
        width: 45,
        height: 45,
        marginRight: 15
    },
    logoText: {
        whiteSpace: 'nowrap',
        fontSize: '1.125rem',
        letterSpacing: '0.04em'
    },
    logoWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        marginBottom: 12,
        order: 0,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
            marginRight: 40,
            marginBottom: 0
        }
    },
    navigation: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 28,
        lineHeight: 'unset',
        margin: '12px 0',
        order: 2,
        padding: '25px 0',
        textAlign: 'center',
        '& > *': {
            margin: '0 15px',
            textDecoration: 'none',
            textTransform: 'uppercase'
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            lineHeight: '28px',
            padding: 0,
            textAlign: 'left'
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            margin: 0,
            order: 1,
            borderRight: '1px solid #3C404A',
            paddingRight: 25,
        }
    },
    navLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        fontWeight: 500,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        position: 'relative',
        transition: '.3s',
        '&.active, &:hover': {
            color: theme.palette.primary.main
        }
    },
    socialLinkList: {
        justifyContent: 'center',
        order: 1,
        flexWrap: 'nowrap',
        fontSize: '1rem',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
            width: '65%'
        },
        [theme.breakpoints.up('md')]: {
            width: 'unset',
            order: 2,
            paddingLeft: 35
        }
    },
    socialLink: {
        '&:hover': {
            textDecoration: 'none'
        }
    },
    socialLinkJoin: {
        position: 'absolute',
        display: 'none',
        bottom: -11,
        right: 5,
        '& > span': {
            fontSize: '0.55rem',
            letterSpacing: '1px'
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
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
    const location = useLocation();

    return (
        <Toolbar className={classNames(classes.toolbar, location.pathname === '/explorer' ? 'sticky' : 'default')}>
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
                        <Box component='span' className={classes.iconButtonText}>200</Box>
                    </Button>
                </Link>
                <Link href='https://t.me/joinchat/hTAWLbZgrKI4YWJk' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TelegramIcon />
                        <Box component='span' className={classes.iconButtonText}>65</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/ghst_gg' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>159</Box>
                    </Button>
                </Link>
                <Box className={classes.socialLinkJoin}>
                    <Typography variant={'caption'}>Join our community!</Typography>
                </Box>
            </Grid>
        </Toolbar>
    )
}