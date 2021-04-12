import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import gotchiPlaceholder from '../../../assets/images/logo.png';
import commonUtils from '../../../utils/commonUtils';


export default function RHSGotchi({gotchi}) {
    const classes = useStyles();

    const getWearableIconPath = (iconId) => {
        return require(`../../../assets/wearables/${iconId}.svg`).default;
    };

    return (
        <Grid item className={classes.gotchi}>
            <img className={classes.gotchiPlaceholder} src={gotchiPlaceholder} alt='logo' width={'50px'} />
            <Typography variant={'body1'}>{gotchi.name}</Typography>
            <Typography variant={'body2'}>BRS: {gotchi.modifiedRarityScore}({gotchi.baseRarityScore})</Typography>
            <Grid container>
                {
                    Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{
                        return <Grid item xs={6} variant={'body2'} key={i}>
                            {key}:{value}
                        </Grid>
                    })
                }
            </Grid>
            <Grid container justify={'center'} spacing={1}>
                {
                    gotchi.equippedWearables.map((wearable, i)=> {
                         if(wearable > 0) {
                             return <Grid item key={i}>
                                <img src={getWearableIconPath(wearable)} alt='Icon' width={'40px'} height={'40px'} />
                            </Grid>
                         }
                         return null;
                    })
                }
            </Grid>
        </Grid>
    );
}