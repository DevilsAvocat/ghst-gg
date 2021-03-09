import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        overflowY: 'auto',
        justifyContent: 'space-around'
    },
    gotchi: {
        width: 150,
        padding: 30,
        '& img': {
            height: 90,
            filter: 'drop-shadow( 0px 0px 7px rgba(255,255,209,.5))'
        }
    },
    gotchiName: {
        textAlign: 'center',
        fontSize: 20,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingBottom: 15
    },
    gotchiSale: {
        '& img': {
            filter: 'drop-shadow( 0px 0px 15px rgba(255,0,0,.7))'
        }
    },
    goBack: {
        position: "fixed",
        bottom: 20,
        left: 0,
        width: 120,
        height: 80,
        padding: '15px 0px 15px 5px',
        background: theme.palette.primary.main,
        borderWidth: '2px 2px 2px 0',
        borderRadius: '0px 25px 25px 0',
        borderStyle: 'solid',
        borderLeft: 0
    },
    goBackButtonText: {
        textTransform: 'uppercase'
    }
}));

var maxGotchiQuantity = 10000;
var loadNewItemsAfterThisScrollHeight = 2000;

export default function GhostExplorer() {
    const classes = useStyles();
    const history = useHistory();
    const [gotchies, setGotchies] = useState([]);
    // scrolling
    const scrollingContainerRef = useRef();
    const size = useNodeScroll(scrollingContainerRef.current);


    function useNodeScroll() {
        const [scrollDown, setScrollDown] = useState();

        useEffect(() => {
            function handleScroll() {
                const node = scrollingContainerRef.current,
                    clientHeight = node.clientHeight,
                    scrollHeight = node.scrollHeight,
                    scrollTop = node.scrollTop,
                    actualBottomScroll = scrollHeight - (clientHeight + scrollTop);

                if (actualBottomScroll < loadNewItemsAfterThisScrollHeight) {
                    if (scrollDown === actualBottomScroll) {
                        setScrollDown(actualBottomScroll + 1);
                    } else {
                        setScrollDown(actualBottomScroll);
                    }
                }
            }

            scrollingContainerRef?.current?.addEventListener("scroll", handleScroll);
            handleScroll();

            return () =>  scrollingContainerRef?.current?.removeEventListener("scroll", handleScroll);
        }, [scrollDown]);

        return scrollDown;
    }

    const goBack = () => {
        history.push('/');
    };

    const getSVG = (ghst) => {
        try {
            return require(`../../assets/svgs/${ghst}.svg`).default;
        } catch (error) {
            return require(`../../assets/svgs/portal_sealed.svg`).default;
        }
    };

    const renderGotchi = (quantity) => {
        if (gotchies.length < maxGotchiQuantity) {
            const gotchiQuantity = gotchies.length;

            let gotchiCache = [],
                lastGotchiCached = gotchiQuantity;

            if (lastGotchiCached < maxGotchiQuantity) {
                for (let i = 0; i < quantity; i++) {
                    lastGotchiCached < maxGotchiQuantity && gotchiCache.push(++lastGotchiCached);
                }
            }

            gotchiCache.length && setGotchies([...gotchies, ...gotchiCache]);
        }
    };

    useEffect(() => {
        renderGotchi(300);
    }, []);

    useEffect(() => {
        renderGotchi(200);
    }, [size]);

    return (
        <Grid
            container
            className={classes.root}
            ref={scrollingContainerRef}
        >
            {
                gotchies.map((ghst, index) => {
                    return <Box
                        key={index}
                        className={classNames(classes.gotchi, ghst === 2 ? classes.gotchiSale : '')}
                    >
                        <Typography
                            align={'center'}
                            className={classes.gotchiName}
                            variant={'h5'}
                        >
                            Unnamed
                        </Typography>
                        <Box h={90}>
                            <img alt={ghst} src={getSVG(ghst)} />
                        </Box>
                        <Link href={`https://aavegotchi.com/gotchi/${ghst}`} target="_blank">
                            <Typography
                                align={'center'}
                                variant={'h6'}
                            >
                                {ghst}
                            </Typography>
                        </Link>
                    </Box>
                })
            }
            <Box className={classes.goBack}>
                <Grid container alignItems={'center'}>
                    <Grid item xs={6}>
                        <IconButton
                            aria-label="add an alarm"
                            onClick={() => goBack()}
                            color={'secondary'}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.goBackButtonText} color={'secondary'}>Home</Typography>
                    </Grid>
                </Grid>

            </Box>
        </Grid>
    );
}
