import React from 'react';
import { Box, Typography } from '@material-ui/core';
import {useStyles} from '../styles';
import classNames from 'classnames';
import commonUtils from '../../../utils/commonUtils';
import gotchiPlaceholder from '../../../assets/images/logo.png';

export default function RHSGotchi({gotchi, validAddresses}) {
    const classes = useStyles();

    // const getWearableIconPath = (iconId) => {
    //     return require(`../../../assets/wearables/${iconId}.svg`).default;
    // };

    const calculateTotalRewrad = (rew, kin, exp) => {
        return (+rew + +kin + +exp).toFixed(0);
    };

    const getOwnerIndex = (owner) => {
        return validAddresses.indexOf(owner) + 1;
    };

    return (
        <Box
            className={classNames(classes.gotchi, `color-${getOwnerIndex(gotchi.owner.id)}`)}
        >
            <Typography
                variant={'body2'}
                className={classNames(classes.gotchiOwner, `color-${getOwnerIndex(gotchi.owner.id)}`)}
            >
                {commonUtils.cutAddress(gotchi.owner.id)}
            </Typography>
            <img className={classes.gotchiPlaceholder} src={gotchiPlaceholder} alt='logo' width={'50px'} />
            <Typography variant={'body1'}>{gotchi.name}</Typography>
            {/*<Typography variant={'body2'}>*/}
            {/*    BRS: {gotchi.modifiedRarityScore}({gotchi.baseRarityScore})*/}
            {/*    Rew: {gotchi.brsRew}*/}
            {/*</Typography>*/}
            {/*<Typography variant={'body2'}>Kin: {gotchi.kinship} Rew: {gotchi.kinRew}</Typography>*/}
            {/*<Typography variant={'body2'}>Exp: {gotchi.experience} Rew: {gotchi.expRew}</Typography>*/}
            <Typography variant={'body2'}>Total reward: {calculateTotalRewrad(gotchi.brsRew, gotchi.kinRew, gotchi.expRew)}</Typography>
            {/*<Grid container>*/}
            {/*    {*/}
            {/*        Object.entries(commonUtils.formatTraits(gotchi.numericTraits)).map(([key, value], i)=>{*/}
            {/*            return <Grid item xs={6} variant={'body2'} key={i}>*/}
            {/*                {key}:{value}*/}
            {/*            </Grid>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}
            {/*<Grid container justify={'center'} spacing={1}>*/}
            {/*    {*/}
            {/*        gotchi.equippedWearables.map((wearable, i)=> {*/}
            {/*             if(wearable > 0) {*/}
            {/*                 return <Grid item key={i}>*/}
            {/*                    <img src={getWearableIconPath(wearable)} alt='Icon' width={'40px'} height={'40px'} />*/}
            {/*                </Grid>*/}
            {/*             }*/}
            {/*             return null;*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Grid>*/}
        </Box>
    );
}