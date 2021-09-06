import React, { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Backdrop, useTheme } from '@material-ui/core';
import Gotchi from '../../components/Gotchi/Gotchi'; 
import thegraph from '../../api/thegraph';
import GotchiSvgRender from '../../components/Gotchi/GotchiSvgRender';
import useStyles from './styles';

var maxGotchiQuantity = 10000;

export default function GhostExplorer() {

    const classes = useStyles();
    const [gotchiesFromGraph, setGotchiesFromGraph] = useState(null);
    const [gotchiesShown, setGotchiesShown] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    // scrolling
    const scrollingContainerRef = useRef();
    const size = useNodeScroll(scrollingContainerRef.current);

    function useNodeScroll() {
        const [scrollDown, setScrollDown] = useState(false);

        useEffect(() => {
            function handleScroll() {
                const node = scrollingContainerRef.current,
                    clientHeight = node.clientHeight,
                    scrollHeight = node.scrollHeight,
                    scrollTop = node.scrollTop,
                    actualBottomScroll = scrollHeight - (clientHeight + scrollTop);
                    if (!actualBottomScroll) setScrollDown(true);
                    else setScrollDown(false);
            }
            
            scrollingContainerRef?.current?.addEventListener("scroll", handleScroll);
            handleScroll();
            return () =>  scrollingContainerRef?.current?.removeEventListener("scroll", handleScroll);
        }, [scrollDown]);

        return scrollDown;
    }

    const getGotchies = async () => {
         await thegraph.getAllGotchies().then((response) => {
            const gotchiesData = response.sort((a,b) => a.id - b.id);
            setGotchiesFromGraph(gotchiesData);
            console.log(gotchiesData);

            renderGotchi(50);
        }).catch((e)=> {
            console.log(e);
        });
    };

    const renderGotchi = async (quantity) => {
        if(gotchiesFromGraph === null) return;
        if(gotchiesShown.length < maxGotchiQuantity) {
            const gotchiQuantity = gotchiesShown.length;

            let gotchiCache,
                svgs,
                lastGotchiCached = gotchiQuantity;

            if (lastGotchiCached < maxGotchiQuantity) {
                
                gotchiCache = gotchiesFromGraph.slice(gotchiQuantity, gotchiQuantity+quantity);

                svgs = await GotchiSvgRender.getSvg(gotchiCache);

                gotchiCache = gotchiCache.map((item, index) => {
                    let gotchi = {...item, svg: svgs[index] }
                    return (
                        <Grid item xs={5} sm={4} md={3} lg={2} key={gotchi.id}>
                            <Gotchi gotchi={gotchi} title={gotchi.id} gotchiColor={theme.palette.customColors.gray} />
                        </Grid>
                    )
                });

                const newGotchies = [...gotchiesShown, ...gotchiCache];
                
                setGotchiesShown(newGotchies);

                setIsLoading(false);
            }
            
        }
    };

    useEffect(() => {
        getGotchies();
    }, []);

    useEffect(() => {
        renderGotchi(50);
    }, [gotchiesFromGraph]);

    useEffect(() => {
        if(size) {
            setIsLoading(true);
            renderGotchi(50);
        }
    }, [size]);

    return (
        <>
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color='primary' />
        </Backdrop>
        <Grid
            container
            className={classes.root}
            spacing={2}
            ref={scrollingContainerRef}
        >
            
            {gotchiesShown ? gotchiesShown : ''}
        </Grid>
        </>
    );
}
