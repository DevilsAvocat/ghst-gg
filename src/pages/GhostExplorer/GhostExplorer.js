import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Link, Typography } from '@material-ui/core';
import useStyles from './styles';
import classNames from 'classnames';

var maxGotchiQuantity = 10000,
    loadNewItemsAfterThisScrollHeight = 2000;

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
