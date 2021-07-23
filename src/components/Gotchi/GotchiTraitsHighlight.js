import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import commonUtils from '../../utils/commonUtils';

const useStyles = makeStyles((theme) => ({
    defaultVal: {
        fontSize: 11,
        marginLeft: 2
    },
    highlight: {
        animation: `$fire 1200ms ${theme.transitions.easing.easeInOut} infinite alternate`,
        display: 'inline-block',
        textShadow: `0 -0.05em 0.2em #FFF, 0.01em -0.02em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.01em -0.05em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.02em -0.15em 0.2em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.20em 0.3em ${fade(theme.palette.primary.main, .5)}, 0.05em -0.25em 0.4em ${fade(theme.palette.primary.main, .5)}, 0.06em -0.2em 0.9em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.1em 1.0em ${fade(theme.palette.primary.main, .5)}`
    },
    '@keyframes fire': {
        '0%': {
            textShadow: `0 -0.05em 0.2em #FFF, 0.01em -0.02em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.01em -0.05em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.02em -0.15em 0.2em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.20em 0.3em ${fade(theme.palette.primary.main, .5)},0.05em -0.25em 0.4em ${fade(theme.palette.primary.main, .5)}, 0.06em -0.2em 0.9em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.1em 1.0em ${fade(theme.palette.primary.main, .5)}`
        },
        '25%': {
            textShadow: `0 -0.05em 0.2em #FFF, 0 -0.05em 0.17em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.12em 0.22em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.13em 0.27em ${fade(theme.palette.primary.main, .5)}, 0.05em -0.23em 0.33em ${fade(theme.palette.primary.main, .5)}, 0.07em -0.28em 0.47em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.3em 0.8em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.3em 0.9em ${fade(theme.palette.primary.main, .5)}`
        },
        '50%': {
            textShadow: `0 -0.05em 0.2em #FFF, 0.01em -0.02em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.01em -0.05em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.02em -0.15em 0.2em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.20em 0.3em ${fade(theme.palette.primary.main, .5)},0.05em -0.25em 0.4em ${fade(theme.palette.primary.main, .5)}, 0.06em -0.2em 0.9em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.1em 1.0em ${fade(theme.palette.primary.main, .5)}`
        },
        '75%': {
            textShadow: `0 -0.05em 0.2em #FFF, 0 -0.06em 0.18em ${fade(theme.palette.primary.main, .5)}, 0.05em -0.15em 0.23em ${fade(theme.palette.primary.main, .5)}, 0.05em -0.15em 0.3em ${fade(theme.palette.primary.main, .5)}, 0.07em -0.25em 0.4em ${fade(theme.palette.primary.main, .5)}, 0.09em -0.3em 0.5em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.3em 0.9em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.3em 1.0em ${fade(theme.palette.primary.main, .5)}`
        },
        '100%': {
            textShadow: `0 -0.05em 0.2em #FFF, 0.01em -0.02em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.01em -0.05em 0.15em ${fade(theme.palette.primary.main, .5)}, 0.02em -0.15em 0.2em ${fade(theme.palette.primary.main, .5)}, 0.04em -0.20em 0.3em ${fade(theme.palette.primary.main, .5)},0.05em -0.25em 0.4em ${fade(theme.palette.primary.main, .5)}, 0.06em -0.2em 0.9em ${fade(theme.palette.primary.main, .5)}, 0.1em -0.1em 1.0em ${fade(theme.palette.primary.main, .5)}`
        }
    },
}));

export default function GotchiTraitsHighlight({traits, currentTraits}) {
    const classes = useStyles();

    const defaultTraits = commonUtils.formatTraits(traits, true);
    const formattedTraits = commonUtils.formatTraits(currentTraits, true);

    const objDiff = Object.fromEntries(Object.entries(formattedTraits).map(([k, v]) => [k, Math.abs(v - 50)]));
    const sortedDiff = Object.entries(objDiff)
        .sort((a, b) => b[1] - a[1])
        .reduce((_sortedObj, [k,v]) => ({
            ..._sortedObj, 
            [k]: v
        }), {});

    const topTraitKey = Object.keys(sortedDiff)[0];
    const topTraitValue = formattedTraits[topTraitKey];
    const secondTraitKey = Object.keys(sortedDiff)[1];
    const secondTraitValue = formattedTraits[secondTraitKey];

    return (
        <Box position='relative' display='flex'>
            <Box textAlign='center' flexBasis='50%'>
                <Typography className={topTraitValue >= 99 || topTraitValue <= 1 ? classes.highlight : ''} variant='subtitle2'>
                    {topTraitKey}{topTraitValue}

                    <Typography component='span' variant='body2' className={classes.defaultVal}>
                        ({defaultTraits[topTraitKey]})
                    </Typography>
                </Typography>
            </Box>

            <Box textAlign='center' flexBasis='50%'>
                <Typography className={secondTraitValue >= 99 || secondTraitValue <= 1 ? classes.highlight : ''} variant='subtitle2'>
                    {secondTraitKey}{secondTraitValue}

                    <Typography component='span' variant='body2' className={classes.defaultVal}>
                        ({defaultTraits[secondTraitKey]})
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}