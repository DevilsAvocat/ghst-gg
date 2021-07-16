import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    circle: {
        backgroundColor: fade(theme.palette.primary.main, .1),
        borderRadius: '50%'
    }
}));

export default function GotchiLevel({experience, level, size}) {
    const classes = useStyles();
    const percentageFormula = Math.floor(experience * 100 / (level * level / 0.02)); // Based on https://wiki.aavegotchi.com/en/xp

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