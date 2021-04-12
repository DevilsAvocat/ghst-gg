import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, fade, Link, Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        overflowY: 'auto',
        justifyContent: 'space-around'
    },
    gotchi: {
        borderRadius: 4,
        width: 150,
        padding: 30,
        transition: 'background-color .3s ease-in-out',
        '& img': {
            height: 90,
            filter: 'drop-shadow( 0px 0px 7px rgba(255,255,209,.5))'
        },
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: fade(theme.palette.primary.main, .1)
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
    goBack: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        position: "fixed",
        bottom: 20,
        left: 0
    },
    goBackButtonText: {
        textTransform: 'uppercase',
        marginLeft: 8,
        fontWeight: 500
    }
}));

var maxGotchiQuantity = 10000;
var loadNewItemsAfterThisScrollHeight = 2000;

export default function GhostExplorer() {
    const classes = useStyles();
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

    const getSVG = (ghst) => {
        try {
            return require(`../../assets/svgs/${ghst}.svg`).default;
        } catch (error) {
            return null;
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
                    const img = getSVG(ghst);

                    if (img) {
                        return <Link
                            key={index}
                            className={classNames(classes.gotchi)}
                            href={`https://aavegotchi.com/gotchi/${ghst}`}
                            target="_blank"
                        >
                            {/*<Typography*/}
                            {/*    align={'center'}*/}
                            {/*    className={classes.gotchiName}*/}
                            {/*    variant={'h5'}*/}
                            {/*>*/}
                            {/*    Unnamed*/}
                            {/*</Typography>*/}
                            <Box h={90}>
                                <img alt={ghst} src={img} />
                            </Box>
                            <Typography
                                align={'center'}
                                variant={'h6'}
                            >
                                {ghst}
                            </Typography>
                        </Link>
                    }
                })
            }
        </Grid>
    );
}
