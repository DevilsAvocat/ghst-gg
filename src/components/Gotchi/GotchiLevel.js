import React from 'react';
import { Typography, CircularProgress, Popover } from '@material-ui/core';
import useStyles from './styles';

const expFormula = (lvl) => {
    return lvl * lvl / 0.02;
};  // Based on https://wiki.aavegotchi.com/en/xp

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
        <div className={classes.gotchiLvl}>
            <CircularProgress variant='determinate' value={percentageFormula} size={size} />
            <div
                className={classes.gotchiLvlInner}
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
                    className={classes.gotchiLvlPopover}
                    classes={{
                      paper: classes.gotchiLvlPopoverInner,
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
                        Summary {'=>'} {experience} XP
                    </Typography>
                    <Typography variant='subtitle2' color='secondary'>
                        To level {+level + 1} {'=>'} {toNextLevel} XP
                    </Typography>
                </Popover>
            </div>
        </div>
    );
}