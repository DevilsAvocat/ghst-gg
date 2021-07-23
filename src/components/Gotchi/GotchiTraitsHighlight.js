import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import commonUtils from '../../utils/commonUtils';

const useStyles = makeStyles((theme) => ({
    circle: {
        // backgroundColor: fade(theme.palette.primary.main, .1),
        // borderRadius: '50%',
        // cursor: 'default'
    }
}));

export default function GotchiTraitsHighlight({traits, currentTraits}) {
    const classes = useStyles();

    console.log('gotchi')

    const defaultTraits = commonUtils.formatTraits(traits);
    const formattedTraits = commonUtils.formatTraits(currentTraits);

    const objDiff = Object.fromEntries(Object.entries(formattedTraits).map(([k, v]) => [k, Math.abs(v - 50)]));
    const sortedDiff = Object.entries(objDiff)
        .sort((a, b) => b[1] - a[1])
        .reduce((_sortedObj, [k,v]) => ({
            ..._sortedObj, 
            [k]: v
        }), {});

    const topTrait = Object.keys(sortedDiff)[0];
    const secondTrait = Object.keys(sortedDiff)[1];

    console.log(formattedTraits);
    console.log(topTrait);
    console.log(secondTrait);

    


    // console.log(formattedTraits);
    // console.log(objDiff);
    // console.log(sortedDiff)

    return (
        <Box position='relative' display='flex' justifyContent='space-between' className={classes.circle}>
            <Box>
                {topTrait}: {formattedTraits[topTrait]}({defaultTraits[topTrait]})
            </Box>
            <Box>
                {secondTrait}: {formattedTraits[secondTrait]}({defaultTraits[secondTrait]})
            </Box>
        </Box>
    );
}