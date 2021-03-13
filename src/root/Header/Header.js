import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid, Link, Toolbar, Typography} from '@material-ui/core';

import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.svg';

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
        // padding: '5px 30px'
    },
    toolbar: {
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '12px 32px',
        [theme.breakpoints.up('sm')]: {
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
        justifyContent: 'center',
        marginBottom: 12,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
            marginBottom: 0
        }
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
            <Grid className={classes.logoWrapper} container alignItems='center'>
                <img className={classes.logo} src={logo} alt='logo' />
                <Typography className={classes.logoText}>
                    <Box component='span'>GHST</Box>
                    <Box component='span' className={classes.highlight}>_</Box>
                    <Box component='span'>GG</Box>
                </Typography>
            </Grid>
            {/* <nav className={classes.navigation}>
                <NavLink className={classes.navLink} to='/main' href='#'>
                    <Typography className={classes.navLinkText}>Main</Typography>
                </NavLink>
                <NavLink className={classes.navLink} to='/team' href='#'>
                    <Typography className={classes.navLinkText}>Team</Typography>
                </NavLink>
            </nav> */}
            <Grid className={classes.socialLinkList} container>
                <Link href='https://discord.gg/NXEEETxSkC' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <img src={ discord } alt='' />
                        <Box component='span' className={classes.iconButtonText}>59</Box>
                    </Button>
                </Link>
                <Link href='https://t.me/joinchat/hTAWLbZgrKI4YWJk' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TelegramIcon />
                        <Box component='span' className={classes.iconButtonText}>18</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/ghst_gg' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>55</Box>
                    </Button>
                </Link>
            </Grid>
        </Toolbar>
    )
}