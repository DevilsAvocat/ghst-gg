import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import classNames from 'classnames';
import ghst from '../../assets/images/ghst-doubleside.gif';
import itemUtils from '../../utils/itemUtils';

const useStyles = makeStyles((theme) => ({
    lineWrapper: {
        height: 16
    },
    lineSection: {
        backgroundColor: theme.palette.customColors.gray,
        height: 8,
        position: 'relative',
        margin: '0 0.5px',
        transition: 'height .2s ease-in-out',
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
                opacity: 1
            }
        }
    },
    lineInner: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        opacity: 0,
        transform: 'translateX(-50%)',
        transition: 'opacity .2s ease-in-out',
    }
}));

export default function GotchiWearablesLine({wearables}) {
    const classes = useStyles();
    console.log(wearables);
    const wearableSlots = ['Body', 'Face', 'Eyes', 'Head', 'R Hand', 'L Hand', 'Pet', 'BG'];

    // const renderWeatableSlot = (name, wearable) => {
    //     if(wearable !== 0) {
    //         return (

    //         )
    //     } else {
    //         return (
    //             <Grid item className={classes.lineInner}>
    //                 {name} - Empty
    //             </Grid>
    //         )
    //     }
    // }

    console.log(wearables);

    return (
        <Grid container alignItems={'center'} className={classes.lineWrapper}>
            {
                wearableSlots.map((name, index)=> {
                    let wearable = wearables[index];

                    return (
                        <Grid item xs={true} className={classes.lineSection} key={index}>
                            <Box className={classNames(classes.lineInner, 'inner')}>
                                {name}({wearable})
                                <img
                                    src={itemUtils.getWearableImg(wearable)}
                                    alt={'yo'}
                                    height={35}
                                    width={35}
                                />
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
}