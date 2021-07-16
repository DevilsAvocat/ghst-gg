import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Link, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import itemUtils from '../../utils/itemUtils';
import CallMadeIcon from '@material-ui/icons/CallMade';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: 16
    },
    section: {
        backgroundColor: '#e3e3e3',
        height: 8,
        position: 'relative',
        margin: '0 0.5px',
        transition: 'all .2s ease-in-out',
        '&:first-child': {
            borderTopLeftRadius: theme.shape.borderRadiusSmaller,
            borderBottomLeftRadius: theme.shape.borderRadiusSmaller
        },
        '&:last-child': {
            borderTopRightRadius: theme.shape.borderRadiusSmaller,
            borderBottomRightRadius: theme.shape.borderRadiusSmaller
        },
        '&:hover': {
            height: 16,
            '& .popover-core': {
                opacity: 1,
                pointerEvents: 'all'
            }
        }
    },
    popover: {
        backgroundColor: '#e3e3e3',
        borderRadius: theme.shape.borderRadiusSmaller,
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        opacity: 0,
        padding: 4,
        pointerEvents: 'none',
        height: 75,
        width: 75,
        textDecoration: 'none',
        transform: 'translateX(-50%)',
        transition: 'opacity .2s ease-in-out'
    },
    popoverLink: {
        display: 'block',
        height: '100%',
        textDecoration: 'none !important',
    },
    popoverCallMadeIcon: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 14
    },
    popoverTitle: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    },
    popoverEmpty: {
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
        marginTop: 6
    }
}));

export default function GotchiWearablesLine({wearables}) {
    const classes = useStyles();
    const theme = useTheme();
    const wearableSlots = ['Body', 'Face', 'Eyes', 'Head', 'R Hand', 'L Hand', 'Pet', 'BG'];

    const renderPopover = (id, name, type, color) => {
        if(id !== 0) {
            return (
                <Link 
                    className={classes.popoverLink}
                    href={`https://wiki.aavegotchi.com/en/wearables#${type}`}
                    target={'_blank'}
                >
                    <Box 
                        className={classNames(classes.popover, 'popover-core')}
                        style={{ backgroundColor: theme.palette.rarity[color] }}
                    >
                        <Typography className={classes.popoverTitle} variant='body2'>
                            {name}
                        </Typography>
                        <img
                            src={itemUtils.getWearableImg(id)}
                            alt={itemUtils.getItemNameById(id)}
                            height={42}
                            width={42}
                        />
                        <CallMadeIcon className={classes.popoverCallMadeIcon} />
                    </Box>
                </Link>
            )
        } else {
            return (
                <Box 
                    className={classNames(classes.popover, 'popover-core')}
                    style={{ backgroundColor: theme.palette.rarity[color] }}
                >
                    <Typography className={classes.popoverTitle} variant='body2'>
                        {name}
                    </Typography>
                    <Typography className={classes.popoverEmpty} variant='body1'>
                        Empty
                    </Typography>
                </Box>
            )
        }
    }

    return (
        <Grid container alignItems={'center'} className={classes.wrapper}>
            {
                wearableSlots.map((name, index)=> {
                    let wearable = wearables[index];
                    let type = itemUtils.getItemTypeById(wearable);
                    let rarityColor = itemUtils.getItemRarityById(wearable);

                    return (
                        <Grid
                            item
                            xs={true}
                            className={classes.section}
                            style={{ backgroundColor: theme.palette.rarity[rarityColor] }}
                            key={index}
                        >
                            {renderPopover(wearable, name, type, rarityColor)}
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}