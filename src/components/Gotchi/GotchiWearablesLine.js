import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, useTheme } from '@material-ui/core';
import classNames from 'classnames';
import itemUtils from '../../utils/itemUtils';

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
            '& .inner': {
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
        marginBottom: 5,
        opacity: 0,
        padding: 4,
        pointerEvents: 'none',
        height: 75,
        width: 75,
        transform: 'translateX(-50%)',
        transition: 'opacity .2s ease-in-out',
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

    const renderWeatableIcon = (id) => {
        if(id !== 0) {
            return (
                <img
                    src={itemUtils.getWearableImg(id)}
                    alt={itemUtils.getItemNameById(id)}
                    height={42}
                    width={42}
                />
            )
        } else {
            return (
                <Typography className={classes.popoverEmpty} variant='body1'>
                    Empty
                </Typography>
            )
        }
    }

    return (
        <Grid container alignItems={'center'} className={classes.wrapper}>
            {
                wearableSlots.map((name, index)=> {
                    let wearable = wearables[index];
                    let rarityColor = itemUtils.getItemRarityById(wearable);

                    return (
                        <Grid
                            item
                            xs={true}
                            className={classes.section}
                            style={{ backgroundColor: theme.palette.rarity[rarityColor] }}
                            key={index}
                        >
                            <Box className={classNames(classes.popover, 'inner')} style={{ backgroundColor: theme.palette.rarity[rarityColor] }}>
                                <Typography className={classes.popoverTitle} variant='body2'>
                                    {name}
                                </Typography>
                                {renderWeatableIcon(wearable)}
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}