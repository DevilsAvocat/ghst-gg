import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CircularProgress, Popover } from '@material-ui/core';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

const useStyles = makeStyles((theme) => ({
    circle: {
        backgroundColor: fade(theme.palette.primary.main, .1),
        borderRadius: '50%',
        cursor: 'default'
    },
    popover: {
        pointerEvents: 'none'
    },
    popoverInner: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: '4px 8px'
    }
}));

export default function GotchiLevel({level, toNextLevel, experience, size}) {
    const classes = useStyles();
    const diff = expFormula(level) - expFormula(level-1);
    const percentageFormula = 100 - Math.floor(toNextLevel * 100 / diff);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const popoverOpen = Boolean(anchorEl);

    return (
        <Box position='relative' display='inline-flex' className={classes.circle} 
            >
            <CircularProgress variant='determinate' value={percentageFormula} size={size} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position='absolute'
                display='flex'
                alignItems='center'
                justifyContent='center'
                aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Typography
                    variant='subtitle2'
                    component='div'
                    fontWeight='bold'
                    color='primary'
                >
                    {level}
                </Typography>

                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.popoverInner,
                    }}
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography variant='subtitle2' color='secondary'>
                        Summary => {experience} XP
                    </Typography>
                    <Typography variant='subtitle2' color='secondary'>
                        To level {+level + 1} => {toNextLevel} XP
                    </Typography>
                </Popover>
            </Box>
        </Box>
    );
}