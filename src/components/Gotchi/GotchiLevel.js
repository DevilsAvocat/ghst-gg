import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CircularProgress } from '@material-ui/core';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

const useStyles = makeStyles((theme) => ({
    circle: {
        backgroundColor: fade(theme.palette.primary.main, .1),
        borderRadius: '50%',
        cursor: 'default'
    }
}));

export default function GotchiLevel({level, toNextLevel, experience, size}) {
    const classes = useStyles();
    const diff = expFormula(level) - expFormula(level-1);
    const percentageFormula = 100 - Math.floor(toNextLevel * 100 / diff);

    return (
        <Box position='relative' display='inline-flex' className={classes.circle}>
            <CircularProgress variant='determinate' value={percentageFormula} size={size}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position='absolute'
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                <Typography variant='subtitle2' component='div' fontWeight='bold' color='primary'>
                    {level}
                </Typography>
            </Box>
        </Box>
    );
}