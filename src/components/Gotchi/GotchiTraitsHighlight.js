import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import commonUtils from '../../utils/commonUtils';

import HighlightNumber from '../HighlightNumber';

const useStyles = makeStyles((theme) => ({
    mainVal: {
        fontSize: 13
    },
    defaultVal: {
        fontSize: 10,
        marginLeft: 2
    }
}));

export default function GotchiTraitsHighlight({traits, currentTraits}) {
    const classes = useStyles();

    const defaultTraits = commonUtils.formatTraits(traits, true);
    const formattedTraits = commonUtils.formatTraits(currentTraits, true);

    // const objDiff = Object.fromEntries(Object.entries(formattedTraits).map(([k, v]) => [k, Math.abs(v - 50)]));
    // const sortedDiff = Object.entries(objDiff)
    //     .sort((a, b) => b[1] - a[1])
    //     .reduce((_sortedObj, [k,v]) => ({
    //         ..._sortedObj, 
    //         [k]: v
    //     }), {});

    // const topTraitKey = Object.keys(sortedDiff)[0];
    // const topTraitValue = formattedTraits[topTraitKey];
    // const secondTraitKey = Object.keys(sortedDiff)[1];
    // const secondTraitValue = formattedTraits[secondTraitKey];

    const isGodlikeTrait = (trait) => {
        return trait >= 99 || trait <= 1;
    };

    const isMythicalTrait = (trait) => {
        return trait >= 95 || trait <= 5;
    };

    return (
        <Box position='relative' display='flex' alignItems='center' flexWrap='wrap' justifyContent='space-between' minHeight={26}>
            {
                Object.entries(formattedTraits).map((trait, i) => {
                    let traitKey = trait[0];
                    let traitVal = trait[1];

                    return <Box textAlign='center' flexBasis='49%' key={i} margin={'1% 0'}>
                        <HighlightNumber type={isGodlikeTrait(traitVal) ? 'godlike' : isMythicalTrait(traitVal) ? 'mythical' : ''}>
                            <Typography className={classes.mainVal} variant='subtitle2' noWrap={true}>
                                {traitKey}{traitVal}
        
                                <Typography className={classes.defaultVal} component='span' variant='body2'>
                                    ({defaultTraits[traitKey]})
                                </Typography>
                            </Typography>
                        </HighlightNumber>
                    </Box>
                })
            }
            {/* <Box textAlign='center' flexBasis='48%'>
                <HighlightNumber type={isGodlikeTrait(topTraitValue) ? 'godlike' : isMythicalTrait(topTraitValue) ? 'mythical' : ''}>
                    <Typography className={classes.mainVal} variant='subtitle2' noWrap={true}>
                        {topTraitKey}{topTraitValue}

                        <Typography className={classes.defaultVal} component='span' variant='body2'>
                            ({defaultTraits[topTraitKey]})
                        </Typography>
                    </Typography>
                </HighlightNumber>
            </Box>

            <Box textAlign='center' flexBasis='48%'>
                <HighlightNumber type={isGodlikeTrait(secondTraitValue) ? 'godlike' : isMythicalTrait(secondTraitValue) ? 'mythical' : ''}>
                    <Typography className={classes.mainVal} variant='subtitle2' noWrap={true}>
                        {secondTraitKey}{secondTraitValue}

                        <Typography className={classes.defaultVal} component='span' variant='body2'>
                            ({defaultTraits[secondTraitKey]})
                        </Typography>
                    </Typography>
                </HighlightNumber>
            </Box> */}
        </Box>
    );
}