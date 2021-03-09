import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid, Link, Toolbar, Typography} from '@material-ui/core';

import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.svg';

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
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
        <Grid item container className={classes.headerWrapper}>
            <Toolbar className={classes.toolbar}>
                <img className={classes.logo} src={logo} alt='logo' />
                <Typography>GHST_GG</Typography>
                <nav className={classes.navigation}>
                    {/*<NavLink className={classes.navLink} to='/main' href='#'>*/}
                    {/*    <Typography className={classes.navLinkText}>Main</Typography>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink className={classes.navLink} to='/team' href='#'>*/}
                    {/*    <Typography className={classes.navLinkText}>Team</Typography>*/}
                    {/*</NavLink>*/}
                </nav>
                <Link href='https://discord.gg/9FqxjDTYYE' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <img src={ discord } alt='' />
                        <Box component='span' className={classes.iconButtonText}>4</Box>
                    </Button>
                </Link>
                <Link href='https://t.me/joinchat/hTAWLbZgrKI4YWJk' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TelegramIcon />
                        <Box component='span' className={classes.iconButtonText}>20</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/ghst_gg' className={classes.socialLink} target='_blank'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>7</Box>
                    </Button>
                </Link>
            </Toolbar>
        </Grid>
    )
}